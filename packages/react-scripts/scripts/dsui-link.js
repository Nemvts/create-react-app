const sh = require('shelljs');

if (sh.exec('yarn link "@dealersocket/ds-ui-react"').code !== 0) {
  sh.echo('Error: Linking to ds-ui-react');
  sh.echo('Make sure that in the web.lib.ds-ui-react project you first run:');
  sh.echo('yarn build');
  sh.echo('cd build');
  sh.echo('yarn link');
  sh.exit(1);
}
sh.cp('-f', '.flowconfig.linked.to.ds-ui-react', '.flowconfig');
sh.echo(
  '\n.flowconfig was modified to use the "linked.to.ds-ui-react" version'
);

sh.exit(0);
