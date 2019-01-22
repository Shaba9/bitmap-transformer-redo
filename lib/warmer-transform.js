const {
  PIXEL_OFFSET,
  BITS_PER_PIXEL_OFFSET, //could be 24
} = require('./constants');

module.exports = buff => {
  const increment = buff[BITS_PER_PIXEL_OFFSET] / 8;
  let warmed = buff.slice();
  for(let i = warmed[PIXEL_OFFSET]; i <= warmed.length - increment; i += increment) {
    warmed.writeUInt8(warmed[i] / 1.5, i);
    warmed.writeUInt8(warmed[i + 1] / 1.5, i + 1);
    warmed.writeUInt8(Math.abs(warmed[i + 2] * 2 - 255), i + 2);
  }

  return warmed;
};
