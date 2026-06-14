import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const BASE = '/zashchita/'

const html = `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <title>Перенаправление…</title>
    <script>
      sessionStorage.setItem('spa-redirect', location.pathname + location.search + location.hash);
      location.replace(location.origin + '${BASE}');
    </script>
  </head>
  <body></body>
</html>
`

writeFileSync(join('dist', '404.html'), html, 'utf8')
console.log('Created dist/404.html with SPA redirect')
