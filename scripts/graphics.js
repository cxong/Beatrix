var GRID_SIZE = 32;
var PIXEL_SIZE = 20;  // 20x32 is 640, a good size

// Grid / pixel conversions
function g2p(grid) {
  return {x:Math.floor(grid.x) * PIXEL_SIZE, y:Math.floor(grid.y) * PIXEL_SIZE};
}
function p2g(pixel) {
  return {
    x:Math.floor(pixel.x / PIXEL_SIZE),
    y:Math.floor(pixel.y / PIXEL_SIZE)
  };
}
function dir2vel(dir) {
  if (dir === "up") {
    return {x: 0, y: -1};
  } else if (dir === "right") {
    return {x: 1, y: 0};
  } else if (dir === "down") {
    return {x: 0, y: 1};
  } else {
    return {x: -1, y: 0};
  }
}

var BPM = 120;  // Oops! Not graphics, sticking it here anyway
var MS_PER_MINIBEAT = 60 * 1000 / BPM / 4;