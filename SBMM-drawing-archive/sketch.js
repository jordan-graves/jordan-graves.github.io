let petal;
let petalFill;
let petalDraw;
let baseLayer;
let finalLayer;

let garibaldi;
let garibaldibaseLayer;
let garibaldifinalLayer;
let garibaldilastDrawn;

let dolphin;
let dolphinbaseLayer;
let dolphinfinalLayer;
let dolphinlastDrawn;

let slider;
let backgroundButtons = [];
let drawingButtons = [];
let starfishDB, garibaldiDB, dolphinDB;

let skinnyImg, mediumImg, thickImg;
let skinnySelectedImg, mediumSelectedImg, thickSelectedImg;
let skinnyBtn, mediumBtn, thickBtn;
let lastDrawn;
let submittedFrame = 0;
let drawing = "Garibaldi";
let skinnyG, mediumG, thickG;
let skinnyD, mediumD, thickD;
let skinnyDMask, mediumDMask, thickDMask;

let starfishMask, garibaldiMask, dolphinMask;

function preload() {
  // Load images for buttons
  skinnyImg = loadImage('skinny.png');
  mediumImg = loadImage('medium.png');
  thickImg = loadImage('thick.png');

  skinnySelectedImg = loadImage('skinnySelected.png');
  mediumSelectedImg = loadImage('mediumSelected.png');
  thickSelectedImg = loadImage('thickSelected.png');

  skinnyG = loadImage("smallGaribaldiDrawing.png");
  mediumG = loadImage("mediumGaribaldiDrawing.png");
  thickG = loadImage("largeGaribaldiDrawing.png");

  skinnyD = loadImage("smallDolphinOverlay.png");
  mediumD = loadImage("mediumDolphinOverlay.png");
  thickD = loadImage("largeDolphinOverlay.png");

    skinnyDMask = loadImage("smallDolphinMask.png");
  mediumDMask = loadImage("mediumDolphinMask.png");
  thickDMask = loadImage("largeDolphinMask.png");
}


let bgColors = [
  "#3c387a",
  //"#5755a2",
  "#2b4de6ff",
  "#2f8eedff",
  "#3ae7abff",
  "#bff53fff",
  "#fbac24ff",
  "#fb6c24ff",
  "#e34081ff",
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
  garibaldiDB = database.ref('garibaldi');
    dolphinDB = database.ref('dolphin');

  let c = createCanvas(min(window.innerWidth,800) * 0.75, min(window.innerWidth,800) * 0.75);

  c.parent("starfishCanvas");
  petal = createGraphics(100, 200);
  baseLayer = createGraphics(100, 200);
  finalLayer = createGraphics(100, 200);
  lastDrawn = createGraphics(100, 200);

  garibaldi = createGraphics(400, 400);
  garibaldibaseLayer = createGraphics(400, 400);
  garibaldifinalLayer = createGraphics(400, 400);
  garibaldilastDrawn = createGraphics(400, 400);

  dolphin = createGraphics(400, 400);
  dolphinbaseLayer = createGraphics(400, 400);
  dolphinfinalLayer = createGraphics(400, 400);
  dolphinlastDrawn = createGraphics(400, 400);

  starfishMask = createGraphics(400,400);
  garibaldiMask = createGraphics(400,400);
  dolphinMask = createGraphics(400,400);

  angleMode(DEGREES);
  slider = createSlider(0, 2, 1);
  slider.position(10, 210);
  slider.size(80);
  slider.input(updateStar);
  slider.hide();
  petalFill = 1;
  petalDraw = 0;
  updateStar();
  updateGaribaldi();
  updateDolphin();
  skinnyBtn = createImg('skinny.png');
  // skinnyBtn.position(20, height + 20);
  // skinnyBtn.size(80, 80);
  skinnyBtn.mousePressed(selectSkinny);
  skinnyBtn.parent("bodythicknessbuttons");

  mediumBtn = createImg('mediumSelected.png');
  // mediumBtn.position(120, height + 20);
  // mediumBtn.size(80, 80);
  mediumBtn.mousePressed(selectMedium);
  mediumBtn.parent("bodythicknessbuttons");
  thickBtn = createImg('thick.png');
  //thickBtn.position(220, height + 20);
  // thickBtn.size(80, 80);
  thickBtn.mousePressed(selectThick);
  thickBtn.parent("bodythicknessbuttons");

  for (let i = 0; i < 8; i++) {
    let btn = createButton("");
    // btn.position(10 + i * 70, 400 + 10); // position below canvas
    // btn.style("padding", "5px");
    // btn.style("font-size", "14px");
    btn.style("background-color", bgColors[i]);
    btn.parent("bodycolorbuttons");

    btn.mousePressed(() => changeBackground(i));
    backgroundButtons.push(btn);
  }

  for (let i = 0; i < 8; i++) {
    let btn = createButton("");
    // btn.position(10 + i * 70, 400 + 50); // position below canvas
    // btn.style("padding", "5px");
    // btn.style("font-size", "14px");
    btn.style("background-color", bgColors[i]);
    btn.parent("drawingcolorbuttons");
    btn.mousePressed(() => changeDrawingColor(i));
    drawingButtons.push(btn);
  }

  updateButtonSelection();

  clearButton = createButton("Clear");
  //clearButton.position(30, 235); // position below canvas
  //clearButton.style("padding", "5px");
  //clearButton.style("font-size", "14px");
  clearButton.parent("drawingcolorbuttons");

  clearButton.style("background-color", "#5755a2");
  clearButton.mousePressed(clearDrawing);
  submitButton = createButton("Share Your Starfish!");
  //submitButton.position(25, 270); // position below canvas
  //submitButton.style("padding", "5px");
  //submitButton.style("font-size", "14px");
  submitButton.parent("submitbuttons");

  submitButton.style("background-color", "#5755a2");
  submitButton.mousePressed(submitDrawing);

  if (drawing == "Garibaldi") {
    switchToGaribaldi();
  } else if (drawing == "Starfish") {
    switchToStarfish();
  } else if (drawing == "Dolphin") {
    switchToDolphin();
  }
}

function selectSkinny() {

  slider.elt.value = 0

  if (drawing == "Starfish") {
    updateStar();
    skinnyBtn.elt.src = "skinnySelected.png";
    mediumBtn.elt.src = "medium.png";
    thickBtn.elt.src = "thick.png";
  }
  else if (drawing == "Garibaldi") {
    updateGaribaldi();
    skinnyBtn.elt.src = "smallGaribaldiSelected.png";
    mediumBtn.elt.src = "mediumGaribaldi.png";
    thickBtn.elt.src = "largeGaribaldi.png";
  }  else if (drawing == "Dolphin") {
    updateDolphin();
    skinnyBtn.elt.src = "smallDolphinSelected.png";
    mediumBtn.elt.src = "mediumDolphin.png";
    thickBtn.elt.src = "largeDolphin.png";
  }
}

function selectMedium() {
  slider.elt.value = 1

  if (drawing == "Starfish") {
    updateStar();
    skinnyBtn.elt.src = "skinny.png";
    mediumBtn.elt.src = "mediumSelected.png";
    thickBtn.elt.src = "thick.png";
  }
  else if (drawing == "Garibaldi") {
    updateGaribaldi();
    skinnyBtn.elt.src = "smallGaribaldi.png";
    mediumBtn.elt.src = "mediumGaribaldiSelected.png";
    thickBtn.elt.src = "largeGaribaldi.png";
  }  else if (drawing == "Dolphin") {
    updateDolphin();
    skinnyBtn.elt.src = "smallDolphin.png";
    mediumBtn.elt.src = "mediumDolphinSelected.png";
    thickBtn.elt.src = "largeDolphin.png";
  }
}

function selectThick() {
  slider.elt.value = 2
  if (drawing == "Starfish") {
    updateStar();
    skinnyBtn.elt.src = "skinny.png";
    mediumBtn.elt.src = "medium.png";
    thickBtn.elt.src = "thickSelected.png";
  }
  else if (drawing == "Garibaldi") {
    updateGaribaldi();
    skinnyBtn.elt.src = "smallGaribaldi.png";
    mediumBtn.elt.src = "mediumGaribaldi.png";
    thickBtn.elt.src = "largeGaribaldiSelected.png";
  }  else if (drawing == "Dolphin") {
    updateDolphin();
    skinnyBtn.elt.src = "smallDolphin.png";
    mediumBtn.elt.src = "mediumDolphin.png";
    thickBtn.elt.src = "largeDolphinSelected.png";
  }
}

function updateStar() {
  if (submittedFrame > 1) return;
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

function updateGaribaldi() {
  if (submittedFrame > 1) return;
  garibaldi.clear();
  garibaldi.noStroke();
  if (slider.value() == 0) {
    skinnyGaribaldi();
  } else if (slider.value() == 1) {
    mediumGaribaldi();
  } else {
    thickGaribaldi();
  }
  garibaldiMask.clear();
  garibaldiMask.background("#24204f");
  garibaldifinalLayer.image(garibaldibaseLayer, 0, 0);
  garibaldi.loadPixels();
  garibaldiMask.loadPixels();
  garibaldifinalLayer.loadPixels();
  for (let i = 3; i < garibaldi.pixels.length; i += 4) {
    garibaldiMask.pixels[i] = 255 - garibaldi.pixels[i];
    if (garibaldifinalLayer.pixels[i] == 0) continue;
    garibaldifinalLayer.pixels[i] = garibaldi.pixels[i];
    
  }
  garibaldifinalLayer.updatePixels();
  garibaldiMask.updatePixels();

}

function mediumGaribaldi() {
  garibaldi.tint(bgColors[petalFill]);
  garibaldi.image(mediumG, 0, 0, 400, 400);
  garibaldi.noTint();
}

function thickGaribaldi() {
  garibaldi.tint(bgColors[petalFill]);
  garibaldi.image(thickG, 0, 0, 400, 400);
  garibaldi.noTint();
}
function skinnyGaribaldi() {
  garibaldi.tint(bgColors[petalFill]);
  garibaldi.image(skinnyG, 0, 0, 400, 400);
  garibaldi.noTint();
}

function updateDolphin() {
  if (submittedFrame > 1) return;
  dolphin.clear();
  dolphin.noStroke();
  if (slider.value() == 0) {
    skinnyDolphin();
  } else if (slider.value() == 1) {
    mediumDolphin();
  } else {
    thickDolphin();
  }
 dolphinMask.clear();
  dolphinMask.background("#24204f");
  dolphinfinalLayer.image(dolphinbaseLayer, 0, 0);
  dolphin.loadPixels();
  dolphinMask.loadPixels();
  dolphinfinalLayer.loadPixels();
  for (let i = 3; i < dolphin.pixels.length; i += 4) {
    dolphinMask.pixels[i] = 255 - dolphin.pixels[i];
    if (dolphinfinalLayer.pixels[i] == 0) continue;
    if (dolphin.pixels[i]==0)
    dolphinfinalLayer.pixels[i] =0;
    
  }
  dolphinfinalLayer.updatePixels();
  dolphinMask.updatePixels();
}

function mediumDolphin() {
  dolphin.tint(bgColors[petalFill]);
  dolphin.image(mediumDMask, 0, 0, 400, 400);
  dolphin.noTint();

}

function thickDolphin() {
  dolphin.tint(bgColors[petalFill]);
  dolphin.image(thickDMask, 0, 0, 400, 400);
  dolphin.noTint();
}
function skinnyDolphin() {
  dolphin.tint(bgColors[petalFill]);
  dolphin.image(skinnyDMask, 0, 0, 400, 400);
  dolphin.noTint();
}
function mediumOldStar() {
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

function mediumStar() {
  petal.curveTightness(0.2);
  petal.fill(bgColors[petalFill]);
  petal.beginShape();
  petal.vertex(10, 147);
  petal.vertex(50, 200);
  petal.vertex(90, 147);
  petal.bezierVertex(90, 100, 60, 0, 50, 0);
  petal.bezierVertex(40, 0, 10, 100, 10, 147);
  petal.endShape();
}

function thickStar() {
  petal.fill(bgColors[petalFill]);
  petal.beginShape();

  petal.vertex(0, 135);

  petal.vertex(50, 200);
  petal.vertex(100, 135);

  petal.bezierVertex(100, 100, 60, 0, 50, 0);
  petal.bezierVertex(40, 0, 0, 100, 0, 135);

  petal.endShape(CLOSE);

}

function skinnyStar() {
  petal.curveTightness(0.2);
  petal.fill(bgColors[petalFill]);
  petal.beginShape();
  petal.vertex(20, 160);
  petal.vertex(50, 200);
  petal.vertex(80, 160);
  petal.bezierVertex(90, 150, 55, 0, 50, 0);
  petal.bezierVertex(45, 0, 10, 150, 20, 160);
  petal.endShape();
}

function skinnyOldStar() {
  petal.curveTightness(0.2);
  petal.fill(bgColors[petalFill]);
  petal.beginShape();
  petal.vertex(20, 150);
  petal.vertex(50, 200);
  petal.curveVertex(80, 150);
  petal.curveVertex(50, 0);
  petal.curveVertex(20, 150);
  petal.curveVertex(50, 200);
  petal.curveVertex(80, 150);
  petal.endShape();
}

function thickOldStar() {
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

  if (drawing == "Starfish") {
    if (
      mouseX < 0 ||
      mouseX >= width ||
      mouseY < 0 ||
      mouseY >= height 
      || frameCount % 2 == 0
    )
      return;

    let theta = atan2(mouseY - height / 2, mouseX - width / 2);
    let rad = dist(mouseX, mouseY, width / 2, height / 2);
    theta = (theta + 360) % 360
    let petalNumber;

    switch (true) {
      case theta >= 234 && theta < 306:
        petalNumber = 0;
        break;
      case theta >= 306 || theta < 18:
        petalNumber = 1;
        break;
      case theta >= 18 && theta < 90:
        petalNumber = 2;
        break;
      case theta >= 90 && theta < 162:
        petalNumber = 3;
        break;
      case theta >= 162 && theta < 234:
        petalNumber = 4;
        break;
      default:
        petalNumber = 0; // fallback
    }

    // Example usage:
    //let newPos = rotateAroundCenter(mouseX, mouseY, 400, 200, -72*petalNumber);

    let petalx = 50 + rad * cos(theta - 72 * petalNumber) * 400 / width;
    let petaly = 200 + rad * sin(theta - 72 * petalNumber) * 400 / width;


    // if (mouseX<100) {
    //   petalx=mouseX;
    //      petaly=mouseY;
    // }

    //console.log(petalx,petaly);


    // console.log(petalNumber);
    //console.log(petalx,petaly);
    //console.log(newPos.x-400+50, newPos.y);
    const px = petal.get(int(petalx), int(petaly));
    const inside = px[3] > 10;
    if (!inside) return;

    baseLayer.fill(bgColors[petalDraw]);
    baseLayer.noStroke();
    let size = dist(pmouseX, pmouseY, mouseX, mouseY) * 400 / width;
    baseLayer.ellipse(petalx, petaly, size, size);
    finalLayer.fill(bgColors[petalDraw]);
    finalLayer.noStroke();
    finalLayer.ellipse(petalx, petaly, size, size);
    //  baseLayer.line(100-pmouseX, pmouseY, 100-mouseX, mouseY);

  }

  else if (drawing == "Garibaldi") {
    if (
      mouseX < 0 ||
      mouseX >= width ||
      mouseY < 0 ||
      mouseY >= height 
            || frameCount % 2 == 0

    )
      return;

    let x = mouseX / width * garibaldi.width;
    let y = mouseY / height * garibaldi.height;
    const px = garibaldi.get(int(x), int(y));
    const inside = px[3] > 10;
    if (!inside) return;

    garibaldibaseLayer.fill(bgColors[petalDraw]);
    garibaldibaseLayer.noStroke();
    let size = dist(pmouseX, pmouseY, mouseX, mouseY) * 400 / width;
    //garibaldibaseLayer.ellipse(x, y, size, size);
     innerGlowEllipse(garibaldibaseLayer,x, y, size, size, bgColors[petalDraw]);
    garibaldifinalLayer.fill(bgColors[petalDraw]);
    garibaldifinalLayer.noStroke();
    //garibaldifinalLayer.ellipse(x, y, size, size);
         innerGlowEllipse(garibaldifinalLayer,x, y, size, size, bgColors[petalDraw]);

    //  baseLayer.line(100-pmouseX, pmouseY, 100-mouseX, mouseY);

  }

    else if (drawing == "Dolphin") {
    if (
      mouseX < 0 ||
      mouseX >= width ||
      mouseY < 0 ||
      mouseY >= height 
    )
      return;

    let x = mouseX / width * dolphin.width;
    let y = mouseY / height * dolphin.height;
    const px = dolphin.get(int(x), int(y));
    const inside = px[3] > 10;
    if (!inside) return;

    dolphinbaseLayer.fill(bgColors[petalDraw]);
    dolphinbaseLayer.noStroke();
    let size = dist(pmouseX, pmouseY, mouseX, mouseY) * 400 / width;
   // dolphinbaseLayer.ellipse(x, y, size, size);
        diffusedEllipse(dolphinbaseLayer, x, y, size, size, bgColors[petalDraw]);

    dolphinfinalLayer.fill(bgColors[petalDraw]);
    dolphinfinalLayer.noStroke();
   // dolphinfinalLayer.ellipse(x, y, size, size);
        diffusedEllipse(dolphinfinalLayer, x, y, size, size, bgColors[petalDraw]);

    //  baseLayer.line(100-pmouseX, pmouseY, 100-mouseX, mouseY);

  }



  return false;
}

function innerGlowEllipse(c, x, y, w, h, col, layers = 20, glowStrength = 0.5) {
  push();
  noStroke();
col = color(col);
  colorMode(HSB,360,255,255);
  let white = color(hue(col),255,45,0);
  let black = color(hue(col),255,brightness(col),50);
   colorMode(RGB,255,255,255);

   console.log(col,white);
  for (let i = layers; i > layers/2; i--) {
    if (i !=layers) {
      c.blendMode(ADD);
    }
    let t = i / layers; // 0 → outer, 1 → center

    // Pull color toward white near center
    let glowCol = lerpColor(col, white, pow(1-t,glowStrength));

    // Higher opacity toward center
    // let alpha = 255 * pow(t, 1.5);
    // glowCol.setAlpha(alpha);
    c.fill(glowCol);
    c.ellipse(
      x,
      y,
      w * pow(1-t,glowStrength)*2,
      h * pow(1-t,glowStrength)*2
    );
    
  }
c.blendMode(BLEND);
  pop();
}

function diffusedEllipse(c, x, y, w, h, col, layers = 20, falloff = 2) {
  noStroke();

  let r = red(col);
  let g = green(col);
  let b = blue(col);

  for (let i = layers; i > 0; i--) {
    let t = i / layers;

    // Ease the alpha falloff (non-linear = softer diffusion)
    let alpha = 255 * pow(1-t, falloff);

    c.fill(r, g, b, alpha);

    c.ellipse(
      x,
      y,
      w * t*4,
      h * t*4
    );
  }
}
// rotate point (x, y) around center (cx, cy) by angle degrees
function rotateAroundCenter(x, y, cx, cy, angleDeg) {
  let angle = radians(angleDeg); // convert degrees to radians
  let dx = x - cx;
  let dy = y - cy;

  let rx = dx * cos(angle) - dy * sin(angle) + cx;
  let ry = dx * sin(angle) + dy * cos(angle) + cy;

  return { x: rx, y: ry };
}




function draw() {
  background(255);
  clear();
  // image(petal, 0, 0, 100, 200);
  // image(finalLayer, 0, 0, 100, 200);
   if (drawing == "Dolphin") {
    //tint(bgColors[petalFill]);
    image(dolphin, 0, 0, width, height);
    image(dolphinfinalLayer, 0, 0, width, height);
    image(dolphinMask, 0, 0, width, height);

    if (submittedFrame == 0) {
      tint(255,255,255,100);
      blendMode(OVERLAY);

      if (slider.value() == 0) {
        image(skinnyD, 0, 0, width, height);
      } else if (slider.value() == 1) {
       image(mediumD, 0, 0, width, height);
      } else {
       image(thickD, 0, 0, width, height);
      }

      blendMode(BLEND);
      noTint();
    }

    push();
    let x;
    let y;
    let s;
    let s1;

    if (submittedFrame > 100) {
      x = map(submittedFrame, 200, 100, 0, -width);
      y = map(submittedFrame, 200, 100, 0, 0);
      s = map(submittedFrame, 200, 0, 1, 0.5);
      s1 = map(submittedFrame, 200, 0, 1, 0.5);
    } else {
      x = map(submittedFrame, 100, 1, 0, width*7/8, true);
      y = map(submittedFrame, 100, 1, 0, 0, true);
      s = map(submittedFrame, 100, 1, -0.4, -0.25, true);
      s1 = map(submittedFrame, 100,1, 0.4, 0.25, true);

    }
    translate(x, y);
    scale(s, s1);
    image(dolphinlastDrawn, 0, 0, width, height);
    pop();

    if (submittedFrame == 1) {
      updateDolphin();
    }
    if (submittedFrame > 0) {
      submittedFrame--;
    }
    // noTint();
  }
  else if (drawing == "Garibaldi") {
    //tint(bgColors[petalFill]);
    image(garibaldi, 0, 0, width, height);
    image(garibaldifinalLayer, 0, 0, width, height);
     image(garibaldiMask, 0, 0, width, height);
    if (submittedFrame == 0) {
      blendMode(MULTIPLY);

      if (slider.value() == 0) {
        image(skinnyG, 0, 0, width, height);
      } else if (slider.value() == 1) {
        image(mediumG, 0, 0, width, height);
      } else {
        image(thickG, 0, 0, width, height);
      }

      blendMode(BLEND);
    }

    push();
    let x;
    let y;
    let s;
    let s1;

    if (submittedFrame > 100) {
      x = map(submittedFrame, 200, 100, 0, -width);
      y = map(submittedFrame, 200, 100, 0, 0);
      s = map(submittedFrame, 200, 0, 1, 0.5);
      s1 = map(submittedFrame, 200, 0, 1, 0.5);
    } else {
      x = map(submittedFrame, 100, 1, 0, width*7/8, true);
      y = map(submittedFrame, 100, 1, 0, 0, true);
      s = map(submittedFrame, 100, 1, -0.4, -0.25, true);
      s1 = map(submittedFrame, 100,1, 0.4, 0.25, true);

    }
    translate(x, y);
    scale(s, s1);
    image(garibaldilastDrawn, 0, 0, width, height);
    pop();

    if (submittedFrame == 1) {
      updateGaribaldi();
    }
    if (submittedFrame > 0) {
      submittedFrame--;
    }
    // noTint();
  }
 else if (drawing == "Starfish") {

    for (let i = 0; i < 5; i++) {
      push();
      translate(width / 2, height / 2);
      rotate(72 * i + 0 * sin(frameCount / 3 + i * 50));
      image(petal, -width / 8, -width / 2, width / 4, width / 2);
      image(finalLayer, -width / 8, -width / 2, width / 4, width / 2);
      pop();
    }

    for (let i = 0; i < 5; i++) {
      push();
      let x = map(submittedFrame, 200, 0, width / 2, width * 0.8);
      let y = map(submittedFrame, 200, 0, width / 2, height * 0.125);
      let s = map(submittedFrame, 200, 0, 1, 0.2);
      let r = map(submittedFrame, 200, 0, 0, 360 + 18);
      translate(x, y);
      scale(s);
      rotate(72 * i + 0 * sin(frameCount / 3 + i * 50) + r);
      image(lastDrawn, -width / 8, -width / 2, width / 4, width / 2);
      pop();
    }

    if (submittedFrame == 1) {
      updateStar();
    }
    if (submittedFrame > 0) {
      submittedFrame--;
    }
  }



}
function changeBackground(color) {

  petalFill = color;
  updateButtonSelection();

  if (drawing == "Starfish") {
    updateStar();
  }
  if (drawing == "Garibaldi") {
    updateGaribaldi();
  }
    if (drawing == "Dolphin") {
    updateDolphin();
  }
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

      document.getElementsByClassName("switchButtons")[0].style.border = "3px solid transparent";
      document.getElementsByClassName("switchButtons")[1].style.border ="3px solid transparent";
      document.getElementsByClassName("switchButtons")[2].style.border = "3px solid transparent";
      if (drawing == "Starfish") {
    document.getElementsByClassName("switchButtons")[0].style.border = "3px solid white";
      } else if (drawing == "Garibaldi") {
    document.getElementsByClassName("switchButtons")[1].style.border = "3px solid white";
      } else {
        document.getElementsByClassName("switchButtons")[2].style.border = "3px solid white";

      }
}

function clearDrawing() {
  if (drawing == "Starfish") {
    baseLayer.clear();
    finalLayer.clear();
  } else if (drawing == "Garibaldi") {
    garibaldibaseLayer.clear();
    garibaldifinalLayer.clear();
  } else if (drawing == "Dolphin") {
    dolphinbaseLayer.clear();
    dolphinfinalLayer.clear();
  }
}

function submitDrawing() {
  if (drawing == "Starfish") {

    lastDrawn.clear();
    console.log("submitted")
    submittedFrame = 200;
    lastDrawn.image(petal, 0, 0);
    lastDrawn.image(finalLayer, 0, 0);

    if (slider.value() == 0) {
      skinnyOldStar();
    } else if (slider.value() == 1) {
      mediumOldStar();
    } else {
      thickOldStar();
    }

    let buff = createGraphics(100, 200);
    buff.image(petal, 0, 0);
    buff.image(finalLayer, 0, 0);
    let data = {
      fish: buff.elt.toDataURL()
    }
    starfishDB.push(data);

    petal.clear();
    baseLayer.clear();
    finalLayer.clear();
  }

  else if (drawing == "Garibaldi") {

    garibaldilastDrawn.clear();
    console.log("submitted")
    submittedFrame = 200;
    garibaldilastDrawn.image(garibaldi, 0, 0);
    garibaldilastDrawn.image(garibaldifinalLayer, 0, 0);



    let buff = createGraphics(400, 400);
    buff.image(garibaldi, 0, 0);
    buff.image(garibaldifinalLayer, 0, 0);
    buff.blendMode(MULTIPLY);
    garibaldilastDrawn.blendMode(MULTIPLY);

    if (slider.value() == 0) {
      buff.image(skinnyG, 0, 0, 400, 400);
      garibaldilastDrawn.image(skinnyG, 0, 0,400,400);
    } else if (slider.value() == 1) {
      buff.image(mediumG, 0, 0, 400, 400);
      garibaldilastDrawn.image(mediumG, 0, 0,400,400);

    } else {
      buff.image(thickG, 0, 0, 400, 400);
      garibaldilastDrawn.image(thickG, 0, 0,400,400);

    }
    buff.blendMode(BLEND);
    garibaldilastDrawn.blendMode(BLEND);

    
  buff.loadPixels();
  garibaldilastDrawn.loadPixels();
  for (let i = 3; i < garibaldi.pixels.length; i += 4) {
    garibaldilastDrawn.pixels[i] = garibaldi.pixels[i];
    buff.pixels[i] = garibaldi.pixels[i];

  }
  buff.updatePixels();
  garibaldilastDrawn.updatePixels();

    let data = {
      fish: buff.elt.toDataURL()
    }
    garibaldiDB.push(data);

    garibaldi.clear();
    garibaldibaseLayer.clear();
    garibaldifinalLayer.clear();


  } else if (drawing == "Dolphin") {

    dolphinlastDrawn.clear();
    console.log("submitted")
    submittedFrame = 200;
    dolphinlastDrawn.image(dolphin, 0, 0);
    dolphinlastDrawn.image(dolphinfinalLayer, 0, 0);



    let buff = createGraphics(400, 400);
    buff.image(dolphin, 0, 0);
    buff.image(dolphinfinalLayer, 0, 0);

    buff.tint(255,255,255,100);
    dolphinlastDrawn.tint(255,255,255,100);
    buff.blendMode(OVERLAY);
    dolphinlastDrawn.blendMode(OVERLAY);

    if (slider.value() == 0) {
      buff.image(skinnyD, 0, 0, 400, 400);
      dolphinlastDrawn.image(skinnyD, 0, 0,400,400);
    } else if (slider.value() == 1) {
      buff.image(mediumD, 0, 0, 400, 400);
      dolphinlastDrawn.image(mediumD, 0, 0,400,400);

    } else {
      buff.image(thickD, 0, 0, 400, 400);
      dolphinlastDrawn.image(thickD, 0, 0,400,400);

    }
    buff.blendMode(BLEND);
    dolphinlastDrawn.blendMode(BLEND);
 buff.noTint();
    dolphinlastDrawn.noTint();

      buff.loadPixels();
  dolphinlastDrawn.loadPixels();
  for (let i = 3; i < dolphin.pixels.length; i += 4) {
    dolphinlastDrawn.pixels[i] = dolphin.pixels[i];
    buff.pixels[i] = dolphin.pixels[i];

  }
  buff.updatePixels();
  dolphinlastDrawn.updatePixels();

    let data = {
      fish: buff.elt.toDataURL()
    }
    dolphinDB.push(data);

    dolphin.clear();
    dolphinbaseLayer.clear();
    dolphinfinalLayer.clear();


  }

}

function switchToGaribaldi() {
  drawing = "Garibaldi";
  updateGaribaldi();
  skinnyBtn.elt.src = "smallGaribaldi.png";
  mediumBtn.elt.src = "mediumGaribaldi.png";
  thickBtn.elt.src = "largeGaribaldi.png";
  if (slider.value() == 0)
    skinnyBtn.elt.src = "smallGaribaldiSelected.png";
  else if (slider.value() == 1)
    mediumBtn.elt.src = "mediumGaribaldiSelected.png";
  else if (slider.value() == 2)
    thickBtn.elt.src = "largeGaribaldiSelected.png";

  //document.getElementsByClassName("section-header")[0].innerHTML="Body Shape"
  submitButton.elt.innerHTML = "Share Your Garibaldi";
  updateButtonSelection();
}

function switchToStarfish() {
  drawing = "Starfish";
  updateStar();
  skinnyBtn.elt.src = "skinny.png";
  mediumBtn.elt.src = "medium.png";
  thickBtn.elt.src = "thick.png";
  if (slider.value() == 0)
    skinnyBtn.elt.src = "skinnySelected.png";
  else if (slider.value() == 1)
    mediumBtn.elt.src = "mediumSelected.png";
  else if (slider.value() == 2)
    thickBtn.elt.src = "thickSelected.png";

  //document.getElementsByClassName("section-header")[0].innerHTML="Body Shape"
  submitButton.elt.innerHTML = "Share Your Starfish";
  updateButtonSelection();
}

function switchToDolphin() {
  drawing = "Dolphin";

updateDolphin();
  skinnyBtn.elt.src = "smallDolphin.png";
  mediumBtn.elt.src = "mediumDolphin.png";
  thickBtn.elt.src = "largeDolphin.png";
  if (slider.value() == 0)
    skinnyBtn.elt.src = "smallDolphinSelected.png";
  else if (slider.value() == 1)
    mediumBtn.elt.src = "mediumDolphinSelected.png";
  else if (slider.value() == 2)
    thickBtn.elt.src = "largeDolphinSelected.png";

  submitButton.elt.innerHTML = "Share Your Dolphin";
  updateButtonSelection();
}
