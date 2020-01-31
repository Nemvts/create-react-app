const sh = require('shelljs');

sh.echo('Unlinking from: ds-ui-react');
if (sh.exec('yarn unlink "@dealersocket/ds-ui-react"').code !== 0) {
  sh.echo('Error: Unlinking from ds-ui-react');
  sh.exit(1);
}
rm('-rf', 'node_modules/@dealersocket/ds-ui-react');

sh.exec('git checkout .flowconfig');
sh.echo('.flowconfig was reverted to the original version');

sh.echo('\nRe-install the "@dealersocket/ds-ui-react" package');
sh.exec('yarn install --check-files');

sh.exit(0);
