let pg;
let pg1;
let video;
let color1;
let color2;
let cp1; 
let cp2; 

function setup() {
  createCanvas(1000, 1000, WEBGL);
  pixelDensity(2);
  
  let p1 = createP("Background Color:  ");
  p1.position(20,20);
  cp1 = createColorPicker('#0000ff'); 
  cp1.position(210, 44);
  
    let p2 = createP("Foreground Color:  ");
  p2.position(20,70);
  cp2 = createColorPicker('#000000');
  cp2.position(210, 70+24);

  pg = createGraphics(1200, 1200);

  spiral3D(color(255, 255, 255));
  
  angleMode(RADIANS);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
}

function spiral3D(c) {
  pg.clear();
  pg.noFill();
  pg.stroke(c);
  pg.strokeWeight(5);
  pg.rotate(PI / 8);
  let inc = 7;
  for (let y = 0; y < pg.height * 2; y += inc) {
    pg.beginShape();
    for (let x = -pg.width; x < pg.width; x++) {
      let a = 1;
      let s = 1.0;
      let t = 1.0;
      let r = a * 8 * sin(radians(y * 0.6 * s + x * 1.8 * t)) * cos(radians(x / 2 * t + y * 1.5 * s + 60)) +
        8 * cos(radians(x * 1.6 / 2 * t + y * 0.1 * s + 90)) * cos(radians(x / 8 * t + y * 2.0 * s));
      pg.curveVertex(y + r, x);
    }
    pg.endShape();
    inc += 0.04;
  }
}

function draw() {
  color1 = cp1.color();
  color2 = cp2.color();

  background(255);

  let angleX = map(mouseX, 0, width, PI / 16, -PI / 16);
  let angleY = map(mouseY, 0, width, -PI / 16, PI / 16);

  rotateY(angleX);
  rotateX(angleY);

  fill(150);
  scale(-1, 1);
  texture(video);
  plane(800, 480 * 800 / 640);
  
  noFill();
  noStroke();

  // First Layer
  push();
  texture(pg);
  tint(color1); 
  translate(0, 0, 0.1);
  plane(800, 800);
  pop();

  // Second Layer
  push();
  texture(pg);
  translate(0, 0, 20);
  tint(color2); 
  plane(800, 800);
  pop();
}