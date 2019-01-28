# Helpful Insights About Bitmap in Regards to this Lab

## Workings of a Bitmap File: Abridged

A bitmap file is an image file. When reading the file in code world, using `fs ` for example, the returned data is in the form of a buffer. A buffer is a giant array of hexadecimal values representing information about the file.

It looks something like this:

```
<Buffer 42 4d 66 75 00 00 00 00 00 00 36 00 00 00 28 00 00 00 64 00 00 00 64 00 00 00 01 00 18 
00 00 00 00 00 30 75 00 00 12 0b 00 00 12 0b 00 00 00 00 00 00 ... >
```
The buffer holds values that not only represent pixel information but general file information. To distinguish between them, and find the point at which pixels start to be represented, some knowledge about the offsets needs to be gathered.

The first 54 bytes (elements in the buffer "array") is general file information, and is known as the Header. Each type of information is also represented by a varying number of bytes. Let's take file-size as an example:

## File-Size Offset: Size of the file

```
- The file-size offset is 2, and is represented by 4 bytes (this can be confirmed by the Wiki docs).
- The first 4 hex values starting at offset 2 are `66, 75, 00, 00`. 
- Full hex value, then, comes out to: `66750000`.

Or does it...?

- Since this is an LE file, it is actually: `00007566`.
- Converting to decimal: `30054`.

Therefore, the file-size is 30054 bits.
```

## Pixel Offset: Where pixel information starts

```
- Offset: 10
- Bytes: 2
- Hex: 3600
- HexLE: 0036

0036 => 54

Offset at which pixels start in the buffer is 54.
```

## Bits Per Pixel Offset: Number of bits each pixel takes up

```
- Offset: 28
- Bytes: 4
- Hex: 18000000
- HexLE: 00000018

00000018 => 24

Number of bits each pixel uses is 24 (3 bytes), each byte representing the respective `b, g, r` value.
```

## Some Tips
* The default encoding for `fs.readFile` is a buffer. Keep it this way. Changing it to `utf8` messes up the buffer array!
* When accessing each byte as an element in the array, value returns as a decimal. Manipulate it in decimal to get the desired transformation.
* To have a final value in decimal of the sought after information, use
```
readUIntLE(offset, bytes represented by)
```
  * Assess docs for more details.
* To convert back to hex and insert it into the buffer, use
```
 writeUInt8(decimal value to be converted, offset to be written to)
```
  * Assess docs for more details.
* Bitmap color order is `bgr`, as opposed to the customary `rgb`.

## Summary
* FILE_SIZE_OFFSET (2): The offset where file-size can be found.
* PIXEL_OFFSET (10): The offset in the buffer representing the offset where pixel information starts.
* BITS_PER_PIXEL_OFFSET (28): The offset representing the number of bits each pixel uses for its information.
* Header information is represented by a certain number of bytes each:
  - PIXEL_OFFSET is represented by 4 bytes.
  - BITS_PER_PIXEL_OFFSET is represented by 2 bytes.
  - FILE_SIZE_OFFSET is represented by 4 bytes.
* To make things more complicated, each set is read backwards because it is an LE file.