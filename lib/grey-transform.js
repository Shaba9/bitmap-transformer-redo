const {
  PIXEL_OFFSET,
  BITS_PER_PIXEL_OFFSET, //could be 24
} = require('./constants');

module.exports = buff => {
  const increment = buff[BITS_PER_PIXEL_OFFSET] / 8;
  let greyed = buff.slice();
  for(let i = greyed[PIXEL_OFFSET]; i <= greyed.length - increment; i += increment) {
    const rgb = [greyed[i], greyed[i + 1], greyed[i + 2]];
    const avg = rgb.reduce((a, b) => a + b) / rgb.length;
    greyed.writeUInt8(avg, i);
    greyed.writeUInt8(avg, i + 1);
    greyed.writeUInt8(avg, i + 2);
  }

  return greyed;
};
