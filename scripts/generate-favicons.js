const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pngToIco = require('png-to-ico');

// Paths
const SVG_PATH = path.join(__dirname, '../public/favicon.svg');
const OUT_DIR = path.join(__dirname, '../public');

// Read the SVG file
const svgBuffer = fs.readFileSync(SVG_PATH);

// Generate favicon PNGs and ICO
async function generateFavicons() {
  const sizes = [16, 32, 48];
  const buffers = await Promise.all(
    sizes.map(size => 
      sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toBuffer()
    )
  );
  
  // Write individual PNGs for debug and other uses
  await Promise.all(
    buffers.map((buffer, i) => 
      fs.promises.writeFile(
        path.join(OUT_DIR, `favicon-${sizes[i]}.png`), 
        buffer
      )
    )
  );

  console.log('Generated favicon PNG files');
  
  // Create paths array for the ico generator
  const pngPaths = sizes.map(size => path.join(OUT_DIR, `favicon-${size}.png`));
  
  // Generate the favicon.ico file
  try {
    const icoBuffer = await pngToIco(pngPaths);
    await fs.promises.writeFile(path.join(OUT_DIR, 'favicon.ico'), icoBuffer);
    console.log('Generated favicon.ico');
  } catch (error) {
    console.error('Error generating favicon.ico:', error);
  }
}

// Generate Apple Touch Icon
async function generateAppleTouchIcon() {
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(OUT_DIR, 'apple-touch-icon.png'));
  
  console.log('Generated Apple Touch Icon');
}

// Generate Safari Pinned Tab SVG
async function generateSafariPinnedTab() {
  // For Safari pinned tab, we'll create a simplified monochrome version
  const safariSvg = `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L2 30H30L16 2Z M9 22H23" stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  
  fs.writeFileSync(path.join(OUT_DIR, 'safari-pinned-tab.svg'), safariSvg);
  console.log('Generated Safari Pinned Tab SVG');
}

// Generate site.webmanifest
async function generateWebManifest() {
  const manifest = {
    name: "Advait Portfolio",
    short_name: "Advait",
    icons: [
      {
        src: "/favicon-48.png",
        sizes: "48x48",
        type: "image/png"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ],
    theme_color: "#2d2d2d",
    background_color: "#2d2d2d",
    display: "standalone"
  };

  fs.writeFileSync(
    path.join(OUT_DIR, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('Generated site.webmanifest');
}

// Run all generation functions
async function generateAll() {
  try {
    await generateFavicons();
    await generateAppleTouchIcon();
    await generateSafariPinnedTab();
    await generateWebManifest();
    console.log('All favicon assets generated successfully!');
  } catch (error) {
    console.error('Error generating favicon assets:', error);
  }
}

generateAll();