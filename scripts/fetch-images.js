const puppeteer = require('puppeteer');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file async
      reject(err);
    });
  });
}

async function fetchPariteeImages() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to https://www.paritee.com/...');
    await page.goto('https://www.paritee.com/', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });

    console.log('Extracting images...');
    const images = await page.evaluate(() => {
      const imgElements = document.querySelectorAll('img');
      const imageData = [];
      
      imgElements.forEach((img, index) => {
        const src = img.src;
        const alt = img.alt || `image-${index}`;
        const className = img.className || '';
        const parentElement = img.parentElement?.tagName || '';
        
        // Filter out very small images, icons, and data URIs
        if (src && 
            !src.startsWith('data:') && 
            img.naturalWidth > 100 && 
            img.naturalHeight > 100) {
          imageData.push({
            src,
            alt,
            className,
            parentElement,
            width: img.naturalWidth,
            height: img.naturalHeight,
            index
          });
        }
      });
      
      return imageData;
    });

    console.log(`Found ${images.length} suitable images`);
    
    // Create directories
    const publicDir = path.join(process.cwd(), 'public');
    const imagesDir = path.join(publicDir, 'images');
    const heroDir = path.join(imagesDir, 'hero');
    const newsDir = path.join(imagesDir, 'news');
    const casesDir = path.join(imagesDir, 'cases');
    const teamDir = path.join(imagesDir, 'team');
    const agenciesDir = path.join(imagesDir, 'agencies');

    await mkdir(imagesDir, { recursive: true });
    await mkdir(heroDir, { recursive: true });
    await mkdir(newsDir, { recursive: true });
    await mkdir(casesDir, { recursive: true });
    await mkdir(teamDir, { recursive: true });
    await mkdir(agenciesDir, { recursive: true });

    const imageManifest = {
      hero: [],
      news: [],
      cases: [],
      team: [],
      agencies: [],
      general: []
    };

    // Download and categorize images
    for (let i = 0; i < Math.min(images.length, 20); i++) { // Limit to 20 images
      const image = images[i];
      try {
        const url = new URL(image.src);
        const filename = `image-${i}-${path.basename(url.pathname) || 'image.jpg'}`;
        
        // Categorize based on context clues
        let category = 'general';
        let targetDir = imagesDir;
        
        if (image.alt.toLowerCase().includes('hero') || 
            image.className.toLowerCase().includes('hero') ||
            image.parentElement === 'HEADER' ||
            i < 2) { // First few images often hero
          category = 'hero';
          targetDir = heroDir;
        } else if (image.alt.toLowerCase().includes('news') || 
                   image.className.toLowerCase().includes('news') ||
                   image.alt.toLowerCase().includes('article')) {
          category = 'news';
          targetDir = newsDir;
        } else if (image.alt.toLowerCase().includes('case') || 
                   image.alt.toLowerCase().includes('project') ||
                   image.alt.toLowerCase().includes('work')) {
          category = 'cases';
          targetDir = casesDir;
        } else if (image.alt.toLowerCase().includes('team') || 
                   image.alt.toLowerCase().includes('person') ||
                   image.alt.toLowerCase().includes('staff')) {
          category = 'team';
          targetDir = teamDir;
        } else if (image.alt.toLowerCase().includes('agency') || 
                   image.alt.toLowerCase().includes('partner') ||
                   image.alt.toLowerCase().includes('client')) {
          category = 'agencies';
          targetDir = agenciesDir;
        }

        const filepath = path.join(targetDir, filename);
        
        console.log(`Downloading ${image.src} to ${category}/${filename}...`);
        await downloadImage(image.src, filepath);
        
        imageManifest[category].push({
          filename,
          originalSrc: image.src,
          alt: image.alt,
          width: image.width,
          height: image.height,
          publicPath: `/images/${category === 'general' ? '' : category + '/'}${filename}`
        });
        
      } catch (error) {
        console.log(`Failed to download ${image.src}:`, error.message);
      }
    }

    // Save manifest
    await writeFile(
      path.join(imagesDir, 'manifest.json'), 
      JSON.stringify(imageManifest, null, 2)
    );

    console.log('Image manifest created:', imageManifest);
    console.log(`Downloaded ${Object.values(imageManifest).flat().length} images total`);

    await browser.close();
    return imageManifest;

  } catch (error) {
    console.error('Error fetching images:', error);
    await browser.close();
    throw error;
  }
}

// Run the script
if (require.main === module) {
  fetchPariteeImages()
    .then((manifest) => {
      console.log('✅ Image fetching completed successfully');
      console.log('Summary:', {
        hero: manifest.hero.length,
        news: manifest.news.length,
        cases: manifest.cases.length,
        team: manifest.team.length,
        agencies: manifest.agencies.length,
        general: manifest.general.length
      });
    })
    .catch((error) => {
      console.error('❌ Image fetching failed:', error);
      process.exit(1);
    });
}

module.exports = fetchPariteeImages;