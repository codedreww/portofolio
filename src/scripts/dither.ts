// What a scene knows about the dot it is shading.
interface Dot {
  x: number; // column, counted in dots
  y: number; // row, counted in dots
  u: number; // 0 at the left edge, 1 at the right
  v: number; // 0 at the top, 1 at the bottom
  w: number; // canvas width in dots
  h: number; // canvas height in dots
  t: number; // seconds since the page loaded
  pointer: number; // 0 when the pointer is at the left of the window, 1 at the right
}

// A scene returns a brightness from 0 (background) to 1 (accent colour).
type Scene = (d: Dot) => number;

const DOT = 4; // size of one dot in CSS pixels. Larger is chunkier and faster.
const FRAME_MS = 33; // about 30 frames a second

// randomizer
function random(i: number, j: number) {
  const n = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

// Sky with a sun in it.
function sky(d: Dot, horizon: number) {
  const radius = Math.min(d.w, d.h) * 0.18;
  const sunX = (0.35 + (d.pointer - 0.5) * 0.25) * d.w;
  const sunY = 0.34 * d.h;
  const distance = Math.hypot(d.x - sunX, d.y - sunY);
  if (distance < radius) return 1;
  const glow = Math.max(0, 1 - distance / (radius * 3.5)) * 0.4;
  return 0.06 + (0.3 * d.v) / horizon + glow;
}

// homepage: Two ridges of hills under a sun.
const hills: Scene = (d) => {
  const near =
    0.82 + 0.05 * Math.sin(d.u * 3.5 - d.t * 0.1) + 0.02 * Math.sin(d.u * 21);
  if (d.v > near) {
    const grass = Math.sin(d.u * 60 + d.v * 90) > 0.6 ? 0.12 : 0;
    return 0.05 + (0.1 * (d.v - near)) / (1 - near) + grass;
  }
  const far =
    0.62 + 0.07 * Math.sin(d.u * 5 + d.t * 0.15) + 0.03 * Math.sin(d.u * 14);
  if (d.v > far) return 0.5 - (0.35 * (d.v - far)) / (1 - far);
  return sky(d, 0.62);
};

// The names here are the ones you write in a markdown file's "scene" field.
const scenes: Record<string, Scene> = { hills };

// Turns "#ffc799" into [255, 199, 153].
function hexToRgb(value: string) {
  const n = parseInt(value.trim().slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// One Dot object is reused for every dot, so the loop creates no garbage.
const dot: Dot = { x: 0, y: 0, u: 0, v: 0, w: 0, h: 0, t: 0, pointer: 0.5 };
let pointer = 0.5;

function draw(canvas: HTMLCanvasElement, scene: Scene, seconds: number) {
  if (!canvas.clientWidth) return;
  const w = Math.max(8, Math.round(canvas.clientWidth / DOT));
  const h = Math.max(8, Math.round(canvas.clientHeight / DOT));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  const context = canvas.getContext("2d");
  if (!context) return;

  const style = getComputedStyle(document.documentElement);
  const ink = hexToRgb(style.getPropertyValue("--accent"));
  const paper = hexToRgb(style.getPropertyValue("--bg"));

  const image = context.createImageData(w, h);
  const pixels = image.data;
  dot.w = w;
  dot.h = h;
  dot.t = seconds;
  dot.pointer = pointer;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      dot.x = x;
      dot.y = y;
      dot.u = x / w;
      dot.v = y / h;
      // The mask: an evenly spread threshold from 0 to 1 for this position.
      const m = 0.7548776662 * x + 0.56984029 * y;
      const threshold = m - Math.floor(m);
      const colour = scene(dot) > threshold ? ink : paper;
      const i = (y * w + x) * 4;
      pixels[i] = colour[0];
      pixels[i + 1] = colour[1];
      pixels[i + 2] = colour[2];
      pixels[i + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);
}

let frame = 0;

// Finds the canvas on the current page and starts drawing the scene it names.
export function startScene() {
  cancelAnimationFrame(frame);
  const canvas = document.querySelector<HTMLCanvasElement>("#scene");
  if (!canvas) return;
  const scene = scenes[canvas.dataset.scene ?? ""] ?? hills;

  // Visitors who ask for less motion get one still picture.
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    draw(canvas, scene, 0);
    return;
  }

  let last = 0;
  const tick = (now: number) => {
    frame = requestAnimationFrame(tick);
    if (now - last < FRAME_MS) return;
    last = now;
    draw(canvas, scene, now / 1000);
  };
  frame = requestAnimationFrame(tick);
}

addEventListener("pointermove", (event) => {
  pointer = event.clientX / innerWidth;
});
addEventListener("resize", startScene);
