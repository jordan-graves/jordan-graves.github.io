let pg;
let pg1;
function setup() {
  createCanvas(800, 800, WEBGL);
  pixelDensity(2);
//  pg = createGraphics(1200, 1200, SVG);
    pg = createGraphics(1200, 1200);

  //pg.pixelDensity(2);
  spiral3D(color(255,255,255));
  
    //pg1 = createGraphics(1200, 1200, SVG);
      pg1 = createGraphics(1200, 1200);

 // pg1.pixelDensity(2);
  spiral3D1(color(255,255,255));
  //pg.save("frontlayer.svg")
  //pg1.save("backlayer.svg")
angleMode(RADIANS)
}

function spiral3D(c) {
  pg.clear();
  //pg.background(255,0,0);
  pg.noFill();
  pg.stroke(c);
  pg.strokeWeight(5);
  pg.translate(pg.width/2,pg.height/2);
  pg.beginShape();
  
  for (let i = 0; i < 3150; i += 0.5) {
    let r = i / 5.9 +
      (max(0, i / 150) * cos(radians(i / 15 ))) * sin(radians(i * 1* 4)) +
      (max(0, i / 230) * cos(radians(i / 10 ))) * sin(radians(i * 1 * 4));
    let x = -r * cos(radians(i * 4));
    let y = r * sin(radians(i * 4));
    pg.vertex(x, y);
  }
  pg.endShape();
}

function spiral3D1(c) {
  pg1.clear();
  //pg.background(255,0,0);
  pg1.noFill();
  pg1.stroke(c);
  pg1.strokeWeight(7);
  pg1.translate(pg.width/2,pg.height/2);
  pg1.beginShape();
  
  for (let i = 0; i < 3150; i += 0.5) {
    let r = i / 5.9 +
      (max(0, i / 300) * cos(radians(i / 40 + 21))) * sin(radians(i * 1 * 4)) +
      (max(0, i / 600) * cos(radians(i / 20 + 21))) * sin(radians(i * 15 * 4));
    let x = -r * cos(radians(i * 4));
    let y = r * sin(radians(i * 4));
    pg1.vertex(x, y);
  }
  pg1.endShape();
}
function draw() {
  background(255);
  clear();

  // Rotate on X-axis based on mouseX
  let angleX = map(width/2+150*sin(radians(frameCount/1/2)), 0, width, -PI / 2, PI / 2);
  
   let angleY = map(width/2+50*sin(radians(frameCount/1.5/2)), 0, width, -PI / 2, PI / 2);

  rotateY(angleX);
  rotateX(angleY); // Optional: you could also use mouseY here


    fill(0,0,255);
  ellipse(0,0,720,720);
  noFill();

  noStroke();
// Apply the pg buffer as a texture

  push();
  texture(pg1); 
  tint(color(255,205,0));
  rotate(2*PI/3);
  translate(0,0,0.1);
  plane(800, 800);
  tint(color(255,255,255));
  rotate(2*PI/3);
  translate(0,0,0.1);
 // plane(800, 800);
  tint(color(255,50,0));
  rotate(2*PI/3);
  translate(0,0,0.1);
  plane(800, 800);
  pop();
  
  
  push();
  texture(pg);
  translate(0,0,40);
  tint(color(0,0,0));
  rotate(PI);
  plane(800, 800); // Width and height of the rectangle
  pop();
}