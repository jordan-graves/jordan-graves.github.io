let x = 0;
let x1 = 1920;
function setup() {
  createCanvas(1920, 1080);
}

function draw() {
  background(0);
  noStroke();
  fill(255,0,200);
  rect(x,0,x1-x,height);
  fill(255);
  textAlign(CENTER);
  textSize(100);
  text(x,200,500)
  text(x1,1600,500)
}

function mousePressed() {
  if (mouseX<x+10) {
    x--;
    x = max(x,0);
  }
   else if (mouseX>x+10&&mouseX<width/2) {
    x++;
    x = min(x,width/2);
  }
  
  else  if (mouseX>x1-10) {
    x1++;
    x1 = min(x1,width);
  }
   else if (mouseX<x1-10&&mouseX>width/2) {
    x1--;
    x1 = max(x1,width/2);
  }
}