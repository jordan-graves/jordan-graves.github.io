
let color1, color2, color3, color4;
let p1, p2, p3, p4, s1, s2, s3, s4, s5, s6, s7, s8;
let sel1, sel2, sel3, sel4, selP1, selP2, selP3, selP4, selS1, selS2, selS3, selS4, selS5, selS6, selS7, selS8;
let pg;
let pg1;
let pg2;
let colors;
let masked;  // final masked image
let size;

function setup() {
  createCanvas(800, 800, WEBGL);
  pixelDensity(2);


colors = [
  { name: "White", value: color(255, 255, 255) },
  { name: "Black", value: color(0, 0, 0) },
  { name: "Red", value: color(255, 0, 0) },
  { name: "Yellow", value: color(255, 255, 0) },
  { name: "Blue", value: color(43, 0, 255) },
  { name: "Coral", value: color(255, 117, 85) },
  { name: "Green", value: color(2, 160, 76) },
  { name: "Cyan", value: color(84, 255, 185) },
 // { name: "Orange", value: color(255, 109, 0) },
  { name: "Turq", value: color(0, 126, 113) },
  { name: "Purple", value: color(33, 0, 104) }
];

  // --- Create dropdowns ---
  sel1 = createSelect();
  sel2 = createSelect();
  sel3 = createSelect();
  sel4 = createSelect();

  [sel1, sel2, sel3, sel4].forEach(sel => {
    colors.forEach(c => sel.option(c.name));
  });

  // --- Set default selections ---
  sel1.selected("Red");
  sel2.selected("Yellow");
  sel3.selected("Blue");
  sel4.selected("Black");

  // --- Update colors whenever selection changes ---
  sel1.changed(() => color1 = getSelectedColor(sel1, colors));
  sel2.changed(() => color2 = getSelectedColor(sel2, colors));
  sel3.changed(() => color3 = getSelectedColor(sel3, colors));
  sel4.changed(() => color4 = getSelectedColor(sel4, colors));

  // initialize color variables
  color1 = getSelectedColor(sel1, colors);
  color2 = getSelectedColor(sel2, colors);
  color3 = getSelectedColor(sel3, colors);
  color4 = getSelectedColor(sel4, colors);

  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

  selP1 = createSelect();
  selP2 = createSelect();
  selP3 = createSelect();
  selP4 = createSelect();

  [selP1, selP2, selP3, selP4].forEach(sel => {
    numbers.forEach(n => sel.option(n));
  });

  // --- Set default values ---
  selP1.selected(3);
  selP2.selected(4);
  selP3.selected(4);
  selP4.selected(3);

  // --- Update variables whenever selection changes ---
[selP1, selP2, selP3, selP4].forEach(sel => {
    sel.changed(() => {
      updateValues();
      drawSpirals();
    });
  });

    const morenumbers = [150,250,350,450,550,650,750,850,950,1050,1450,1550];

  selS1 = createSelect();
  selS2 = createSelect();
  selS3 = createSelect();
  selS4 = createSelect();

  [selS1, selS2, selS3, selS4].forEach(sel => {
    morenumbers.forEach(n => sel.option(n));
  });

  // --- Set default values ---
  selS1.selected(250);
  selS2.selected(150);
  selS3.selected(1450);
  selS4.selected(1550);

  // --- Update variables whenever selection changes ---
[selS1, selS2, selS3, selS4].forEach(sel => {
    sel.changed(() => {
      updateValues();
      drawSpirals();
    });
  });

   const evenmorenumbers = [10,20,30,40,50,60,70,80,90,100];

  selS5 = createSelect();
  selS6 = createSelect();
  selS7 = createSelect();
  selS8 = createSelect();

  [selS5, selS6, selS7, selS8].forEach(sel => {
    evenmorenumbers.forEach(n => sel.option(n));
  });

  // --- Set default values ---
  selS5.selected(10);
  selS6.selected(10);
  selS7.selected(100);
  selS8.selected(100);

  // --- Update variables whenever selection changes ---
[selS5, selS6, selS7, selS8].forEach(sel => {
    sel.changed(() => {
      updateValues();
      drawSpirals();
    });
  });

  // initialize variables
  p1 = int(selP1.value());
  p2 = int(selP2.value());
  p3 = int(selP3.value());
  p4 = int(selP4.value());

  s1 = int(selS1.value());
  s2 = int(selS2.value());
  s3 = int(selS3.value());
  s4 = int(selS4.value());
  s5 = int(selS5.value());
  s6 = int(selS6.value());
  s7 = int(selS7.value());
  s8 = int(selS8.value());

    size = createSelect();
    size.option("9inch")
    size.option("ornament centered")
    size.option("ornament offset")
size.changed(drawSpirals);

  //  pg = createGraphics(1200, 1200, SVG);
    pg = createGraphics(1200, 1200);

  //pg.pixelDensity(2);
        pg.pixelDensity(1);

  spiral3D(color(255,255,255));
  
    //pg1 = createGraphics(1200, 1200, SVG);
      pg1 = createGraphics(1200, 1200);

            pg1.pixelDensity(1);

              pg2 = createGraphics(1200, 1200);

            pg2.pixelDensity(1);

 // pg1.pixelDensity(2);
  spiral3D1(color(255,255,255));
  //pg.save("frontlayer2.svg")
  //pg1.save("backlayer2.svg")

  let maskImg = createGraphics(400, 400);
  maskImg.background(0);           // black = transparent
  maskImg.fill(255);               // white = visible
  maskImg.ellipse(200, 200, 200, 200);

  // Apply the mask
  masked = pg.get();               // make a p5.Image from graphics buffer
  masked.mask(maskImg);            // mask it
  
  let b = createButton("Random");
  b.mousePressed(randomizeDropdowns);
}

function updateValues() {

  p1 = int(selP1.value());
  p2 = int(selP2.value());
  p3 = int(selP3.value());
  p4 = int(selP4.value());

  s1 = int(selS1.value());
  s2 = int(selS2.value());
  s3 = int(selS3.value());
  s4 = int(selS4.value());
  s5 = int(selS5.value());
  s6 = int(selS6.value());
  s7 = int(selS7.value());
  s8 = int(selS8.value());
}

function randomizeDropdowns() {
  // List all your dropdowns
  let allDropdowns = [
    sel1, sel2, sel3, sel4,
    selP1, selP2, selP3, selP4,
    selS1, selS2, selS3, selS4,
    selS5, selS6, selS7, selS8
  ];

  allDropdowns.forEach(sel => {
    if (!sel) return; // skip undefined dropdowns
    let options = sel.elt.options; // native HTML options
    let randomIndex = floor(random(options.length));
    sel.selected(options[randomIndex].value);
    
    // Trigger .changed() if needed

  });
  color1 = getSelectedColor(sel1, colors);
  color2 = getSelectedColor(sel2, colors);
  color3 = getSelectedColor(sel3, colors);
  color4 = getSelectedColor(sel4, colors);
  updateValues();
  drawSpirals();
}

function drawSpirals() {
    spiral3D(color(255,255,255));
   spiral3D1(color(255,255,255));

}

function getSelectedColor(sel, colorOptions) {
  let name = sel.value();
  return colorOptions.find(c => c.name === name).value;
}

function spiral3D(c) {
  pg.clear();
  //pg.background(255,0,0);
  pg.noFill();
  pg.stroke(c);
  pg.strokeWeight(5);
  pg.push();
  pg.translate(pg.width/2,pg.height/2);
  pg.beginShape();
  
  for (let i = 0; i < 3150; i += 0.5) {
    let r = i / 5.9 +
      (max(0, i / s1) * cos(radians(i / s5 ))) * sin(radians(i * p1 * 4)) +
      (max(0, i / s2) * cos(radians(i / s6 ))) * sin(radians(i * p2 * 4));
    let x = -r * cos(radians(i * 4));
    let y = r * sin(radians(i * 4));
    pg.vertex(x, y);
  }
  pg.endShape();

   pg.pop();

let d1=520;
let x1=0;
if (size.value()=="ornament offset" || size.value()=="ornament centered") {
  d1 = 520/3;
}
if (size.value()=="ornament offset") {
  x1=300;
}
pg.loadPixels();
  for (let x = 0; x < pg.width; x++) {
    for (let y = 0; y < pg.height; y++) {
      let index = (x + y * pg.width) * 4;
      let d = dist(x,y,600+x1,600);
      if (d > d1) {
        pg.pixels[index + 3] = 0; // alpha channel
      }
    }
  }
  pg.updatePixels();
}

function spiral3D1(c) {
  pg1.clear();
  //pg.background(255,0,0);
  pg1.noFill();
  pg1.stroke(c);
  pg1.strokeWeight(6);
    pg1.push();

  pg1.translate(pg.width/2,pg.height/2);
  pg1.beginShape();
  
  for (let i = 0; i < 3150; i += 0.5) {
    let r = i / 5.9 +
      (max(0, i / s3) * cos(radians(i / s7 + 21))) * sin(radians(i * p3 * 4)) +
      (max(0, i / s4) * cos(radians(i / s8 + 21))) * sin(radians(i * p4 * 4));
    let x = -r * cos(radians(i * 4));
    let y = r * sin(radians(i * 4));
    pg1.vertex(x, y);
  }
  pg1.endShape();
    pg1.pop();

    let d1=520;
let x1=0;
if (size.value()=="ornament offset" || size.value()=="ornament centered") {
  d1 = 520/3;
}
if (size.value()=="ornament offset") {
  x1=300;
}
    pg1.loadPixels();
  for (let x = 0; x < pg1.width; x++) {
    for (let y = 0; y < pg1.height; y++) {
      let index = (x + y * pg1.width) * 4;
      let d = dist(x,y,600+x1,600);
      if (d > d1) {
        pg1.pixels[index + 3] = 0; // alpha channel
      }
    }
  }
  pg1.updatePixels(); 

  pg2.clear();
  //pg.background(255,0,0);
  pg2.noFill();
  pg2.stroke(c);
  pg2.strokeWeight(6);
    pg2.push();

  pg2.translate(pg.width/2,pg.height/2);
  pg2.beginShape();
  
  for (let i = 0; i < 3150; i += 0.5) {
    let r = i / 5.9 +
      (max(0, i / s3) * cos(radians(i / s7 + 21))) * sin(radians(i * p3 * 4)) +
      (max(0, i / s4) * cos(radians(i / s8 + 21))) * sin(radians(i * p4 * 4));
    let x = -r * cos(radians(i * 4+120));
    let y = r * sin(radians(i * 4+120));
    pg2.vertex(x, y);
  }
  pg2.endShape();
    pg2.pop();


if (size.value()=="ornament offset" || size.value()=="ornament centered") {
  d1 = 520/3;
}
if (size.value()=="ornament offset") {
  x1=300;
}
    pg2.loadPixels();
  for (let x = 0; x < pg2.width; x++) {
    for (let y = 0; y < pg2.height; y++) {
      let index = (x + y * pg2.width) * 4;
      let d = dist(x,y,600+x1,600);
      if (d > d1) {
        pg2.pixels[index + 3] = 0; // alpha channel
      }
    }
  }
  pg2.updatePixels(); 
}
function draw() {
  background(255);
  clear();
if (size.value()=="ornament offset") {
translate(-200,0)
}
  // Rotate on X-axis based on mouseX
  let angleX = map(width/2+150*sin(radians(frameCount/1/2)), 0, width, -PI / 2, PI / 2);
  
   let angleY = map(width/2+50*sin(radians(frameCount/1.5/2)), 0, width, -PI / 2, PI / 2);

  rotateY(angleX);
  rotateX(angleY); // Optional: you could also use mouseY here

    fill(color1);
    if (size.value()=="ornament centered") {
ellipse(0,0,700/3,700/3);
}
else if (size.value()=="ornament offset") {
ellipse(200,0,700/3,700/3);
  
} else {
ellipse(0,0,700,700);
}
  
  noFill();

  noStroke();
  texture(pg1); // Apply the pg buffer as a texture

  push();
  tint(color2);
  //rotate(2*PI/3);
  translate(0,0,0.1);
  plane(800, 800);

    texture(pg2); // Apply the pg buffer as a texture
  tint(color3);
 // rotate(2*PI/3);
  translate(0,0,0.1);
  plane(800, 800);
  


  pop();
  
  texture(pg);
  push();
  translate(0,0,40);
  tint(color4);
  //rotate(PI);
  plane(800, 800); // Width and height of the rectangle
  pop();
}

function spiral3DSVG() {

  let pg = createGraphics(4800, 1200, SVG);

  pg.fill(color1);
  pg.noStroke();

  let d1=520;
let x1=0;

  if (size.value()=="ornament offset" || size.value()=="ornament centered") {
  d1 = 520/3;
}
if (size.value()=="ornament offset") {
  x1=300;
}

    pg.push();

  pg.translate(600,600);
  pg.ellipse(x1,0,d1*2,d1*2);   

  pg.pop();


  pg.noFill();
  pg.stroke(color2);
  pg.strokeWeight(6);
    pg.push();

  pg.translate(1800,600);

   pg.ellipse(x1,0,d1*2,d1*2);   


  pg.beginShape();
  
  for (let i = 0; i < 3150; i += 0.5) {
    let r = i / 5.9 +
      (max(0, i / s3) * cos(radians(i / s7 + 21))) * sin(radians(i * p3 * 4)) +
      (max(0, i / s4) * cos(radians(i / s8 + 21))) * sin(radians(i * p4 * 4));
    let x = -r * cos(radians(i * 4));
    let y = r * sin(radians(i * 4));
    pg.vertex(x, y);
  }
  pg.endShape();
    pg.pop();






  pg.noFill();
  pg.stroke(color3);
  pg.strokeWeight(6);
    pg.push();

    pg.translate(3000,600);

pg.ellipse(x1,0,d1*2,d1*2);   
  pg.beginShape();
  
  for (let i = 0; i < 3150; i += 0.5) {
    let r = i / 5.9 +
      (max(0, i / s3) * cos(radians(i / s7 + 21))) * sin(radians(i * p3 * 4)) +
      (max(0, i / s4) * cos(radians(i / s8 + 21))) * sin(radians(i * p4 * 4));
    let x = -r * cos(radians(i * 4+120));
    let y = r * sin(radians(i * 4+120));
    pg.vertex(x, y);
  }
  pg.endShape();
    pg.pop(); 


if (size.value()=="ornament offset" || size.value()=="ornament centered") {
  d1 = 520/3;
}
if (size.value()=="ornament offset") {
  x1=300;
}

  pg.noFill();
  pg.stroke(color4);
  pg.strokeWeight(4);
  pg.push();
  pg.translate(4200,600);

pg.ellipse(x1,0,d1*2,d1*2);   
  pg.beginShape();
  
  for (let i = 0; i < 3150; i += 0.5) {
    let r = i / 5.9 +
      (max(0, i / s1) * cos(radians(i / s5 ))) * sin(radians(i * p1 * 4)) +
      (max(0, i / s2) * cos(radians(i / s6 ))) * sin(radians(i * p2 * 4));
    let x = -r * cos(radians(i * 4));
    let y = r * sin(radians(i * 4));
    pg.vertex(x, y);
  }
  pg.endShape();
   pg.pop();


if (size.value()=="ornament offset" || size.value()=="ornament centered") {
  d1 = 520/3;
}
if (size.value()=="ornament offset") {
  x1=300;
}
 pg.save("test.svg");
}