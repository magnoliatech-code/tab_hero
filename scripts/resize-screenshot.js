import sharp from 'sharp';

async function resize() {
  try {
    await sharp('screen_shot.png')
      .resize(640, 400, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toFile('screenshot-640x400.png');
    console.log('Successfully resized screen_shot.png to screenshot-640x400.png');
  } catch (error) {
    console.error('Error resizing image:', error);
    process.exit(1);
  }
}

resize();
