let angle = 0;
let c;
let c1;
function setup() {
  c= createCanvas(1300, 1300, WEBGL);
    c.parent("container");
  frameRate(60);
  pixelDensity(2);
    c1 = createGraphics(2400, 2400);

}

function draw() {
  background(255);
  clear();
  angle += 360 / 60 / frameRate();

  rotateX(map(mouseX, 0, width, -PI, PI)); // mouse-controlled X rotation
  rotateY(angle * 0.01); // slow continuous Y rotation
  rotateZ(angle * 0.005); // slow continuous Z rotation for extra depth

  noFill();
  strokeWeight(1);

  // Draw multiple spirals with different transforms
  push();
  rotateY(angle * 0.01);
  spiral3D(color("#24e3c3"));
  pop();

  push();
  rotateZ(angle * 0.02);
  spiral3D(color("#ff88ff"));
  pop();

  push();
  rotateY(angle * 0.03);
  spiral3D1(color("#000099"));
  pop();

  // Optional center ring
  push();
  stroke(0);
  strokeWeight(5);
  ellipse(0, 0, 400, 400);
  pop();
}

function spiral3D(c) {
  c1.stroke(c);
  c1.beginShape();
  for (let i = 0; i < 3150; i += 0.5) {
    let r = i / 5.9 +
      (max(0, i / 450) * cos(radians(i / 20 + 21))) * sin(radians(i * 8)) +
      (max(0, i / 300) * cos(radians(i / 15 + 21))) * sin(radians(i * 16));
    let x = -r * cos(radians(i * 4));
    let y = r * sin(radians(i * 4));
    let z = sin(i * 0.02) * 50; // adds depth
    c1.vertex(x, y, z);
  }
  c1.endShape();
    image(c1, -1400 / 2, -1400 / 2, 2800 / 2, 2800 / 2);

}

function spiral3D1(c) {
  c1.stroke(c);
  c1.beginShape();
  for (let i = 0; i < 3150; i += 0.5) {
    let r = i / 5.9 +
      (max(0, i / 250) * cos(radians(i / 50 + 21))) * sin(radians(i * 24)) +
      (max(0, i / 200) * cos(radians(i / 10 + 21))) * sin(radians(i * 12));
    let x = -r * cos(radians(i * 4));
    let y = r * sin(radians(i * 4));
    let z = cos(i * 0.015) * 60;
    c1.vertex(x, y, z);
  }
  c1.endShape();
    image(c1, -1400 / 2, -1400 / 2, 2800 / 2, 2800 / 2);

}
