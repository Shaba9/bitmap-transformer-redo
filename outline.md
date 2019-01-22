PIXEL_OFFSET (10): The index in the buffer array representing the index where pixel information starts in the buffer array.
BITS_PER_PIXEL_OFFSET (28): The index in the buffer array representing the number of bits each pixel uses for its information.
FILE_SIZE_OFFSET (2): The index where file-size can be found.

- The header (the first 54 bytes) is information about the file.
- Header information is represented by 4 bytes each; backwards.
- When accessing each byte as an element in the array, it converts to decimal. Manipulate it in decimal. To convert back to hex, use writeUInt8(decimal value to be converted, index/offset to be written to). Assess docs for more details.