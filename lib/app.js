const fs = require('fs');
const invert = require('./invert-transform');

// create a reader that reads full hex value of offsets before passing to transform functions.

fs.readFile('../test/test-bitmap.bmp', (err, test) => {

  const inverted = invert(Buffer.from(test));

  fs.writeFile('./transformed/inverted.bmp', inverted, () => {
    console.log('test3 done');
  });
});
