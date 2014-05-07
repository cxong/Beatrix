var GRID_SIZE = 32;
var PIXEL_SIZE = 20;  // 20x32 is 640, a good size

// Grid / pixel conversions
function g2p(grid) {
  return {x:grid.x * PIXEL_SIZE, y:grid.y * PIXEL_SIZE};
}
function p2g(pixel) {
  return {
    x:Math.floor(pixel.x / PIXEL_SIZE),
    y:Math.floor(pixel.y / PIXEL_SIZE)
  };
}

var BPM = 120;  // Oops! Not graphics, sticking it here anyway
var MS_PER_BEAT = 60 * 1000 / BPM;