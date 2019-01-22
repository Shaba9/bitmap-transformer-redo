const {
  PIXEL_OFFSET,
  BITS_PER_PIXEL_OFFSET, //could be 24
} = require('./constants');

module.exports = buff => {
  const increment = buff[BITS_PER_PIXEL_OFFSET] / 8;
  let inverted = buff.slice();
  for(let i = inverted[PIXEL_OFFSET]; i <= inverted.length - increment; i += increment) {
    inverted.writeUInt8(255 - inverted[i], i);
    inverted.writeUInt8(255 - inverted[i + 1], i + 1);
    inverted.writeUInt8(255 - inverted[i + 2], i + 2);
  }

  return inverted;
};
