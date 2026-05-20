function setup() {
  createCanvas(1200, 400);
}

function draw() {
  background(0);
  noStroke();
  fill(255,0,0);
  for (let y=-100; y<height+100; y+=10) {
  for (let x=0; x<width; x++) {
    let y1 = y+40*sin(x/90)*sin(x/300);
    ellipse(x,y1,5,5);
  }
  }
  fill(0);
  // for (let i=0; i<10000; i+=0.5) {
  //   let r = 5*cos(radians(i*5));
  //   let x = mouseX+(i/50+r)*cos(radians(i+mouseX/PI));
  //   let y = height/2+(i/50+r)*sin(radians(i+mouseX/PI));
  //    ellipse(x,y,3,3);
  // }
  
  
  translate(mouseX,height/2);
  rotate(mouseX/150);
   // rect(-150,-150,300,300);
  
    fill(0,0,255);
  for (let y=-200; y<250; y+=10) {
  for (let x=-200; x<200; x++) {
    let y1 = y+30*sin(x/150-y/90)*sin(x/100+y/190);
    if (dist(0,0,x,y1)<200)
    ellipse(x,y1,5,5);
  }
  }

}