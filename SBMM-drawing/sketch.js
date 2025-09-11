let petal;
let petalFill;
let petalDraw;
let baseLayer;
let finalLayer;
let slider;
let backgroundButtons = [];
let drawingButtons = [];
let starfishDB;

let bgColors = [
  "#3c387a",
  "#5755a2",
  "#357a9e",
  "#55b8d7",
  "#59c29d",
  "#c7e879",
  "#e15f67",
  "#af3163",
];
let clearButton;
let submitButton;
 const firebaseConfig = {
    apiKey: "AIzaSyBSbbatfziELhgfcB8appKUuzNj24p9IDs",
    authDomain: "sbmm-ca63f.firebaseapp.com",
    projectId: "sbmm-ca63f",
    storageBucket: "sbmm-ca63f.firebasestorage.app",
    messagingSenderId: "895937742811",
    appId: "1:895937742811:web:e6941e95e4c92837d709fe",
    measurementId: "G-F62BNSZ0M8"
  };

function setup() {
  
  firebase.initializeApp(firebaseConfig);
 database = firebase.database();
starfishDB = database.ref('starfish');
  
  createCanvas(800, 500);
  petal = createGraphics(100, 200);
  baseLayer = createGraphics(100, 200);
  finalLayer = createGraphics(100, 200);

  angleMode(DEGREES);
  slider = createSlider(0, 2, 1);
  slider.position(10, 210);
  slider.size(80);
  slider.input(updateStar);
  petalFill = 1;
  petalDraw = 0;
  updateStar();

  for (let i = 0; i < 8; i++) {
    let btn = createButton("BG " + (i + 1));
    btn.position(10 + i * 70, 400 + 10); // position below canvas
    btn.style("padding", "5px");
    btn.style("font-size", "14px");
    btn.style("background-color", bgColors[i]);

    btn.mousePressed(() => changeBackground(i));
    backgroundButtons.push(btn);
  }

  for (let i = 0; i < 8; i++) {
    let btn = createButton("DR " + (i + 1));
    btn.position(10 + i * 70, 400 + 50); // position below canvas
    btn.style("padding", "5px");
    btn.style("font-size", "14px");
    btn.style("background-color", bgColors[i]);

    btn.mousePressed(() => changeDrawingColor(i));
    drawingButtons.push(btn);
  }

  updateButtonSelection();

  clearButton = createButton("Clear");
  clearButton.position(30, 235); // position below canvas
  clearButton.style("padding", "5px");
  clearButton.style("font-size", "14px");

  clearButton.style("background-color", bgColors[1]);
  clearButton.mousePressed(clearDrawing);
  submitButton = createButton("Submit");
  submitButton.position(25, 270); // position below canvas
  submitButton.style("padding", "5px");
  submitButton.style("font-size", "14px");

  submitButton.style("background-color", bgColors[1]);
  submitButton.mousePressed(submitDrawing);
}

function updateStar() {
  petal.clear();
  petal.noStroke();
  if (slider.value() == 0) {
    skinnyStar();
  } else if (slider.value() == 1) {
    mediumStar();
  } else {
    thickStar();
  }
  finalLayer.image(baseLayer, 0, 0);
  petal.loadPixels();
  finalLayer.loadPixels();
  for (let i = 3; i < petal.pixels.length; i += 4) {
    if (finalLayer.pixels[i] == 0) continue;
    finalLayer.pixels[i] = petal.pixels[i];
  }
  finalLayer.updatePixels();
}

function mediumStar() {
  petal.curveTightness(0.2);
  petal.fill(bgColors[petalFill]);
  petal.beginShape();
  petal.curveVertex(10, 140);
  petal.curveVertex(50, 200);
  petal.curveVertex(90, 140);
  petal.curveVertex(50, 0);
  petal.curveVertex(10, 140);
  petal.curveVertex(50, 200);
  petal.curveVertex(90, 140);
  petal.endShape();
}

function skinnyStar() {
  petal.curveTightness(0.2);
  petal.fill(bgColors[petalFill]);
  petal.beginShape();
  petal.curveVertex(20, 150);
  petal.curveVertex(50, 200);
  petal.curveVertex(80, 150);
  petal.curveVertex(50, 0);
  petal.curveVertex(20, 150);
  petal.curveVertex(50, 200);
  petal.curveVertex(80, 150);
  petal.endShape();
}

function thickStar() {
  petal.curveTightness(0.4);
  petal.fill(bgColors[petalFill]);
  petal.beginShape();
  petal.curveVertex(0, 135);
  petal.curveVertex(50, 200);
  petal.curveVertex(100, 135);
  petal.curveVertex(50, 0);
  petal.curveVertex(0, 135);
  petal.curveVertex(50, 200);
  petal.curveVertex(100, 135);
  petal.endShape();
}

function mouseDragged() {
  if (
    mouseX < 0 ||
    mouseX >= width ||
    mouseY < 0 ||
    mouseY >= height ||
    frameCount % 2 == 0
  )
    return;

  const px = petal.get(int(mouseX), int(mouseY));
  const inside = px[3] > 10;
  if (!inside) return;

  baseLayer.fill(bgColors[petalDraw]);
  baseLayer.noStroke();
  let size = dist(pmouseX, pmouseY, mouseX, mouseY);
  baseLayer.ellipse(mouseX, mouseY, size, size);
  finalLayer.fill(bgColors[petalDraw]);
  finalLayer.noStroke();
  finalLayer.ellipse(mouseX, mouseY, size, size);
  //  baseLayer.line(100-pmouseX, pmouseY, 100-mouseX, mouseY);
}

function draw() {
  background("#24204f");

  image(petal, 0, 0, 100, 200);
  image(finalLayer, 0, 0, 100, 200);

  for (let i = 0; i < 5; i++) {
    push();
    translate(400, 200);
    rotate(72 * i + 3 * sin(frameCount / 3 + i * 50));
    image(petal, -50, -200, 100, 200);
    image(finalLayer, -50, -200, 100, 200);
    pop();
  }
}
function changeBackground(color) {
  petalFill = color;
  updateStar();
  updateButtonSelection();
}

function changeDrawingColor(color) {
  petalDraw = color;
  updateButtonSelection();
}

function updateButtonSelection() {
  for (let i = 0; i < backgroundButtons.length; i++) {
    backgroundButtons[i].style("border", "1px solid #333"); // default
  }

  backgroundButtons[petalFill].style("border", "3px solid white");
  
  for (let i = 0; i < drawingButtons.length; i++) {
    drawingButtons[i].style("border", "1px solid #333"); // default
  }

  drawingButtons[petalDraw].style("border", "3px solid white");
}

function clearDrawing() {
 baseLayer.clear();
  finalLayer.clear();
}

function submitDrawing() {
  console.log("submitted")
  let buff = createGraphics(100,200);
  buff.image(petal,0,0);
  buff.image(finalLayer,0,0);
  let data = {
    fish:buff.elt.toDataURL()
  }
  starfishDB.push(data);
  baseLayer.clear();
  finalLayer.clear();
}
