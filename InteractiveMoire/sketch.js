let img = [];
let layers = [];
let selectedLayer = null;
let debugMode = false;

// --------------------
// PRELOAD IMAGES
// --------------------
function preload() {
  img[0] = loadImage("Untitled-5-01.png");
  img[1] = loadImage("Untitled-5-02.png");
  img[2] = loadImage("Untitled-5-03.png");
  img[3] = loadImage("Untitled-5-04.png");
  img[4] = loadImage("Untitled-5-05.png");
  img[5] = loadImage("Untitled-5-06.png");
  img[6] = loadImage("Untitled-5-07.png");
  img[7] = loadImage("Untitled-5-08.png");
  img[8] = loadImage("Untitled-5-09.png");
}

// --------------------
// SETUP
// --------------------
function setup() {
  createCanvas(1200,600);
  imageMode(CENTER);
  angleMode(DEGREES);
  textFont('monospace');
  textSize(12);

  for (let i = 0; i < img.length; i++) {
    let bbox = computeBoundingBox(img[i]);
    layers.push({
      img: img[i],
      name: `Layer ${i + 1}`,
      x: width / 2+100,
      y: height / 2,
      rotation: 0,
      visible: true,
      bbox: bbox
    });
  }
}

// --------------------
// DRAW LOOP
// --------------------
function draw() {
  background(245);
  
   if (keyIsPressed && selectedLayer) {
    if (keyIsDown(LEFT_ARROW)) {
      selectedLayer.x-=0.5;
    }
     
     if (keyIsDown(RIGHT_ARROW)) {
      selectedLayer.x+=0.5;
    }
      if (keyIsDown(UP_ARROW)) {
      selectedLayer.y-=0.5;
    }
     
     if (keyIsDown(DOWN_ARROW)) {
      selectedLayer.y+=0.5;
    }
   }

  // Draw visible layers
  for (let layer of layers) {
    if (!layer.visible) continue;
    drawLayer(layer);
  }

  if (debugMode) drawDebugBoxes();
  drawUI();

  if (selectedLayer) drawSelection(selectedLayer);
}

// --------------------
// DRAW INDIVIDUAL LAYER
// --------------------
function drawLayer(layer) {
  let b = layer.bbox;
  push();
  translate(layer.x, layer.y);
  translate(b.x, b.y);          // move to bbox center
  rotate(layer.rotation);
  image(layer.img, -b.x, -b.y); // offset image to align with bbox
  pop();
}

// --------------------
// LAYER SELECTION & DEBUG
// --------------------
function drawSelection(layer) {
  let b = layer.bbox;
  push();
  translate(layer.x, layer.y);
  translate(b.x, b.y);
  rotate(layer.rotation);
  noFill();
  stroke(0, 255, 0);
  strokeWeight(2);
  rectMode(CENTER);
  rect(0, 0, b.w, b.h);
  pop();
}

function drawDebugBoxes() {
  for (let l of layers) {
    let b = l.bbox;
    push();
    translate(l.x, l.y);
    translate(b.x, b.y);
    rotate(l.rotation);
    noFill();
    stroke(0, 150, 255, 150);
    rectMode(CENTER);
    rect(0, 0, b.w, b.h);
    pop();
  }
}

// --------------------
// UI PANEL
// --------------------
function drawUI() {
  let panelX = 10;
  let panelY = 10;
  let panelW = 220; // slightly wider to fit thumbnails
  let panelH = layers.length * 30 + 30;
  let thumbnailSize = 20;

  fill(255, 240);
  stroke(0);
  rect(panelX, panelY, panelW, panelH, 8);

  noStroke();
  fill(0);
  text("Layers:", panelX + 10, panelY + 20);

  for (let i = 0; i < layers.length; i++) {
    let y = panelY + 40 + i * 30;

    // Visibility toggle square
    fill(layers[i].visible ? 'green' : 'red');
    rect(panelX + 10, y, 15, 15, 3);

    // Thumbnail
    imageMode(CENTER);
    let imgAspect = layers[i].img.width / layers[i].img.height;
    let tw = thumbnailSize;
    let th = thumbnailSize;
    if (imgAspect > 1) th = thumbnailSize / imgAspect;
    else tw = thumbnailSize * imgAspect;
    image(layers[i].img, panelX + 10 + 15 + 10 + tw / 2, y + 7.5, tw, th);

    // Layer name text
    fill(0);
    text(layers[i].name, panelX + 10 + 15 + 10 + thumbnailSize + 5, y + 12);
  }
   text("Hold SHIFT then \nclick & drag to rotate", panelX + 10, panelY + 50 + layers.length * 30);
}

// --------------------
// MOUSE INTERACTION
// --------------------
function mousePressed() {
  console.log(mouseX,mouseY);
  // Toggle visibility if clicked on UI
  let panelY = 10;
  for (let i = 0; i < layers.length; i++) {
    let y = panelY + 40 + i * 30;
    if (mouseX > 10 && mouseX < 35 && mouseY > y -5 && mouseY < y + 25) {
      layers[i].visible = !layers[i].visible;
      return;
    }
  }

  // Otherwise, select layer under mouse
  selectedLayer = null;
  for (let i = layers.length - 1; i >= 0; i--) {
    let l = layers[i];
    if (!l.visible) continue;
    if (isInsideLayer(mouseX, mouseY, l)) {
      selectedLayer = l;
      l.offsetX = mouseX - l.x;
      l.offsetY = mouseY - l.y;
      break;
    }
  }
}

function mouseDragged() {
  if (selectedLayer) {
    if (keyIsDown(SHIFT)) {
      let dx = mouseX - selectedLayer.x;
      let dy = mouseY - selectedLayer.y;
      selectedLayer.rotation = atan2(dy, dx);
    } else {
      selectedLayer.x = mouseX - selectedLayer.offsetX;
      selectedLayer.y = mouseY - selectedLayer.offsetY;
    }
  }
}

function mouseReleased() {
  selectedLayer = null;
}

function keyPressed() {
  if (key === 'd' || key === 'D') debugMode = !debugMode;
  
  
}

// --------------------
// BOUNDING BOX COMPUTATION
// --------------------
function computeBoundingBox(image, alphaThreshold = 5) {
  image.loadPixels();

  let minX = image.width;
  let minY = image.height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      let idx = 4 * (y * image.width + x);
      let a = image.pixels[idx + 3];
      if (a > alphaThreshold) {
        minX = min(minX, x);
        minY = min(minY, y);
        maxX = max(maxX, x);
        maxY = max(maxY, y);
      }
    }
  }

  if (maxX < minX || maxY < minY) {
    return { x: 0, y: 0, w: image.width, h: image.height };
  }

  return {
    x: (minX + maxX) / 2 - image.width / 2,
    y: (minY + maxY) / 2 - image.height / 2,
    w: maxX - minX,
    h: maxY - minY
  };
}

// --------------------
// SELECTION HELPER
// --------------------
function isInsideLayer(px, py, layer) {
  let lx = px - layer.x;
  let ly = py - layer.y;

  let angle = -radians(layer.rotation);
  let rotatedX = lx * cos(angle) - ly * sin(angle);
  let rotatedY = lx * sin(angle) + ly * cos(angle);

  let b = layer.bbox;
  return rotatedX > b.x - b.w / 2 && rotatedX < b.x + b.w / 2 &&
         rotatedY > b.y - b.h / 2 && rotatedY < b.y + b.h / 2;
}
