#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'unsplash');

// Search queries based on the branding PDF style
const architectureQueries = [
  'modern architecture glass building',
  'corporate building reflection',
  'concrete architecture geometric',
  'minimalist office building',
  'glass facade skyscraper',
  'contemporary building exterior',
  'urban architecture lines',
  'modern concrete structure',
  'architectural details glass',
  'corporate headquarters exterior',
  'geometric architecture patterns',
  'modern building perspective',
  'glass steel architecture',
  'minimalist concrete building',
  'business district skyline'
];

// Additional queries for business people and professional contexts
const businessPeopleQueries = [
  'business professional portrait suit',
  'corporate team meeting modern office',
  'business person walking city',
  'professional handshake business deal',
  'diverse business team collaboration',
  'executive portrait corporate',
  'business woman confident professional',
  'corporate presentation meeting room',
  'business networking professional event',
  'office workers modern workplace',
  'business leader confident portrait',
  'corporate culture team diversity',
  'professional consultation meeting',
  'business success partnership',
  'modern office professional environment'
];

const searchQueries = [...architectureQueries, ...businessPeopleQueries];

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function fetchImageUrl(query, index) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.unsplash.com',
      path: `/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        'Accept-Version': 'v1'
      }
    };

    https.get(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0) {
            const photo = json.results[0];
            resolve({
              url: photo.urls.regular || photo.urls.full,
              photographer: photo.user.name,
              photographerUrl: photo.user.links.html,
              description: photo.description || photo.alt_description || query
            });
          } else {
            resolve(null);
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

async function downloadImage(imageData, index) {
  return new Promise((resolve, reject) => {
    if (!imageData) {
      resolve(null);
      return;
    }

    const isBusinessPeople = index >= architectureQueries.length;
    const prefix = isBusinessPeople ? 'business' : 'architecture';
    const fileIndex = isBusinessPeople ? index - architectureQueries.length + 1 : index + 1;
    const filename = `${prefix}-${String(fileIndex).padStart(2, '0')}.jpg`;
    const filepath = path.join(OUTPUT_DIR, filename);
    const file = fs.createWriteStream(filepath);

    https.get(imageData.url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${filename} (Photo by ${imageData.photographer})`);
        resolve({
          filename,
          ...imageData
        });
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('🚀 Starting Unsplash image download...\n');
  
  if (UNSPLASH_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
    console.error('❌ Error: Please set your Unsplash API access key');
    console.error('   You can get one for free at: https://unsplash.com/developers');
    console.error('   Then set it as an environment variable: UNSPLASH_ACCESS_KEY=your_key_here');
    process.exit(1);
  }

  console.log(`📁 Output directory: ${OUTPUT_DIR}\n`);

  const credits = [];
  
  for (let i = 0; i < searchQueries.length; i++) {
    const query = searchQueries[i];
    console.log(`🔍 Searching for: "${query}"`);
    
    try {
      const imageData = await fetchImageUrl(query, i);
      const result = await downloadImage(imageData, i);
      
      if (result) {
        credits.push({
          filename: result.filename,
          photographer: result.photographer,
          photographerUrl: result.photographerUrl,
          description: result.description
        });
      } else {
        console.log(`  ⚠️  No results found for this query`);
      }
      
      // Rate limiting - Unsplash allows 50 requests per hour for demo apps
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}`);
    }
  }

  // Save credits file
  const creditsPath = path.join(OUTPUT_DIR, 'credits.json');
  fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 2));
  console.log(`\n📝 Credits saved to: ${creditsPath}`);
  
  console.log('\n✅ Download complete!');
  console.log(`   ${credits.length} images downloaded to ${OUTPUT_DIR}`);
  
  const architectureCount = credits.filter(c => c.filename.startsWith('architecture-')).length;
  const businessCount = credits.filter(c => c.filename.startsWith('business-')).length;
  console.log(`   - ${architectureCount} architecture images`);
  console.log(`   - ${businessCount} business/people images`);
  console.log('\n⚠️  Remember to credit photographers when using these images!');
}

// Run the script
main().catch(console.error);