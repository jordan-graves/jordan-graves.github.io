let angle = 137;
//37
//32

let c1;
let c;
function setup() {
  c=createCanvas(1300, 1300);
  c.parent("container");
  frameRate(60);
    c1 = createGraphics(2400,2400);
 // spiral(color(0,0,0));
 // c1.save("spiral.svg");
  pixelDensity(3);
  //noLoop();
}

function draw() {
  clear();
 // scale(0.4);
  background(255);
  angle +=0.001;
 // console.log(mouseX,mouseY);
//  blendMode(MULTIPLY);
 
  if (frameRate()>0) {
  angle += 360/60/(frameRate());
}
  console.log(angle);
  fill(185,255,20);
  fill("#008888");
  fill(0);
  noStroke();
  ellipse(width/2,height/2,1250/2,1250/2);
  
  noFill();
  
  stroke(0);
  noStroke();
  c1.strokeWeight(5);

      push();
  translate(width/2,height/2);
  rotate(radians((angle/2)))
    translate(-0,-0);
  spiral(color("#0000ff"))
   pop();
  


  
 //   blendMode(NORMAL);
  


  
  
    push();
    beginShape();
  translate(width/2,height/2);
  rotate(radians(angle))
  translate(0,0);
 spiral(color("#FF0088"));
 pop();
  

  push();
    beginShape();
   translate(width/2+0,height/2+0);
 

  rotate(radians((0)));
  spiral(color("#000000"));
  pop();
 // ellipse(width/2,height/2,2124,2124);
//  save("RBW295.svg");
//  noLoop();

push();
blendMode(NORMAL);
stroke(40,40,200);
//stroke(230,20,0);
//stroke(230,180,0);
strokeWeight(75)
ellipse(width/2,height/2,1225/2+50,1225/2+50);
pop();
  
  rect(50,50,1000,1250);
  noStroke();


}

function spiral(c) {
//  blendMode(MULTIPLY);
c1.clear();
   let mouseX1= 52;
  let mouseY1 = 21;
   c1.beginShape();
  c1.stroke(c);
  c1.noFill();
 // console.log(frameCount);
  for (let i=0; i<7200/2; i+=0.5) {
    let r = i/7+(max(0,i/500)*cos(radians(i/15+mouseY1)))*sin(radians(i*4*9))
    +(max(0,i/700)*cos(radians(i/7+mouseY1)))*sin(radians(i*4*10));
    let x = 2400/2-r*cos(radians(i*4));
    let y = 2400/2+0+r*sin(radians(i*4));
    c1.vertex(x,y);
  }
    c1.endShape();
 // ellipse(0,400,20,20);
  image(c1,-1400/2,-1400/2,2800/2,2800/2);
}

function mouseClicked() {
  save("cornflower.png");
//  save("moire-11-14-blue"+int(angle/4)%4+"red"+int(angle)%4+"black"+int(angle/16)%4+"green"+int(angle)%4+".png");
  angle++;
  draw();
  
}