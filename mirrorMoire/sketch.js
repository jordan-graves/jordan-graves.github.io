let pg;
let pg1;
let video;
let color1;
let color2;
let cp1; 
let cp2; 
let sw;
function setup() {
  createCanvas(600, 1000, WEBGL);
  pixelDensity(2);
  
  let p1 = createP("Background Color:  ");
  p1.position(20,20-10);
  cp1 = createColorPicker('#0000ff'); 
  cp1.position(210, 44-10);
  
    let p2 = createP("Foreground Color:  ");
  p2.position(20,70-30);
  cp2 = createColorPicker('#000000');
  cp2.position(210, 70+24-30);

    let p3 = createP("Line Thickness:  ");
  p3.position(20,70+50-50);
 sw = createSlider(3,5,4,1);
   sw.position(210-30, 70+48+12-30);
   sw.input(function() {spiral3D(color(255, 255, 255))})

  pg = createGraphics(400, 1000);

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
  pg.strokeWeight(sw.value());
 
  let inc = 10;
  for (let y = 0; y < pg.width * 2; y += inc) {
    pg.beginShape();
    for (let x = -pg.height; x < pg.height*2; x++) {
      let a = 1;
      let s = 1.0;
      let t = 1.0;
      let r = a * 6 * sin(radians(y * 0.8 * s + x * 2 * t)) 
          * cos(radians(x * 1/3 * t + y * -2 * s + 60)) 
      +
        7 * cos(radians(x * 1/2 * t + y * -0.5 * s + 0)) 
       //   * cos(radians(x * 1 * t + y * 1.0 * s));
      pg.curveVertex(y + r, x);
    }
    pg.endShape();
    //inc += 0.04;
  }
}

function draw() {
  color1 = cp1.color();
  color2 = cp2.color();

  background(150);

  let angleX = map(mouseX, 0, width, PI / 16, -PI / 16);
  let angleY = map(mouseY, 0, width, -PI / 16, PI / 16);

  rotateY(angleX);
  rotateX(angleY);

  fill(150);
  scale(-1, 1);
  texture(video);
  plane(800, 480 * 800 / 640);
  fill(150);
  push();
  translate(510, 0, 0.05);
  plane(800, 480 * 800 / 640);
  pop();
   push();
  translate(-610, 0, 0.05);
  plane(800, 480 * 800 / 640);
  pop();
  noFill();
  noStroke();

  // First Layer
  push();
  texture(pg);
  tint(color1); 
  translate(-50, 0, 0.1);
  plane(800/5*2, 800);
  pop();

  // Second Layer
  push();
  texture(pg);
  translate(-50, 0, 20);
  tint(color2); 
  plane(800/5*2, 800);
  pop();
}