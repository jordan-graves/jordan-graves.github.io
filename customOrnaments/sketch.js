let color1, color2, color3;
let front, back;
let front1, back1, front2, back2, front3, back3;
let pg, pg1;
let colors;

// Global variables to track the currently selected options
let currentPattern = "Pattern A";
let currentColor1 = "Red";
let currentColor2 = "Yellow";
let currentColor3 = "Blue";

function preload() {
  // Assuming these files exist in your sketch folder
  front1 = loadImage("front1.png");
  back1 = loadImage("back1.png");
  front2 = loadImage("front2.png");
  back2 = loadImage("back2.png");
  front3 = loadImage("front3.png");
  back3 = loadImage("back3.png");
  front = front1;
  back = back1;
}

function setup() {
  // 1. Create Canvas and place it in the designated container
  let canvas = createCanvas(800, 700, WEBGL);
  canvas.parent('canvas-container'); // Attach the canvas to the HTML div
  pixelDensity(2);

  // Define available colors
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

  // Initialize graphics buffers
  pg = createGraphics(1200, 1200);
  pg.pixelDensity(1);
  pg1 = createGraphics(1200, 1200);
  pg1.pixelDensity(1);

  // --- UI SETUP: Patterns (Attach listeners to existing HTML buttons) ---
  let patternOptions = ["Pattern A", "Pattern B", "Pattern C"];
  patternOptions.forEach(pName => {
    let btn = select(`[data-pattern="${pName}"]`);
    if (btn) {
      btn.mousePressed(() => setPattern(pName, patternOptions));
    }
  });

  // --- UI SETUP: Colors (Dynamically create buttons inside existing HTML divs) ---
  createColorButtons(colors, '#color-row-1', 1, currentColor1);
  createColorButtons(colors, '#color-row-2', 2, currentColor2);
  createColorButtons(colors, '#color-row-3', 3, currentColor3);

  // --- UI SETUP: Randomize Button ---
  let randomizeButton = select('#random-btn');
  if (randomizeButton) {
    randomizeButton.mousePressed(randomizeSelections);
  }

  // Initialize colors and draw
  color1 = getSelectedColor(currentColor1);
  color2 = getSelectedColor(currentColor2);
  color3 = getSelectedColor(currentColor3);
  updateValues(); // Initial draw
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