const fs = require('fs');
const invert = require('./invert-transform');
const grey = require('./grey-transform');
const warm = require('./warmer-transform');

// create a reader that reads full hex value of offsets before passing to transform functions.

fs.readFile('../images/test-bitmap.bmp', (err, test) => {
  const inverted = invert(Buffer.from(test));

  fs.writeFile('./transformed/inverted.bmp', inverted, () => {
    console.log('inverted done');
  });
});

fs.readFile('../images/test-bitmap.bmp', (err, test) => {
  const greyed = grey(Buffer.from(test));

  fs.writeFile('./transformed/greyed.bmp', greyed, () => {
    console.log('greyed done');
  });
});

fs.readFile('../images/test-bitmap.bmp', (err, test) => {
  const warmed = warm(Buffer.from(test));

  fs.writeFile('./transformed/warmed.bmp', warmed, () => {
    console.log('warmed done');
  });
});
