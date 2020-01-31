require('shelljs');

echo('Delete node_modules starting...');

rm('-rf', 'node_modules');

echo('Delete node_modules complete.');
echo('\n');

exit(0);
