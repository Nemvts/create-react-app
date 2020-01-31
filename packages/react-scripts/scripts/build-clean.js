require('shelljs');

echo('Clean starting...');

// Remove build
rm('-rf', 'build');

// Remove test output
rm('-rf', 'coverage');
rm('-rf', '.nyc_output');

echo('Clean complete.');
echo('\n');

exit(0);
