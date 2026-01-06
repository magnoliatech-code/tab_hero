import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Manifest Configuration', () => {
  const manifestPath = path.resolve(__dirname, '../manifest.json');

  it('should have icons defined in manifest', () => {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    expect(manifest.icons).toBeDefined();
    expect(manifest.icons['16']).toBe('icons/icon-16.png');
    expect(manifest.icons['128']).toBe('icons/icon-128.png');
  });

  it('should have default_icon defined in action', () => {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    expect(manifest.action).toBeDefined();
    expect(manifest.action.default_icon).toBeDefined();
    expect(manifest.action.default_icon['16']).toBe('icons/icon-16.png');
  });
});
