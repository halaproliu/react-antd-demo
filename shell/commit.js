var shell = require('shelljs')

if (shell.exec('npm run build').code !== 0) {
  shell.echo('Error: NPM run build failed')
  shell.exit(1)
}

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git')
  shell.exit(1)
}

shell.exec('git add .')
shell.exec('git commit -m "auto commit"')
shell.exec('git push github master')
shell.exec('git push gitee master')
