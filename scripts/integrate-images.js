const fs = require('fs');
const path = require('path');

// Read the image manifest
const manifestPath = path.join(process.cwd(), 'public', 'images', 'manifest.json');
let imageManifest = {};

try {
  imageManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  console.log('✅ Image manifest loaded successfully');
} catch (error) {
  console.error('❌ Failed to load image manifest:', error.message);
  console.log('Please run the fetch-images script first: node scripts/fetch-images.js');
  process.exit(1);
}

// Helper function to get random image from category
function getRandomImage(category) {
  const images = imageManifest[category] || [];
  if (images.length === 0) {
    // Fallback to general images if category is empty
    const fallback = imageManifest.general || [];
    if (fallback.length === 0) return null;
    return fallback[Math.floor(Math.random() * fallback.length)];
  }
  return images[Math.floor(Math.random() * images.length)];
}

// Function to distribute images across data
function distributeImages() {
  const allImages = [...imageManifest.general, ...imageManifest.agencies, ...imageManifest.hero];
  const newsImages = imageManifest.news.length > 0 ? imageManifest.news : allImages;
  const caseImages = imageManifest.cases.length > 0 ? imageManifest.cases : allImages;
  const teamImages = imageManifest.team.length > 0 ? imageManifest.team : allImages;
  
  return {
    news: newsImages,
    cases: caseImages,
    team: teamImages,
    hero: imageManifest.hero.length > 0 ? imageManifest.hero : allImages,
    agencies: imageManifest.agencies.length > 0 ? imageManifest.agencies : allImages,
    all: allImages
  };
}

// Update news data with images
function updateNewsData() {
  const newsPath = path.join(process.cwd(), 'src', 'data', 'news.ts');
  const images = distributeImages();
  
  let newsContent = fs.readFileSync(newsPath, 'utf8');
  
  // Extract news items and add images
  const newsItemsRegex = /const news: NewsItem\[\] = \[([\s\S]*?)\]/;
  const match = newsContent.match(newsItemsRegex);
  
  if (match) {
    let newsItems = match[1];
    
    // Update each news item with an image
    let itemIndex = 0;
    newsItems = newsItems.replace(/image: '([^']*?)'/g, (match, currentImage) => {
      const imageData = images.news[itemIndex % images.news.length] || images.all[itemIndex % images.all.length];
      itemIndex++;
      return imageData ? `image: '${imageData.publicPath}'` : match;
    });
    
    newsContent = newsContent.replace(newsItemsRegex, `const news: NewsItem[] = [${newsItems}]`);
    fs.writeFileSync(newsPath, newsContent, 'utf8');
    console.log('✅ Updated news.ts with images');
  }
}

// Update cases data with images
function updateCasesData() {
  const casesPath = path.join(process.cwd(), 'src', 'data', 'cases.ts');
  const images = distributeImages();
  
  let casesContent = fs.readFileSync(casesPath, 'utf8');
  
  // Update thumbnail paths
  let itemIndex = 0;
  casesContent = casesContent.replace(/thumbnail: '([^']*?)'/g, (match, currentImage) => {
    const imageData = images.cases[itemIndex % images.cases.length] || images.all[itemIndex % images.all.length];
    itemIndex++;
    return imageData ? `thumbnail: '${imageData.publicPath}'` : match;
  });
  
  fs.writeFileSync(casesPath, casesContent, 'utf8');
  console.log('✅ Updated cases.ts with images');
}

// Update people data with images (for avatars)
function updatePeopleData() {
  const peoplePath = path.join(process.cwd(), 'src', 'data', 'people.ts');
  const images = distributeImages();
  
  let peopleContent = fs.readFileSync(peoplePath, 'utf8');
  
  // Update avatar URLs
  let itemIndex = 0;
  peopleContent = peopleContent.replace(/avatarUrl: '([^']*?)'/g, (match, currentImage) => {
    const imageData = images.team[itemIndex % images.team.length] || images.all[itemIndex % images.all.length];
    itemIndex++;
    return imageData ? `avatarUrl: '${imageData.publicPath}'` : match;
  });
  
  fs.writeFileSync(peoplePath, peopleContent, 'utf8');
  console.log('✅ Updated people.ts with images');
}

// Update agencies data with logos
function updateAgenciesData() {
  const agenciesPath = path.join(process.cwd(), 'src', 'data', 'agencies.ts');
  const images = distributeImages();
  
  let agenciesContent = fs.readFileSync(agenciesPath, 'utf8');
  
  // Update logo URLs
  let itemIndex = 0;
  agenciesContent = agenciesContent.replace(/logoUrl: '([^']*?)'/g, (match, currentImage) => {
    const imageData = images.agencies[itemIndex % images.agencies.length] || images.all[itemIndex % images.all.length];
    itemIndex++;
    return imageData ? `logoUrl: '${imageData.publicPath}'` : match;
  });
  
  fs.writeFileSync(agenciesPath, agenciesContent, 'utf8');
  console.log('✅ Updated agencies.ts with images');
}

// Update Hero components to use hero images
function updateHeroComponents() {
  const images = distributeImages();
  const heroImage = images.hero[0] || images.all[0];
  
  if (!heroImage) {
    console.log('⚠️  No hero image available');
    return;
  }

  // Update V1 Hero
  const heroV1Path = path.join(process.cwd(), 'src', 'components', 'Hero.tsx');
  if (fs.existsSync(heroV1Path)) {
    let heroContent = fs.readFileSync(heroV1Path, 'utf8');
    
    // Add background image to hero section
    heroContent = heroContent.replace(
      'className="relative min-h-screen flex items-center justify-center bg-stone-50"',
      `className="relative min-h-screen flex items-center justify-center bg-stone-50"
      style={{
        backgroundImage: 'linear-gradient(rgba(250, 249, 249, 0.8), rgba(250, 249, 249, 0.8)), url(${heroImage.publicPath})',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}`
    );
    
    fs.writeFileSync(heroV1Path, heroContent, 'utf8');
    console.log('✅ Updated V1 Hero with background image');
  }

  // Update V2 Hero
  const heroV2Path = path.join(process.cwd(), 'src', 'components', 'v2', 'HeroV2.tsx');
  if (fs.existsSync(heroV2Path)) {
    let heroContent = fs.readFileSync(heroV2Path, 'utf8');
    
    // Add background image with dark overlay
    heroContent = heroContent.replace(
      '      {/* Background gradient */}\n      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>',
      `      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        style={{
          backgroundImage: 'url(${heroImage.publicPath})',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="absolute inset-0 bg-slate-900/70" />`
    );
    
    fs.writeFileSync(heroV2Path, heroContent, 'utf8');
    console.log('✅ Updated V2 Hero with background image');
  }

  // V3 Hero remains minimal without images as per design
  console.log('ℹ️  V3 Hero remains image-free for minimal aesthetic');
}

// Update component image placeholders
function updateComponentImages() {
  const images = distributeImages();
  
  // Update news components to show actual images
  const newsComponents = [
    'src/components/NewsCarousel.tsx',
    'src/components/v2/NewsCarouselV2.tsx',
    'src/components/v3/NewsV3.tsx'
  ];
  
  newsComponents.forEach(componentPath => {
    const fullPath = path.join(process.cwd(), componentPath);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace placeholder div with actual image
      content = content.replace(
        /(<div className="[^"]*bg-gradient-to-br[^"]*"[^>]*>)([\s\S]*?)(<\/div>)/g,
        (match, openDiv, innerContent, closeDiv) => {
          if (innerContent.includes('aspect-video') || innerContent.includes('aspect-square')) {
            const imageData = getRandomImage('news') || getRandomImage('general');
            if (imageData) {
              return `${openDiv}
                <img 
                  src="${imageData.publicPath}" 
                  alt="${imageData.alt || 'News image'}"
                  className="w-full h-full object-cover"
                />
              ${closeDiv}`;
            }
          }
          return match;
        }
      );
      
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Updated ${path.basename(componentPath)} with images`);
    }
  });
}

// Create image optimization component
function createImageComponent() {
  const imageComponentContent = `import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
}

export default function OptimizedImage({ 
  src, 
  alt, 
  className, 
  fill = false, 
  width, 
  height, 
  priority = false 
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      fill={fill}
      width={width}
      height={height}
      priority={priority}
      style={{ objectFit: 'cover' }}
    />
  )
}`;

  const componentPath = path.join(process.cwd(), 'src', 'components', 'OptimizedImage.tsx');
  fs.writeFileSync(componentPath, imageComponentContent, 'utf8');
  console.log('✅ Created OptimizedImage component');
}

// Main integration function
async function integrateImages() {
  console.log('🚀 Starting image integration...\n');
  
  try {
    // Update data files
    updateNewsData();
    updateCasesData();
    updatePeopleData();
    updateAgenciesData();
    
    // Update components
    updateHeroComponents();
    updateComponentImages();
    
    // Create helper components
    createImageComponent();
    
    console.log('\n✅ Image integration completed successfully!');
    console.log('\nSummary:');
    console.log(`- Updated news data with ${imageManifest.news.length || imageManifest.general.length} images`);
    console.log(`- Updated cases data with ${imageManifest.cases.length || imageManifest.general.length} images`);
    console.log(`- Updated team data with ${imageManifest.team.length || imageManifest.general.length} images`);
    console.log(`- Updated agencies data with ${imageManifest.agencies.length} images`);
    console.log(`- Updated hero components with background images`);
    console.log(`- Created OptimizedImage component for future use`);
    console.log('\nAll three prototype styles now include real images from paritee.com!');
    
  } catch (error) {
    console.error('❌ Image integration failed:', error);
    process.exit(1);
  }
}

// Run the integration
if (require.main === module) {
  integrateImages();
}

module.exports = integrateImages;