import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const BASE = '/zashchita/'

const html = `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <title>Перенаправление…</title>
    <script>
      var base = '${BASE}';
      var rest = location.pathname.replace(new RegExp('^' + base.replace(/\\/$/, '') + '/?'), '');
      if (rest) {
        location.replace(location.origin + base + '#/' + rest.replace(/^\\//, ''));
      } else {
        location.replace(location.origin + base);
      }
    </script>
  </head>
  <body></body>
</html>
`

writeFileSync(join('dist', '404.html'), html, 'utf8')
console.log('Created dist/404.html with SPA redirect')
