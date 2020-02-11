/**
 * WARNING! This is a DESTRUCTIVE script!
 * 1) The .git folder will be DELETED, disconnecting this project from the git repo.
 * 2) It will DELETE ALL THE CODE in the src/area folder
 * 3) It initializes the src folder with the content found in the src-startup folder.
 */
require('shelljs');

if (!test('-e', 'src-startup')) {
  echo('This script can only run once.');
  exit(1);
}

echo('delete-git-and-all-areas starting...');

echo('Delete .git folder');
rm('-rf', '.git/');

echo('Delete all areas');
rm('-rf', 'src/area');

echo('Recursive copy all code from the src-startup folder into the src folder');
cp('-Rf', 'src-startup/*', 'src');

echo('Delete the src-startup folder');
rm('-rf', 'src-startup');

echo('Delete this script so it cannot be run a second time');
rm('-rf', 'bin/delete-git-and-all-areas.js');

echo('\ndelete-git-and-all-areas complete.');

echo('\n\n1. Change project name in package.json');
echo(
  '\n2. Check-in code into your new repo with: "git init && git add . && git commit -m "Initial commit"'
);
echo('\n3. Happy Coding!!!');

exit(0);
