import ghpages from 'gh-pages';

ghpages.publish('./docs', function (...args) {
  console.log(...args);
});
