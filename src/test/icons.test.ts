import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Icon Assets', () => {
  const iconsDir = path.resolve(__dirname, '../../public/icons');

  it('should have a detailed SVG icon', () => {
    const filePath = path.join(iconsDir, 'icon-detailed.svg');
    expect(fs.existsSync(filePath)).toBe(true);
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('<svg');
    expect(content).toContain('hsl(12, 76%, 61%)');
  });

  it('should have a simplified SVG icon', () => {
    const filePath = path.join(iconsDir, 'icon-simple.svg');
    expect(fs.existsSync(filePath)).toBe(true);
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('<svg');
    expect(content).toContain('hsl(12, 76%, 61%)');
  });

  it('should have generated PNG icons', () => {
    const pngs = ['icon-16.png', 'icon-32.png', 'icon-48.png', 'icon-128.png'];
    pngs.forEach(png => {
      const filePath = path.join(iconsDir, png);
      expect(fs.existsSync(filePath), `${png} should exist`).toBe(true);
    });
  });
});
