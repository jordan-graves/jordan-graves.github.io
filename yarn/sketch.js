let slider1;
let slider2;
let slider3;

function setup() {
  createCanvas(800, 400);
  textAlign(CENTER, CENTER);
  slider1 = createSlider(1, 59,15);
  slider1.position(10, 370);
  slider1.size(180);
  
  slider2 = createSlider(2, 6,2);
  slider2.position(410, 370);
  slider2.size(180);
  
   slider3 = createSlider(30, 120,60);
  slider3.position(310, 40);
  slider3.size(180);
}

function draw() {
  background(220);
  stroke(0);
  noFill();

  push();
  noStroke();
  fill(0);
  text("Circle Variable: "+slider1.value(),90,360);
    text("Cardioid Variable: "+slider2.value(),90+400,360);
      text("Number of Divisions: "+slider3.value(),400,70);
  pop();
  translate(200, height / 2);

  ellipse(0, 0, 300, 300);
  line(-180, 0, 180, 0);
  line(0, -180, 0, 180);

  
  for (let i = 0; i < slider3.value(); i = i + 1) {
    let angle = (i / slider3.value()) * 2 * PI;
    let x = 150 * cos(angle);
    let y = -150 * sin(angle);
    text(i, x, y);
  //  triangle(0,0,x,y,x,0);
  }
  
  stroke(0,0,255);
    for (let i = 0; i < slider3.value(); i = i + 1) {
    drawLine(i,i+slider1.value(),slider3.value());
    }
  
  stroke(0);
  translate(400, 0);

  ellipse(0, 0, 300, 300);
  line(-180, 0, 180, 0);
  line(0, -180, 0, 180);

  
  for (let i = 0; i < slider3.value(); i = i + 1) {
    let angle = (i / slider3.value()) * 2 * PI;
    let x = 150 * cos(angle);
    let y = -150 * sin(angle);
    text(i, x, y);
  //  triangle(0,0,x,y,x,0);
  }
  
  stroke(255,0,0);
  for (let i = 0; i < slider3.value(); i = i + 1) {
    drawLine(i,i*slider2.value(),slider3.value());
    }
  
  
}

function drawLine(start, stop, num) {
  
  let angle = (start / num) * 2 * PI;
  let x = 150 * cos(angle);
  let y = -150 * sin(angle);

  let angle1 = (stop / num) * 2 * PI;
  let x1 = 150 * cos(angle1);
  let y1 = -150 * sin(angle1);
  line(x, y, x1, y1);
  
}