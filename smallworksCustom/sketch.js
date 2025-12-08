
let  sw_color1, sw_color2, sw_color3, sw_color4;
let p1, p2, p3, p4, s1, s2, s3, s4, s5, s6, s7, s8;
let sel1, sel2, sel3, sel4, selP1, selP2, selP3, selP4, selS1, selS2, selS3, selS4, selS5, selS6, selS7, selS8;
let sw_pg;
let sw_pg1;
let sw_pg2;
let colors;
let masked;  // final masked image
let size;
let sizeValue;

let currentsw_color1 = "Red";
let currentsw_color2 = "Yellow";
let currentsw_color3 = "Blue";
let currentsw_color4= "Black";

let choices, numbers, morenumbers, evenmorenumbers;

function setup() {
  let canvas = createCanvas(800, 800, WEBGL);
    canvas.parent('canvas-container'); // Attach the canvas to the HTML div
  pixelDensity(2);


  colors = [
    { name: "Red", value: color(255, 0, 0) },
    { name: "Yellow", value: color(255, 255, 0) },
    { name: "Blue", value: color(33, 80, 255) },
    { name: "Blue-Purple", value: color(63, 0, 255) },
    { name: "Coral", value: color(255, 117, 85) },
    { name: "Green", value: color(2, 160, 76) },
    { name: "Mint", value: color(84, 255, 185) },
    { name: "Turquoise", value: color(25, 127, 138) },
    { name: "White", value: color(255, 255, 255) },
    { name: "Black", value: color(50, 50, 50) },
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
  sel1.changed(() => sw_color1 = getSelectedColor(sel1, colors));
  sel2.changed(() => sw_color2 = getSelectedColor(sel2, colors));
  sel3.changed(() => sw_color3 = getSelectedColor(sel3, colors));
  sel4.changed(() => sw_color4 = getSelectedColor(sel4, colors));

  sw_color1 = getSelectedColor(currentsw_color1);
  sw_color2 = getSelectedColor(currentsw_color2);
  sw_color3 = getSelectedColor(currentsw_color3);
  sw_color4 = getSelectedColor(currentsw_color4);

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
  selP4.selected(4);


  // --- Update variables whenever selection changes ---
[selP1, selP2, selP3, selP4].forEach(sel => {
    sel.changed(() => {
      updateValuesSW();
      drawSpirals();
    });
  });

   choices = [1,2,3,4,5];
     morenumbers = [750,650,450,250,150,100];

  selS1 = createSelect();
  selS2 = createSelect();
  selS3 = createSelect();
  selS4 = createSelect();

  [selS1, selS2, selS3, selS4].forEach(sel => {
    choices.forEach(n => sel.option(n));
  });

  // --- Set default values ---
  selS1.selected(3);
  selS2.selected(4);
  selS3.selected(2);
  selS4.selected(2);

  // --- Update variables whenever selection changes ---
[selS1, selS2, selS3, selS4].forEach(sel => {
    sel.changed(() => {
      updateValuesSW();
      drawSpirals();
    });
  });

   evenmorenumbers = [50,40,20,10,8,5];

  selS5 = createSelect();
  selS6 = createSelect();
  selS7 = createSelect();
  selS8 = createSelect();

  [selS5, selS6, selS7, selS8].forEach(sel => {
    choices.forEach(n => sel.option(n));
  });

  // --- Set default values ---
  selS5.selected(3);
  selS6.selected(3);
  selS7.selected(1);
  selS8.selected(1);

  // --- Update variables whenever selection changes ---
[selS5, selS6, selS7, selS8].forEach(sel => {
    sel.changed(() => {
      updateValuesSW();
      drawSpirals();
    });
  });

 selP1.parent("freq1");
 selP2.parent("freq2");
 selS1.parent("freq3");
 selS2.parent("freq4");
 selS5.parent("freq5");
 selS6.parent("freq6");

  // initialize variables
  p1 = int(selP1.value());
  p2 = int(selP2.value());
  p3 = int(selP3.value());
  p4 = int(selP4.value());

  s1 = morenumbers[int(selS1.value())];
  s2 = morenumbers[int(selS2.value())];
  s3 = morenumbers[int(selS3.value())];
  s4 = morenumbers[int(selS4.value())];
  s5 = evenmorenumbers[int(selS5.value())];
  s6 = evenmorenumbers[int(selS6.value())];
  s7 = evenmorenumbers[int(selS7.value())];
  s8 = evenmorenumbers[int(selS8.value())];

    size = createSelect();
    size.option("9inch")
    size.option("ornament centered")
    size.option("ornament offset")
size.changed(drawSpirals);
sizeValue = "9inch";

  //  sw_pg = createGraphics(1200, 1200, SVG);
    sw_pg = createGraphics(1200, 1200);

  //pg.pixelDensity(2);
        sw_pg.pixelDensity(1);

  spiral3D(color(255,255,255));
  
    //sw_pg1 = createGraphics(1200, 1200, SVG);
      sw_pg1 = createGraphics(1200, 1200);

            sw_pg1.pixelDensity(1);

             sw_pg2 = createGraphics(1200, 1200);

           sw_pg2.pixelDensity(1);

 // sw_pg1.pixelDensity(2);
  spiral3D1(color(255,255,255));
  //pg.save("frontlayer2.svg")
  //sw_pg1.save("backlayer2.svg")

  let maskImg = createGraphics(400, 400);
  maskImg.background(0);           // black = transparent
  maskImg.fill(255);               // white = visible
  maskImg.ellipse(200, 200, 200, 200);

  // Apply the mask
  masked = sw_pg.get();               // make a p5.Image from graphics buffer
  masked.mask(maskImg);            // mask it
  
  let b = createButton("Random");
  b.mousePressed(randomizeDropdownsSW);
  
  sel1.hide();
  sel2.hide();
  sel3.hide();
  sel4.hide();
  selP3.hide();
  selP4.hide();
   selS3.hide();
  selS4.hide();
   selS7.hide();
  selS8.hide();
  size.hide();
  b.hide();

    createColorButtonsSW(colors, '#color-row-1', 1, currentsw_color1);
  createColorButtonsSW(colors, '#color-row-2', 2, currentsw_color2);
  createColorButtonsSW(colors, '#color-row-3', 3, currentsw_color3);
  createColorButtonsSW(colors, '#color-row-4', 4, currentsw_color4);

  let randomizeButtonSW = select('#random-btn');
  if (randomizeButtonSW) {
    randomizeButtonSW.mousePressed(randomizeDropdownsSW);
  }

}

function createColorButtonsSW(colorList, parentId, colorIndex, initialColorName) {
  let parentDiv = select(parentId);
  if (!parentDiv) return;

  colorList.forEach(c => {
    // Create the button using p5's createElement, but append it to the HTML parent
    let button = createElement('button');
    button.style('background-color', c.value.toString());
    button.attribute('data-color-name', c.name);
    button.attribute('data-color-part', colorIndex);
    button.class('color-button');
    
    // Highlight the initial selection
    if (c.name === initialColorName) {
      button.class('color-button selected');
    }

    button.mousePressed(() => setColorSW(c.name, colorIndex));
    parentDiv.child(button); // Attach the button to the HTML div
  });
}

/**
 * Updates the color selection for a specific part and updates the display.
 */
function setColorSW(name, colorIndex) {
  // 1. Update the global tracking variable
  if (colorIndex === 1) {
    currentsw_color1 = name;
  } else if (colorIndex === 2) {
    currentsw_color2 = name;
  } else if (colorIndex === 3) {
    currentsw_color3 = name;
  } else if (colorIndex === 4) {
    currentsw_color4 = name;
  }

  // 2. Update the color variables
  sw_color1 = getSelectedColor(currentsw_color1);
  sw_color2 = getSelectedColor(currentsw_color2);
  sw_color3 = getSelectedColor(currentsw_color3);
  sw_color4 = getSelectedColor(currentsw_color4);

  // 3. Update button styling (highlight the selected one, unhighlight others)
  let buttons = selectAll(`.color-button[data-color-part="${colorIndex}"]`);
  buttons.forEach(btn => {
    if (btn.attribute('data-color-name') === name) {
      btn.class('color-button selected'); // CSS handles the highlight
    } else {
      btn.class('color-button');
    }
  });



  // 4. Redraw the ornament
 // drawSpirals();
}

function updateValuesSW() {

  p1 = int(selP1.value());
  p2 = int(selP2.value());
  p3 = int(selP3.value());
  p4 = int(selP4.value());

  s1 = morenumbers[int(selS1.value())];
  s2 = morenumbers[int(selS2.value())];
  s3 = morenumbers[int(selS3.value())];
  s4 = morenumbers[int(selS4.value())];
  s5 = evenmorenumbers[int(selS5.value())];
  s6 = evenmorenumbers[int(selS6.value())];
  s7 = evenmorenumbers[int(selS7.value())];
  s8 = evenmorenumbers[int(selS8.value())];
}

function randomizeDropdownsSW() {
  // List all your dropdowns
  // let allDropdowns = [
  //   sel1, sel2, sel3, sel4,
  //   selP1, selP2, selP3, selP4,
  //   selS1, selS2, selS3, selS4,
  //   selS5, selS6, selS7, selS8
  // ];


    let allDropdowns = [
    sel1, sel2, sel3, sel4,
    selP1, selP2, 
    selS1, selS2, 
    selS5, selS6, 
  ];

  allDropdowns.forEach(sel => {
    if (!sel) return; // skip undefined dropdowns
    let options = sel.elt.options; // native HTML options
    let randomIndex = floor(random(options.length));
    sel.selected(options[randomIndex].value);
    
    // Trigger .changed() if needed

  });

  let colorOptions = colors.map(c => c.name);

  let randomC1 = random(colorOptions);
  setColorSW(randomC1, 1);

  // 3. Randomize Color 2 (avoiding color 1 for diversity)
  let randomC2 = random(colorOptions);
  while (randomC2 === randomC1) {
    randomC2 = random(colorOptions);
  }
  setColorSW(randomC2, 2);

  // 4. Randomize Color 3
  let randomC3 = random(colorOptions);
  setColorSW(randomC3, 3);

  let randomC4 = random(colorOptions);
  setColorSW(randomC4, 4);

  sw_color1 = getSelectedColor(currentsw_color1);
  sw_color2 = getSelectedColor(currentsw_color2);
  sw_color3 = getSelectedColor(currentsw_color3);
  sw_color4 = getSelectedColor(currentsw_color4);
  updateValuesSW();
  drawSpirals();
}

function drawSpirals() {
    spiral3D(color(255,255,255));
  // spiral3D1(color(255,255,255));

}

function getSelectedColor(colorName) {
  return colors.find(c => c.name === colorName).value;
}

function spiral3D(c) {
  sw_pg.clear();
  //pg.background(255,0,0);
  sw_pg.noFill();
  sw_pg.stroke(c);
  sw_pg.strokeWeight(5);
  sw_pg.push();
  sw_pg.translate(sw_pg.width/2,sw_pg.height/2);
  sw_pg.beginShape();
  
  for (let i = 0; i < 3450; i += 0.5) {
    let r = i / 5.9 +
      (max(0, i / s1) * cos(radians(i / s5 ))) * sin(radians(i * p1 * 4)) +
      (max(0, i / s2) * cos(radians(i / s6 ))) * sin(radians(i * p2 * 4));
    let x = -r * cos(radians(i * 4));
    let y = r * sin(radians(i * 4));
    sw_pg.vertex(x, y);
  }
  sw_pg.endShape();

   sw_pg.pop();

let d1=520;
let x1=0;
if (sizeValue=="ornament offset" || sizeValue=="ornament centered") {
  d1 = 520/3;
}
if (sizeValue=="ornament offset") {
  x1=300;
}
sw_pg.loadPixels();
  for (let x = 0; x < sw_pg.width; x++) {
    for (let y = 0; y < sw_pg.height; y++) {
      let index = (x + y * sw_pg.width) * 4;
      let d = dist(x,y,600+x1,600);
      if (d > d1) {
        sw_pg.pixels[index + 3] = 0; // alpha channel
      }
    }
  }
  sw_pg.updatePixels();
}

function spiral3D1(c) {
  sw_pg1.clear();
  //pg.background(255,0,0);
  sw_pg1.noFill();
  sw_pg1.stroke(c);
  sw_pg1.strokeWeight(6);
    sw_pg1.push();

  sw_pg1.translate(sw_pg.width/2,sw_pg.height/2);
  sw_pg1.beginShape();
  
  for (let i = 0; i < 3450; i += 0.5) {
    let r = i / 5.9 +
      (max(0, i / s3) * cos(radians(i / s7 + 21))) * sin(radians(i * p3 * 4)) +
      (max(0, i / s4) * cos(radians(i / s8 + 21))) * sin(radians(i * p4 * 4));
    let x = -r * cos(radians(i * 4));
    let y = r * sin(radians(i * 4));
    sw_pg1.vertex(x, y);
  }
  sw_pg1.endShape();
    sw_pg1.pop();

    let d1=520;
let x1=0;
if (sizeValue=="ornament offset" || sizeValue=="ornament centered") {
  d1 = 520/3;
}
if (sizeValue=="ornament offset") {
  x1=300;
}
    sw_pg1.loadPixels();
  for (let x = 0; x < sw_pg1.width; x++) {
    for (let y = 0; y < sw_pg1.height; y++) {
      let index = (x + y * sw_pg1.width) * 4;
      let d = dist(x,y,600+x1,600);
      if (d > d1) {
        sw_pg1.pixels[index + 3] = 0; // alpha channel
      }
    }
  }
  sw_pg1.updatePixels(); 

 sw_pg2.clear();
  //pg.background(255,0,0);
 sw_pg2.noFill();
 sw_pg2.stroke(c);
 sw_pg2.strokeWeight(6);
   sw_pg2.push();

 sw_pg2.translate(sw_pg.width/2,sw_pg.height/2);
 sw_pg2.beginShape();
  
  for (let i = 0; i < 3450; i += 0.5) {
    let r = i / 5.9 +
      (max(0, i / s3) * cos(radians(i / s7 + 21))) * sin(radians(i * p3 * 4)) +
      (max(0, i / s4) * cos(radians(i / s8 + 21))) * sin(radians(i * p4 * 4));
    let x = -r * cos(radians(i * 4+120));
    let y = r * sin(radians(i * 4+120));
   sw_pg2.vertex(x, y);
  }
 sw_pg2.endShape();
   sw_pg2.pop();


if (sizeValue=="ornament offset" || sizeValue=="ornament centered") {
  d1 = 520/3;
}
if (sizeValue=="ornament offset") {
  x1=300;
}
   sw_pg2.loadPixels();
  for (let x = 0; x <sw_pg2.width; x++) {
    for (let y = 0; y <sw_pg2.height; y++) {
      let index = (x + y *sw_pg2.width) * 4;
      let d = dist(x,y,600+x1,600);
      if (d > d1) {
       sw_pg2.pixels[index + 3] = 0; // alpha channel
      }
    }
  }
 sw_pg2.updatePixels(); 
}
function draw() {
  background(255);
  clear();
if (sizeValue=="ornament offset") {
translate(-200,0)
}
  // Rotate on X-axis based on mouseX
  let angleX = map(width/2+150*sin(radians(frameCount/1/2)), 0, width, -PI / 2, PI / 2);
  
   let angleY = map(width/2+50*sin(radians(frameCount/1.5/2)), 0, width, -PI / 2, PI / 2);

  rotateY(angleX);
  rotateX(angleY); // Optional: you could also use mouseY here

    fill(sw_color1);
    if (sizeValue=="ornament centered") {
ellipse(0,0,700/3,700/3);
}
else if (sizeValue=="ornament offset") {
ellipse(200,0,700/3,700/3);
  
} else {
ellipse(0,0,700,700,360);
}
  

  // Your existing 3D shape drawing (cylinders)
  fill(0);

  push();
  rotate(-PI / 2 + PI/4);
  translate(330, 0, 20);
  rotateX(PI / 2);
  cylinder(5, 45);
  pop();

  push();
  rotate(-PI / 2 + PI * 3 / 4);
  translate(330, 0, 20);
  rotateX(PI / 2);
  cylinder(5, 45);
  pop();

  push();
  rotate(-PI / 2 + PI * 5 / 4);
  translate(330, 0, 20);
  rotateX(PI / 2);
  cylinder(5, 45);
  pop();

    push();
  rotate(-PI / 2 + PI * 7 / 4);
  translate(330, 0, 20);
  rotateX(PI / 2);
  cylinder(5, 45);
  pop();

  noFill();

  noStroke();
  texture(sw_pg1); // Apply thesw_pg buffer as a texture

  push();
  tint(sw_color2);
  //rotate(2*PI/3);
  translate(0,0,0.1);
  plane(800, 800);

    texture(sw_pg2); // Apply thesw_pg buffer as a texture
  tint(sw_color3);
 // rotate(2*PI/3);
  translate(0,0,0.1);
  plane(800, 800);
  


  pop();
  
  texture(sw_pg);
  push();
  translate(0,0,40);
  tint(sw_color4);
  //rotate(PI);
  plane(800, 800); // Width and height of the rectangle
  pop();
}

function spiral3DSVG() {

  let sw_pg = createGraphics(4800, 1200, SVG);

  sw_pg.fill(sw_color1);
  sw_pg.noStroke();

  let d1=520;
let x1=0;

  if (sizeValue=="ornament offset" || sizeValue=="ornament centered") {
  d1 = 520/3;
}
if (sizeValue=="ornament offset") {
  x1=300;
}

    sw_pg.push();

  sw_pg.translate(600,600);
  sw_pg.ellipse(x1,0,d1*2,d1*2);   

  sw_pg.pop();


  sw_pg.noFill();
  sw_pg.stroke(sw_color2);
  sw_pg.strokeWeight(6);
    sw_pg.push();

  sw_pg.translate(1800,600);

   sw_pg.ellipse(x1,0,d1*2,d1*2);   


  sw_pg.beginShape();
  
  for (let i = 0; i < 3450; i += 0.5) {
    let r = i / 5.9 +
      (max(0, i / s3) * cos(radians(i / s7 + 21))) * sin(radians(i * p3 * 4)) +
      (max(0, i / s4) * cos(radians(i / s8 + 21))) * sin(radians(i * p4 * 4));
    let x = -r * cos(radians(i * 4));
    let y = r * sin(radians(i * 4));
    sw_pg.vertex(x, y);
  }
  sw_pg.endShape();
    sw_pg.pop();






  sw_pg.noFill();
  sw_pg.stroke(sw_color3);
  sw_pg.strokeWeight(6);
    sw_pg.push();

    sw_pg.translate(3000,600);

sw_pg.ellipse(x1,0,d1*2,d1*2);   
  sw_pg.beginShape();
  
  for (let i = 0; i < 3450; i += 0.5) {
    let r = i / 5.9 +
      (max(0, i / s3) * cos(radians(i / s7 + 21))) * sin(radians(i * p3 * 4)) +
      (max(0, i / s4) * cos(radians(i / s8 + 21))) * sin(radians(i * p4 * 4));
    let x = -r * cos(radians(i * 4+120));
    let y = r * sin(radians(i * 4+120));
    sw_pg.vertex(x, y);
  }
  sw_pg.endShape();
    sw_pg.pop(); 


if (sizeValue=="ornament offset" || sizeValue=="ornament centered") {
  d1 = 520/3;
}
if (sizeValue=="ornament offset") {
  x1=300;
}

  sw_pg.noFill();
  sw_pg.stroke(sw_color4);
  sw_pg.strokeWeight(4);
  sw_pg.push();
  sw_pg.translate(4200,600);

sw_pg.ellipse(x1,0,d1*2,d1*2);   
  sw_pg.beginShape();
  
  for (let i = 0; i < 3450; i += 0.5) {
    let r = i / 5.9 +
      (max(0, i / s1) * cos(radians(i / s5 ))) * sin(radians(i * p1 * 4)) +
      (max(0, i / s2) * cos(radians(i / s6 ))) * sin(radians(i * p2 * 4));
    let x = -r * cos(radians(i * 4));
    let y = r * sin(radians(i * 4));
    sw_pg.vertex(x, y);
  }
  sw_pg.endShape();
   sw_pg.pop();


if (sizeValue=="ornament offset" || sizeValue=="ornament centered") {
  d1 = 520/3;
}
if (sizeValue=="ornament offset") {
  x1=300;
}
 sw_pg.save("test.svg");
}