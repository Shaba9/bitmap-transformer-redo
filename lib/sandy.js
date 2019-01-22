const fs = require('fs');

fs.readFile('../test/test-bitmap.bmp', (err, test) => {
  fs.writeFile('./test2.bmp', test, () => {
    console.log('test2 done');
    fs.readFile('./test2.bmp', (err, test2) => {

      let copy = Buffer.from(test2).slice();
      console.log('copy', copy[28]);
      for(let i = 54; i <= copy.length - 3; i += 3) {
        copy.writeUInt8(255 - copy[i], i);
        copy.writeUInt8(255 - copy[i], i + 1);
        copy.writeUInt8(255 - copy[i], i + 2);
      }

      fs.writeFile('./test3.bmp', copy, () => {
        console.log('test3 done');
      });
    });
  });
});
