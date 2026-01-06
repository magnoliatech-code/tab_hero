import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '../public/icons');

async function convert() {
  const detailedSvg = path.join(iconsDir, 'icon-detailed.svg');
  const simpleSvg = path.join(iconsDir, 'icon-simple.svg');

  const conversions = [
    { input: detailedSvg, output: 'icon-128.png', size: 128 },
    { input: detailedSvg, output: 'icon-48.png', size: 48 },
    { input: detailedSvg, output: 'icon-32.png', size: 32 },
    { input: simpleSvg, output: 'icon-16.png', size: 16 },
  ];

  for (const { input, output, size } of conversions) {
    const outputPath = path.join(iconsDir, output);
    console.log(`Converting ${path.basename(input)} to ${output} (${size}x${size})...`);
    
    await sharp(input)
      .resize(size, size)
      .png()
      .toFile(outputPath);
      
    console.log(`Saved ${output}`);
  }
}

convert().catch(err => {
  console.error('Error converting icons:', err);
  process.exit(1);
});
