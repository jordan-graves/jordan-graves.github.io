let img1, img2;
let angle = 0;

const realSize = 24;      // 12 inches
const realSpacing = 0.375; // 3/8 inches
const scaleFact = 20;     // Scale factor for visibility

const size = realSize * scaleFact;
const spacing = realSpacing * scaleFact;
let img3;

function preload() {
  // Replace these URLs with your actual image paths
  img1 = loadImage('https://picsum.photos/400/400?random=1');
  img2 = loadImage('https://picsum.photos/400/400?random=2');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  img3= createGraphics(800,800);
  
  
   img3.fill(0,0,255);
  img3.noStroke();
  for (let x=0; x<img3.width; x+=15) {
  for (let y=0; y<img3.height; y++) {
    let a=1;
    let b=1;
       var r = a*-24*sin(radians(x*3/4*b+y*-2/4*b))
       *sin(radians(x*2/4*b+y*3/4*b+0));
    img3.ellipse(x+r,y,5,5);
  }
  }
  img3.rect(0,0,30,img3.height);

}

function draw() {
  background(220);
  orbitControl(); // Drag mouse to rotate view
  
  // Center the scene slightly
  translate(0, 0, 0);

  // --- RECTANGLE 2 (The Back One - Static) ---
  push();
  // Move it back by the spacing amount
  translate(0, 0, 0.1);
  //scale(1,-1);
  texture(img3);
  noStroke();
  plane(size, size);
  pop();

  // --- RECTANGLE 1 (The Front One - Rotating) ---
  push();
  // Pivot Logic: Move to left edge, rotate, then move back
  translate(-size / 2, 0, 0); 
  rotateY(angle);
  translate(size / 2, 0, 0.1);
  
  texture(img3);
  noStroke();
  plane(size, size);
  pop();

angle = -PI/8+PI/8*cos(radians(frameCount/5));
}