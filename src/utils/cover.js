import fs from 'node:fs';
import path from 'node:path';

const EXTENSIONS = ['.webp', '.jpg', '.jpeg', '.png'];

export function getCover(slug) {
  const publicDir = path.join(process.cwd(), 'public', 'projects');
  
  for (const ext of EXTENSIONS) {
    const filePath = path.join(publicDir, `${slug}${ext}`);
    if (fs.existsSync(filePath)) {
      return `/projects/${slug}${ext}`;
    }
  }
  
  return null;
}