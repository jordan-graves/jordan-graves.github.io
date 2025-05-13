let angle = 0;
//37
//32

let c1;
let c;
function setup() {
  c = createCanvas(1300, 1300);
  c.parent("container");
  frameRate(60);
  c1 = createGraphics(2400, 2400);
  // spiral(color(0,0,0));
  // c1.save("spiral.svg");
  pixelDensity(3);
  // noLoop();
}

function draw() {
  clear();
  // scale(0.4);
  background(255);
  angle += 0.001;
  // console.log(mouseX,mouseY);
  blendMode(MULTIPLY);

  if (frameRate() > 0) {
    angle += 360 / 60 / (frameRate());
  }
  console.log(angle);
  fill(185, 255, 20);
  fill(255);
  // fill(0);
  noStroke();
  ellipse(width / 2, height / 2, 2124, 2124);

  noFill();

  stroke(0);
  noStroke();
  c1.strokeWeight(10);




  push();
  translate(width / 2, height / 2);
  rotate(radians((angle / 3)))
  translate(-0, -0);
  spiral(color("#0077FF"))
  pop();




  //   blendMode(NORMAL);

  push();
  translate(width / 2, height / 2);
  rotate(radians(angle/2))
  translate(10, 0);
  spiral(color("#ffff00"));
  pop();




  push();
  beginShape();
  translate(width / 2, height / 2);
  rotate(radians(angle/2))
  translate(0, 0);
  spiral(color("#FF00CC"));
  pop();



  c1.strokeWeight(5);

  push();
  beginShape();
  translate(width / 2 + 0, height / 2 + 0);
  rotate(radians((0)));
  spiral(color("#000000"));
  pop();


  // ellipse(width/2,height/2,2124,2124);
  //  save("RBW295.svg");
  //  noLoop();

  push();
  stroke(0, 0, 0);
  strokeWeight(75)
  ellipse(width / 2, height / 2, 1225, 1225);
  pop();


  rect(50, 50, 1000, 1250);
  noStroke();


}

function spiral(c) {
  //  blendMode(MULTIPLY);
  c1.clear();
  let mouseX1 = 52;
  let mouseY1 = 21;
  c1.beginShape();
  c1.stroke(c);
  c1.noFill();
  // console.log(frameCount);
  for (let i = 0; i < 6200; i += 0.5) {
    let r = i / 6 + (max(0, i / 190) * cos(radians(i / 15 + mouseY1))) * sin(radians(i * 4 * 4))
      + (max(0, i /300) * cos(radians(i / 30 + mouseY1))) * sin(radians(i * 4 * 5));
    let x = 2400 / 2 - r * cos(radians(i * 4));
    let y = 2400 / 2 + 0 + r * sin(radians(i * 4));
    c1.vertex(x, y);
  }
  c1.endShape();
  // ellipse(0,400,20,20);
  image(c1, -1400 / 2, -1400 / 2, 2800 / 2, 2800 / 2);
}

function mouseClicked() {
  save("cornflower.png");
  //  save("moire-11-14-blue"+int(angle/4)%4+"red"+int(angle)%4+"black"+int(angle/16)%4+"green"+int(angle)%4+".png");
  angle++;
  draw();

}