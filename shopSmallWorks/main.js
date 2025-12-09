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

// Global variables to track the currently selected options
let currentPattern = "Pattern A";
let currentColor1 = "Red";
let currentColor2 = "Yellow";
let currentColor3 = "Blue";
let loadedOrnament = false;
let onCart = false;

function preload() {
  // // Assuming these files exist in your sketch folder
  // front1 = loadImage("https://jordangraves.com/shop/front1.png");
  // back1 = loadImage("https://jordangraves.com/shop/back1.png");
  // front2 = loadImage("https://jordangraves.com/shop/front2.png");
  // back2 = loadImage("https://jordangraves.com/shop/back2.png");
  // front3 = loadImage("https://jordangraves.com/shop/front3.png");
  // back3 = loadImage("https://jordangraves.com/shop/back3.png");
  // front = front1;
  // back = back1;
  // //  json = loadJSON("projects.json",);
  // json = {};

}

function setup() {
  // 1. Create Canvas and place it in the designated container
    console.log(width);
//noLoop();
//unfilterProjects();

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
      drawSpiralsSW();
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
      drawSpiralsSW();
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
      drawSpiralsSW();
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
size.changed(drawSpiralsSW);
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
  setTimeout(checkUI,500);
}

/**
 * Creates color buttons and appends them to a specified HTML parent element.
 */
function createColorButtons(colorList, parentId, colorIndex, initialColorName) {
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

    button.mousePressed(() => setColor(c.name, colorIndex));
    parentDiv.child(button); // Attach the button to the HTML div
  });
}

/**
 * Updates the color selection for a specific part and updates the display.
 */
function setColor(name, colorIndex) {
  // 1. Update the global tracking variable
  if (colorIndex === 1) {
    currentColor1 = name;
  } else if (colorIndex === 2) {
    currentColor2 = name;
  } else if (colorIndex === 3) {
    currentColor3 = name;
  }

  // 2. Update the color variables
  color1 = getSelectedColor(currentColor1);
  color2 = getSelectedColor(currentColor2);
  color3 = getSelectedColor(currentColor3);

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
  drawSpirals();
}

/**
 * Updates the pattern selection and updates the display.
 */
function setPattern(pName, allPatternNames) {
  currentPattern = pName;

  // 1. Update the front/back images based on the pattern name
  if (pName === "Pattern A") {
    front = front1;
    back = back1;
  } else if (pName === "Pattern B") {
    front = front2;
    back = back2;
  } else if (pName === "Pattern C") {
    front = front3;
    back = back3;
  }

  // 2. Update button styling (using inline style for the color change)
  let buttons = selectAll('.pattern-button');
  buttons.forEach(btn => {
    if (btn.attribute('data-pattern') == pName) {
      btn.style('background-color', 'blue');
      btn.style('color', 'bisque');
    } else {
      btn.style('background-color', 'bisque');
      btn.style('color', 'blue');
    }
  });

  // 3. Redraw the ornament
  drawSpirals();
}

function updateValues() {
  // This function is the single point for updating images and drawing.

  
  setPattern(currentPattern); 
  drawSpirals();

    if (window.location.href.indexOf("799427750") != -1 && loadedOrnament) {

  document.getElementsByTagName("select")[0].value = currentColor1;
  document.getElementsByTagName("select")[1].value = currentColor2;
  document.getElementsByTagName("select")[2].value = currentColor3;
  document.getElementsByTagName("select")[3].value = currentPattern.substring(currentPattern.length-1);

document.getElementsByTagName("select")[0].dispatchEvent(new Event('change', { bubbles: true }));
document.getElementsByTagName("select")[1].dispatchEvent(new Event('change', { bubbles: true }));
document.getElementsByTagName("select")[2].dispatchEvent(new Event('change', { bubbles: true }));
document.getElementsByTagName("select")[3].dispatchEvent(new Event('change', { bubbles: true }));

  } 
}

function randomizeSelections() {
  let patternOptions = ["Pattern A", "Pattern B", "Pattern C"];
  let colorOptions = colors.map(c => c.name);

  // 1. Randomize Pattern
  let randomPattern = random(patternOptions);
  setPattern(randomPattern);

  // 2. Randomize Color 1
  let randomC1 = random(colorOptions);
  setColor(randomC1, 1);

  // 3. Randomize Color 2 (avoiding color 1 for diversity)
  let randomC2 = random(colorOptions);
  while (randomC2 === randomC1) {
    randomC2 = random(colorOptions);
  }
  setColor(randomC2, 2);

  // 4. Randomize Color 3
  let randomC3 = random(colorOptions);
  setColor(randomC3, 3);

  // Update the global color variables once more just in case
  color1 = getSelectedColor(currentColor1);
  color2 = getSelectedColor(currentColor2);
  color3 = getSelectedColor(currentColor3);

  updateValues();
}

function drawSpirals() {
  spiral3D();
  spiral3D1();
}

function getSelectedColor(colorName) {
  return colors.find(c => c.name === colorName).value;
}

function spiral3D() {
  pg.clear();
  pg.image(back, 0, 0, pg.width, pg.width);
}

function spiral3D1() {
  pg1.clear();
  pg1.image(front, 0, 0, pg.width, pg.width);
}

function draw() {

  
  

try {
 //   document.getElementsByClassName("ec-store__product-page--799427750")[0].getElementsByClassName("details-product-price__value")[0].innerHTML="<s>$38.00</s>&nbsp&nbsp$30.40"
} catch (e) {
    
}

try {
//document.getElementsByClassName("grid-product--id-799427750")[0].getElementsByClassName("grid-product__price-value")[0].innerHTML="<s>$38.00</s>&nbsp&nbsp$30.40"
} catch (e) {
    
   }
//       document.body.style.setProperty(
//     "--scroll",
//      window.pageYOffset / (document.body.offsetHeight - window.innerHeight) / 2
//   );
// let off = map(window.innerWidth,900,1600,0,350,true);
// let off2 = map(window.scrollY,0,600,off/2,-off*3/2);
//   document.getElementById("pathForText").style.transform="translate(-"+window.scrollY/4+"px,0px)";
// let sc1 = map(window.innerWidth,900,300,1,0.33,true);
// let sc2 = map(window.innerWidth,900,300,0,167,true);
//   document.getElementById("pathForText").style.scale = sc1;
//   document.getElementById("pathForText").style.marginTop = sc2;
//   document.getElementById("redpath").style.transform="translate(-"+window.scrollY/4+"px,0px)";
//   document.getElementById("bluepath").style.transform="translate("+window.scrollY/2+"px,0px)";
//   let sc = map(width,800,290,1,19.5/40,true);
//  // document.getElementById("opening").style.height = map(sc,1,19.5,500,300)+"px"
// document.getElementsByTagName("text")[0].children[0].setAttribute("startOffset",off+off2+window.scrollY/4+100+"px")
// document.getElementsByTagName("text")[1].children[0].setAttribute("startOffset",off+off2+window.scrollY/4+140+"px")
// document.getElementsByTagName("text")[2].children[0].setAttribute("startOffset",off+off2+window.scrollY/4+115+"px")
 

clear();
  scale(1.5);

  // Your existing rotation logic
  let angleX = map(width / 2 + 150 * sin(radians(frameCount / 1 / 2)), 0, width, -PI / 2, PI / 2);
  let angleY = map(width / 2 + 50 * sin(radians(frameCount / 1.5 / 2)), 0, width, -PI / 2, PI / 2);

  rotateY(angleX);
  rotateX(angleY);

  // Your existing 3D shape drawing (cylinders)
  fill(0);

  push();
  rotate(-PI / 2);
  translate(190, 0, 20);
  rotateX(PI / 2);
  cylinder(9, 45);
  pop();

  push();
  rotate(-PI / 2 + PI * 2 / 3);
  translate(190, 0, 20);
  rotateX(PI / 2);
  cylinder(9, 45);
  pop();

  push();
  rotate(-PI / 2 + PI * 4 / 3);
  translate(190, 0, 20);
  rotateX(PI / 2);
  cylinder(9, 45);
  pop();

  // Your existing color/texture application logic
  fill(color1);
  ellipse(0, 0, 400, 400, 360);

  noFill();
  noStroke();

  // Apply back texture with color2 tint
  texture(pg);
  push();
  tint(color2);
  translate(0, 0, 0.1);
  plane(400, 400);

  // Apply front texture with color3 tint
  texture(pg1);
  tint(color3);
  translate(0, 0, 40);
  plane(400, 400);
  pop();
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
 // drawSpiralsSW();
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

  setTimeout(updateUI,100);
}

function updateUI() {
      if (window.location.href.indexOf("801295206") != -1 && loadedOrnament) {

   document.getElementsByTagName("select")[6].value = currentsw_color1;
   document.getElementsByTagName("select")[7].value = currentsw_color2;
   document.getElementsByTagName("select")[8].value = currentsw_color3;
   document.getElementsByTagName("select")[9].value = currentsw_color4;

    document.getElementsByTagName("select")[10].value = document.getElementsByTagName("select")[0].value
    document.getElementsByTagName("select")[11].value = document.getElementsByTagName("select")[1].value
    document.getElementsByTagName("select")[12].value = document.getElementsByTagName("select")[2].value
    document.getElementsByTagName("select")[13].value = document.getElementsByTagName("select")[3].value
    document.getElementsByTagName("select")[14].value = document.getElementsByTagName("select")[4].value
    document.getElementsByTagName("select")[15].value = document.getElementsByTagName("select")[5].value

for (let i=6; i<16; i++) {
 document.getElementsByTagName("select")[i].dispatchEvent(new Event('change', { bubbles: true }));
}
  } 
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
  drawSpiralsSW();
}

function drawSpiralsSW() {
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


function reveal() {
  if (document.getElementById("defaultCanvas0") != null &&
    document.getElementById("defaultCanvas0").getBoundingClientRect().bottom > document.getElementById("menubar").getBoundingClientRect().bottom) {
    redraw();
  }
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 50;

    if (elementTop < windowHeight - elementVisible && !reveals[i].classList.contains("hiddenProjects")) {
      reveals[i].classList.add("active");
    } else {
      //  reveals[i].classList.remove("active");
    }
  }


}

window.addEventListener("scroll", reveal);

// To check the scroll position on page load
reveal();



function showMoreProjects() {

  var p = document.querySelectorAll(".hiddenProjects");
  for (var i = 0; i < p.length; i++) {
    p[i].classList.remove("hiddenProjects");
  }

  p = document.querySelectorAll(".hiddenTransitions");
  for (var i = 0; i < p.length; i++) {
    p[i].classList.remove("hiddenTransitions");
  }

  document.getElementById("additionalProjects").classList.add("hiddenProjects");
}

window.addEventListener(
  "scroll",
  () => {
    document.body.style.setProperty(
      "--scroll",
      window.pageYOffset / (document.body.offsetHeight - window.innerHeight) / 2
    );
  },
  false
);

function filterProjects(f) {
  console.log(f);
  document.getElementById("filterArt").classList.remove("selectedFilter");
  document.getElementById("filterEducation").classList.remove("selectedFilter");
  document.getElementById("filterSoftware").classList.remove("selectedFilter");
  document.getElementById("filterResearch").classList.remove("selectedFilter");

  if (f == "art") {
    document.getElementById("filterArt").classList.add("selectedFilter");

  }
  else if (f == "education") {
    document.getElementById("filterEducation").classList.add("selectedFilter");

  }
  else if (f == "software") {
    document.getElementById("filterSoftware").classList.add("selectedFilter");

  }
  else if (f == "research") {
    document.getElementById("filterResearch").classList.add("selectedFilter");
  }


  var p = document.querySelectorAll(".projects");
  var t = document.querySelectorAll(".transitions");
  let j = 0;
  for (var i = 0; i < json.projects.length; i++) {
    if (json.projects[i].filters.indexOf(f) > -1) {
      p[j].innerHTML = "<div class=\"info reveal\">\
      <h1>"+ json.projects[i].name + "</h1> \
      <h2>"+ json.projects[i].info + "</h2>\
      <a href=\""+ json.projects[i].link + "\">View Project\
    </div>\
    <div class=\"preview reveal\">\
      <img src=\""+ json.projects[i].img + "\"></a>\
    </div>";
      p[j].style.display = "";
      if (t[j + 1] != null)
        t[j + 1].style.display = "";

      j++;
    }

  }
  console.log(j);
  for (let i = j; i < p.length; i++) {
    p[i].style.display = "none";
    if (t[i + 1] != null)
      t[i + 1].style.display = "none";
  }
  reveal();
}

function unfilterProjects() {
  var p = document.querySelectorAll(".projects");
  var t = document.querySelectorAll(".transitions");
  let j = 0;
  for (var i = 0; i < json.projects.length; i++) {
    if (true) {
      p[j].innerHTML = "<div class=\"info reveal\">\
          <h1>"+ json.projects[i].name + "</h1> \
          <h2>"+ json.projects[i].info + "</h2>\
          <a href=\""+ json.projects[i].link + "\">View Project\
        </div>\
        <div class=\"preview reveal\">\
          <img src=\""+ json.projects[i].img + "\"></a>\
        </div>";
      p[j].style.display = "";
      if (t[j + 1] != null)
        t[j + 1].style.display = "";

      j++;
    }

  }
  console.log(j);
  for (let i = j; i < p.length; i++) {
    p[i].style.display = "none";
    if (t[i + 1] != null)
      t[i + 1].style.display = "none";
  }
  reveal();
  addTransitions();
  loadAbout();
}

function loadAbout() {
  document.getElementById("contact").innerHTML =
    "<h1>About Jordan</h1>\
    <p>\
      Jordan Oleson-Graves is an artist and designer based in Atlanta whose work blends code with physical materials, spanning jewelry, textiles, and interactive installations. Originally trained in Motion Media Design at SCAD, she shifted her focus from commercial design to experimental art after discovering abstract animation. Her creative path has included everything from 3D printed jewelry to large-scale LED installations and code-generated knitwear. Jordan holds an MS in Digital Media from Georgia Tech, where her research explored the intersection of crafting, computer science, and digital fabrication. Now pursuing her MFA in Painting at SCAD, she also teaches high school computer science, helping students bring their own ideas to life through code.\
        </p>\
    <br><br>\<div id = \"links\">\
        <a href=\"mailto:jordan@jordangrav.es\"> Email Me</a> <a   target=\"_blank\" href = \"../about\">CV</a> <a  target=\"_blank\" href=\"https://www.instagram.com/jordanolesongraves\">Instagram</a>\
        </div>";
}

function loadMenu() {
  document.getElementById("menubar").innerHTML = '\
        <div id="title">\
        <a style=font-weight:600 href="/#opening">Jordan Oleson-Graves</a>\
      </div>\
      <div id="buttons">\
        <a href="../">Home</a>\
        <a href="../about">About</a>\
        <a href="../shop">Shop</a>\
        <a href="../shop#!/~/cart" style ="position: relative;top:5px;"><span class=""><svg width="16" height="30" viewBox="0 0 16 20"\
              xmlns="http://www.w3.org/2000/svg">\
              <g fill="none" fill-rule="evenodd">\
                <path\
                  d="M1 5v13.006c0 .548.446.994.994.994h12.012c.548 0 .994-.446.994-.994V5H1zm15-1v14.006c0 1.1-.895 1.994-1.994 1.994H1.994C.894 20 0 19.105 0 18.006V4h16z"\
                  fill="currentColor" fill-rule="nonzero"></path>\
                <path\
                  d="M5 7s-.005.5-.504.5C3.996 7.5 4 7 4 7V4c0-2.21 1.79-4 4-4s4 1.79 4 4v3s-.002.5-.5.5S11 7 11 7V4c0-1.657-1.343-3-3-3S5 2.343 5\ 4v3z"\
                  fill="currentColor"></path>\
              </g>\
            </svg></span><!----></a>\
      </div>';

}

function addTransitions() {
  for (let i = 0; i < document.getElementsByClassName("transitions").length; i++) {
    document.getElementsByClassName("transitions")[i].children[0].children[0].setAttribute("d",
      "M 0 0 L 0 35.400744305217266 L 3 34.48943566319356 L 6 33.58464225492476 L 9 32.68890007262053 L 12 31.804714365548037 L 15 30.934550825469547 L 18 30.08082691257136 L 21 29.24590335272306 L 24 28.432075836300708 L 27 27.64156694808707 L 30 26.87651835694244 L 33 26.138983293014434 L 36 25.43091933923278 L 39 24.75418156271713 L 42 24.110516010516868 L 45 23.501553592805916 L 48 22.92880437527736 L 51 22.393652301027394 L 54 21.897350360689938 L 57 21.441016227989508 L 60 21.025628376223594 L 63 20.65202268947608 L 66 20.320889580602486 L 69 20.032771626226218 L 72 19.7880617271451 L 75 19.58700180067925 L 78 19.429682009598846 L 81 19.316040530361924 L 84 19.245863861473808 L 87 19.21878767085905 L 90 19.23429817921872 L 93 19.291734074440136 L 96 19.390288950236787 L 99 19.529014260331632 L 102 19.706822777663092 L 105 19.922492546296983 L 108 20.174671311974603 L 111 20.461881415525433 L 114 20.78252513172584 L 117 21.134890434600607 L 120 21.51715716864906 L 123 21.927403604030655 L 126 22.363613352382007 L 129 22.82368261865392 L 132 23.305427763159564 L 135 23.806593146925792 L 138 24.32485923242823 L 141 24.857850910883712 L 144 25.4031460264688 L 147 25.958284067131302 L 150 26.520774991069633 L 153 27.088108157473872 L 156 27.657761329747743 L 159 28.227209719178873 L 162 28.79393503687444 L 165 29.35543452175601 L 168 29.909229912487547 L 171 30.45287633141396 L 174 30.983971048898965 L 177 31.500162096875602 L 180 31.99915670096257 L 183 32.478729501140194 L 186 32.936730531737524 L 189 33.371092932333596 L 192 33.77984036213625 L 195 34.16109409145513 L 198 34.51307974503586 L 201 34.834133673258336 L 204 35.12270892852911 L 207 35.37738082559971 L 210 35.59685206602441 L 213 35.77995740852069 L 216 35.9256678686117 L 219 36.03309443260444 L 222 36.1014912726841 L 225 36.13025845168161 L 228 36.11894410788504 L 231 36.06724611211642 L 234 35.97501319117221 L 237 35.84224551362436 L 240 35.66909473589154 L 243 35.45586350840973 L 246 35.20300444365254 L 249 34.91111854966562 L 252 34.58095313468128 L 255 34.21339919026065 L 258 33.809488262265816 L 261 33.37038882078732 L 264 32.897402141932744 L 267 32.39195771612148 L 270 31.855608199212256 L 273 31.290023924418655 L 276 30.696986994529563 L 279 30.07838497544337 L 282 29.43620421344586 L 285 28.772522799996462 L 288 28.0895032090463 L 291 27.389384633070993 L 294 26.674475045078246 L 297 25.947143014821357 L 300 25.209809308326676 L 303 24.464938300611863 L 306 23.71502923213914 L 309 22.962607340100927 L 312 22.210214896082302 L 315 21.460402181978484 L 318 20.715718436262414 L 321 19.978702802807828 L 324 19.251875314458744 L 327 18.537727943418442 L 330 17.83871575028848 L 333 17.157248163241327 L 336 16.49568041834557 L 339 15.856305191489607 L 342 15.241344451669189 L 345 14.652941564616302 L 348 14.093153674856708 L 351 13.563944393293252 L 354 13.067176816325432 L 357 12.604606901336432 L 360 12.177877222111796 L 363 11.788511126401428 L 366 11.437907316408687 L 369 11.127334871482638 L 372 10.857928730720456 L 375 10.630685651548031 L 378 10.44646065865599 L 381 10.305963995923392 L 384 10.20975859217199 L 387 10.15825804976749 L 390 10.15172516322324 L 393 10.190270973077805 L 396 10.273854358413193 L 399 10.402282169465124 L 402 10.575209899855576 L 405 10.792142896058412 L 408 11.052438099798255 L 411 11.355306317187022 L 414 11.699815006529153 L 417 12.084891574881858 L 420 12.509327171646568 L 423 12.97178096570131 L 426 13.470784890861669 L 429 14.004748842795106 L 432 14.57196630890445 L 435 15.170620411159703 L 438 15.798790340385867 L 441 16.45445815912339 L 444 17.13551594886775 L 447 17.839773276267472 L 450 18.564964951728186 L 453 19.30875905282838 L 456 20.06876518401173 L 459 20.842542943179833 L 462 21.627610565074754 L 465 22.42145371070934 L 468 23.221534371588252 L 471 24.02529985704861 L 474 24.83019183276058 L 477 25.633655378239514 L 480 26.433148031159064 L 483 27.2261487862993 L 486 28.010167017124846 L 489 28.782751288266248 L 492 29.54149802756195 L 495 30.284060026822395 L 498 31.00815474108299 L 501 31.71157235683287 L 504 32.39218360052636 L 507 33.047947259609245 L 510 33.67691738931328 L 513 34.27725017959215 L 516 34.847210457779454 L 519 35.38517780384605 L 522 35.889652256512804 L 525 36.35925958992793 L 528 36.79275614215001 L 531 37.189033178266925 L 534 37.54712077264147 L 537 37.866191196481424 L 540 38.145561798693365 L 543 38.384697369782046 L 546 38.58321198039505 L 549 38.740870287982894 L 552 38.85758830693537 L 555 38.9334336394647 L 558 38.9686251664235 L 561 38.96353219916741 L 564 38.91867309548894 L 567 38.834713344556256 L 570 38.71246312767863 L 573 38.55287436358598 L 576 38.357037248742756 L 579 38.126176305013644 L 582 37.86164594874968 L 585 37.56492559706874 L 588 37.23761432874586 L 591 36.881425118719264 L 594 36.498178666729544 L 597 36.089796842056074 L 600 35.65829576768043 L 603 35.20577856848719 L 606 34.734427809310965 L 609 34.24649764973801 L 612 33.74430574358208 L 615 33.23022491185957 L 618 32.70667461889686 L 621 32.17611228190213 L 624 31.641024444925783 L 627 31.103917848618103 L 630 30.56731042756148 L 633 30.033722267213147 L 636 29.505666552638473 L 639 28.985640541242578 L 642 28.476116591626102 L 645 27.979533280486017 L 648 27.49828663917529 L 651 27.034721541104954 L 654 26.591123270638548 L 657 26.16970930348085 L 660 25.77262132781415 L 663 25.401917534574242 L 666 25.05956520430594 L 669 24.7474336169795 L 672 24.46728731000123 L 675 24.220779708415566 L 678 24.009447149967723 L 681 23.83470332629564 L 684 23.69783416003672 L 687 23.599993136086496 L 690 23.54219710362929 L 693 23.525322563887457 L 696 23.550102456807636 L 699 23.617123458127562 L 702 23.72682379645214 L 705 23.87949159811694 L 708 24.07526376574068 L 711 24.314125394469464 L 714 24.59590972800289 L 717 24.92029865457264 L 720 25.286823741122582 L 723 25.69486780202611 L 726 26.143666996774034 L 729 26.632313449185283 L 732 27.15975837883795 L 735 27.72481573359476 L 738 28.3261663103167 L 741 28.96236234911997 L 744 29.631832584848404 L 747 30.33288773780671 L 750 31.06372642423648 L 753 31.822441465526293 L 756 32.60702657372513 L 759 33.41538338959423 L 762 34.245328848173855 L 765 35.0946028456811 L 768 35.96087618047837 L 771 36.84175873988127 L 774 37.734807903697586 L 777 38.63753713461881 L 780 39.547424724921704 L 783 40.461922668380105 L 786 41.37846562584315 L 789 42.294479952600646 L 792 43.2073927554411 L 795 44.114640947194864 L 798 45.013680266572614 L 801 45.90199423122473 L 804 46.77710299219042 L 807 47.636572058253556 L 810 48.47802085918406 L 813 49.29913111742048 L 816 50.09765499842559 L 819 50.8714230107396 L 822 51.618351627639925 L 825 52.336450603314 L 828 53.02382995752951 L 831 53.678706603973964 L 834 54.299410598697584 L 837 54.8843909864458 L 840 55.43222122410057 L 843 55.941604161949584 L 846 56.41137656507978 L 849 56.84051315882336 L 852 57.22813018388089 L 855 57.57348844848711 L 858 57.875995866776684 L 861 58.13520947433288 L 864 58.3508369137626 L 867 58.52273738502662 L 870 58.65092205715672 L 873 58.73555393990846 L 876 58.77694721581818 L 879 58.77556603505343 L 882 58.732022777355276 L 885 58.64707578726836 L 888 58.52162659072599 L 891 58.3567166029047 L 894 58.15352333906954 L 897 57.91335614190234 L 900 57.6376514405215 L 903 57.32796755807104 L 906 56.98597908636033 L 909 56.61347084757492 L 912 56.2123314645519 L 915 55.78454656249946 L 918 55.33219162635705 L 921 54.85742453921298 L 924 54.36247782833304 L 927 53.84965064639383 L 930 53.321300516453974 L 933 52.77983487004026 L 936 52.227702408457574 L 939 51.667384318064364 L 942 51.101385370770366 L 945 50.53222494142563 L 948 49.962427974062706 L 951 49.39451592913603 L 954 48.83099774397103 L 957 48.27436083858787 L 960 47.72706219890311 L 963 47.19151956903626 L 966 46.67010278406304 L 969 46.1651252740527 L 972 45.678835769622964 L 975 45.21341023852332 L 978 44.77094408194125 L 981 44.353444618296514 L 984 43.96282388127068 L 987 43.60089175769783 L 990 43.26934948973436 L 993 42.96978356443099 L 996 42.70366001244968 L 999 42.47231913621511 L 1002 42.276970686260306 L 1005 42.118689502933776 L 1008 41.998411638978126 L 1011 41.91693097678097 L 1014 41.87489635233827 L 1017 41.872809196167836 L 1020 41.91102169957211 L 1023 41.98973551277996 L 1026 42.109000979605554 L 1029 42.26871691135341 L 1032 42.46863090078047 L 1035 42.70834017500535 L 1038 42.98729298433665 L 1041 43.30479052208695 L 1044 43.659989368549176 L 1047 44.051904450447644 L 1050 44.47941250534322 L 1053 44.94125603867347 L 1056 45.43604775935923 L 1059 45.962275478203644 L 1062 46.51830745166545 L 1065 47.10239815200276 L 1068 47.71269444326601 L 1071 48.347242141178924 L 1074 49.00399293357386 L 1077 49.68081163677243 L 1080 50.37548376210158 L 1083 51.08572336563498 L 1086 51.8091811532413 L 1089 52.54345281211231 L 1092 53.286087539137256 L 1095 54.034596735791716 L 1098 54.78646283861529 L 1101 55.53914825386794 L 1104 56.290104364589936 L 1107 57.036780578025216 L 1110 57.776633381230496 L 1113 58.5071353726601 L 1116 59.22578423760034 L 1119 59.9301116355321 L 1122 60.61769196780745 L 1125 61.28615099445614 L 1128 61.93317426947007 L 1131 62.5565153645655 L 1134 63.15400385216711 L 1137 63.72355301922269 L 1140 64.2631672844071 L 1143 64.7709492923335 L 1146 65.24510665953841 L 1149 65.68395834824338 L 1152 66.08594064522211 L 1155 66.4496127245045 L 1158 66.77366177413234 L 1161 67.05690766872692 L 1164 67.29830717125078 L 1167 67.49695764901364 L 1170 67.65210029070553 L 1173 67.763122813012 L 1176 67.82956164718279 L 1179 67.85110359777481 L 1182 67.82758696766766 L 1185 67.75900214534829 L 1188 67.64549165237412 L 1191 67.48734965084383 L 1194 67.28502091262568 L 1197 67.03909925400802 L 1200 66.75032544133735 L 1203 66.41958457509148 L 1206 66.04790296169033 L 1209 65.6364444841689 L 1212 65.18650648461906 L 1215 64.69951517304386 L 1218 64.17702057895195 L 1221 63.62069106364723 L 1224 63.032307412729665 L 1227 62.41375652981718 L 1230 61.76702475391755 L 1233 61.09419082421579 L 1236 60.39741851730004 L 1239 59.67894898300911 L 1242 58.94109280616126 L 1245 58.18622182239612 L 1248 57.41676071723684 L 1251 56.63517843825154 L 1254 55.843979450854945 L 1257 55.04569486885066 L 1260 54.2428734912569 L 1263 53.4380727772954 L 1266 52.63384979163756 L 1269 51.83275215211305 L 1272 51.03730901207387 L 1275 50.25002210948435 L 1278 49.47335691457173 L 1281 48.70973390751578 L 1284 47.96152001720192 L 1287 47.23102025148012 L 1290 46.52046954869789 L 1293 45.8320248794827 L 1296 45.1677576268638 L 1299 44.529646271828476 L 1302 43.919569410325394 L 1305 43.339299126546166 L 1308 42.790494746047656 L 1311 42.274696990931076 L 1314 41.79332255785714 L 1317 41.34765913817804 L 1320 40.93886089789042 L 1323 40.56794443347973 L 1326 40.23578521803255 L 1329 39.94311455024993 L 1332 39.69051701720516 L 1335 39.47842847986233 L 1338 39.307134588512156 L 1341 39.17676983339654 L 1344 39.08731713388936 L 1347 39.038607967685124 L 1350 39.030323039526436 L 1353 39.06199348708153 L 1356 39.133002619672176 L 1359 39.24258818365758 L 1362 39.389845146405385 L 1365 39.57372898893641 L 1368 39.79305949552106 L 1371 40.04652502673518 L 1374 40.332687260767464 L 1377 40.64998638609962 L 1380 40.99674672707865 L 1383 41.37118278235986 L 1386 41.77140565472861 L 1389 42.195429849419654 L 1392 42.64118041673825 L 1395 43.10650041356682 L 1398 43.58915865720178 L 1401 44.08685774392983 L 1404 44.59724230380701 L 1407 45.1179074622665 L 1410 45.6464074784444 L 1413 46.18026452948375 L 1416 46.7169776095572 L 1419 47.254031511942166 L 1422 47.788905862185864 L 1425 48.319084170214936 L 1428 48.842062869179706 L 1431 49.355360308865244 L 1434 49.85652567166906 L 1437 50.34314777941622 L 1440 50.812863759672126 L 1443 51.26336754071394 L 1446 51.69241814492829 L 1449 52.09784775112439 L 1452 52.47756949706895 L 1455 52.82958499447582 L 1458 53.15199152970623 L 1461 53.44298892455095 L 1464 53.70088603267895 L 1467 53.92410684862869 L 1470 54.111196207599086 L 1473 54.26082505575187 L 1476 54.371795272264585 L 1479 54.44304402596866 L 1482 54.47364765106134 L 1485 54.46282502809183 L 1488 54.40994045818154 L 1491 54.314506020240806 L 1494 54.1761834027833 L 1497 53.994785203808846 L 1500 53.77027569411661 L 1503 53.50277104132019 L 1506 53.192538993753374 L 1509 52.839998025377724 L 1512 52.44571594471933 L 1515 52.01040797276963 L 1518 51.534934296672375 L 1521 51.02029710788653 L 1524 50.46763713534464 L 1527 49.87822968592677 L 1530 49.25348020631873 L 1533 48.594919382028934 L 1536 47.904197790982806 L 1539 47.18308013069855 L 1542 46.433439039565336 L 1545 45.65724853418711 L 1548 44.85657708612417 L 1551 44.0335803626438 L 1554 43.19049365728871 L 1557 42.32962403717436 L 1560 41.453342234934595 L 1563 40.56407431414197 L 1566 39.664293137838115 L 1569 38.75650967050478 L 1572 37.84326414440329 L 1575 36.92711712169162 L 1578 36.01064048409522 L 1581 35.096408382172925 L 1584 34.18698817635472 L 1587 33.28493140196307 L 1590 32.392764790343406 L 1593 31.51298137802623 L 1596 30.64803173553614 L 1599 29.80031534703109 L 1600 0 L 0 0 L 0 0");
  }
}

function ornamentUI(){
    if (! document.getElementById("main-container")) {
        resetUI();
        setup();
    }
      document.getElementById("main-container").style.display = "block";
     document.getElementById("canvas-container").style.display = "flex";
    
     document.getElementsByClassName("details-gallery__wrap")[0].style.display = "none";
   document.getElementsByClassName("product-details__gallery")[0].appendChild(document.getElementById("canvas-container")); 
    document.getElementsByClassName("product-details__sidebar")[0].insertBefore(document.getElementById("main-container"),document.getElementsByClassName("product-details__sidebar")[0].childNodes[13]); 
   
}


function hideOrnamentUI() {
     if (! document.getElementById("main-container")) {
        resetUI();
         setup();
    }
    document.getElementById("main-container").style.display = "none";
     document.getElementById("canvas-container").style.display = "none";
       document.getElementsByClassName("details-gallery__wrap")[0].style.display = "block";
   
}

function mousePressed() {
setTimeout(checkUI,500);
}

function checkUI() {
        if (window.location.href.indexOf("801295206") != -1) {
        if (!loadedOrnament) {
 ornamentUI();
 loadedOrnament = true;
 onCart = false;
        }
       
        updateValuesSW();
    } else {
        if (window.location.href.indexOf("cart") != -1 && !onCart) {
          //  window.scrollTo(0,0);
            onCart = true;
        } else {
            onCart = false;
        }
        loadedOrnament = false;
        hideOrnamentUI();
    }
}

function resetUI() {
    document.getElementById("designer").innerHTML = '  <div id="canvas-container"></div>\
            <div id="main-container">\
              <div id="pattern-section" class="control-section">\
                <h3>Select Pattern:</h3>\
                <div id="pattern-buttons" class="button-row">\
                  <button id="patternA-btn" class="pattern-button" data-pattern="Pattern A">Pattern A</button>\
                  <button id="patternB-btn" class="pattern-button" data-pattern="Pattern B">Pattern B</button>\
                  <button id="patternC-btn" class="pattern-button" data-pattern="Pattern C">Pattern C</button>\
                </div>\
              </div>\
              <div id="color1-section" class="control-section">\
                <h3 class="color-title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Background:</h3>\
                <div id="color-row-1" class="button-row color-row">\
                </div>\
              </div>\
              <div id="color2-section" class="control-section">\
                <h3 class="color-title">Secondary Color:</h3>\
                <div id="color-row-2" class="button-row color-row">\
                </div>\
              </div>\
              <div id="color3-section" class="control-section">\
                <h3 class="color-title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Primary Color:</h3>\
                <div id="color-row-3" class="button-row color-row">\
                </div>\
              </div>\
              <div id="randomize-section" class="control-section">\
                <button id="random-btn" class="randomButton">Try a Random Combination!</button>\
              </div>\
            </div>\
            '
}