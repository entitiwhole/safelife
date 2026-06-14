import { copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const indexPath = join('dist', 'index.html')
const notFoundPath = join('dist', '404.html')

if (!existsSync(indexPath)) {
  console.error('dist/index.html not found — run build first')
  process.exit(1)
}

copyFileSync(indexPath, notFoundPath)
console.log('Copied dist/index.html -> dist/404.html')
