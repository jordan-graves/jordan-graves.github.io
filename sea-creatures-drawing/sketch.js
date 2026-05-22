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
let port, socket;

let drawingStyle;

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
let drawingButton1,drawingButton2,drawingButton3,drawingButton4;


function setup() {

  if (window.innerHeight<window.innerWidth) {
    document.getElementById("right").prepend(document.getElementById("bodyButtons"))
  }

    	try {
		port = (process.env.PORT || 4000);
	} catch {

	}
	socket = io.connect(port);
  

  // firebase.initializeApp(firebaseConfig);
  // database = firebase.database();
  // starfishDB = database.ref('starfish');
  // garibaldiDB = database.ref('garibaldi');
  //   dolphinDB = database.ref('dolphin');

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



   drawingButton1 = createButton("Solid Pen");
  drawingButton1.parent("drawingtoolbuttons");
  drawingButton1.style("background-color", "#5755a2");
  drawingButton1.mousePressed(function() {drawingStyle="Plain";updateButtonSelection();});

  drawingButton2 = createButton("Dots");
  drawingButton2.parent("drawingtoolbuttons");
  drawingButton2.style("background-color", "#5755a2");
  drawingButton2.mousePressed(function() {drawingStyle="Starfish";updateButtonSelection();});

  drawingButton3 = createButton("Glowing Dots");
  drawingButton3.parent("drawingtoolbuttons");
  drawingButton3.style("background-color", "#5755a2");
  drawingButton3.mousePressed(function() {drawingStyle="Garibaldi";updateButtonSelection();});


  drawingButton4 = createButton("Spray");
  drawingButton4.parent("drawingtoolbuttons");
  drawingButton4.style("background-color", "#5755a2");
  drawingButton4.mousePressed(function() {drawingStyle="Dolphin";updateButtonSelection();});

  clearButton = createButton("Clear<br>Drawing");
  //clearButton.position(30, 235); // position below canvas
  clearButton.style("background-color", "rgb(87, 85, 162)");
  clearButton.style("align-self", "end");
    if (window.innerWidth<800) {
          clearButton.style("height", "60px");

    } else {
          clearButton.style("height", "110px");
    }
  clearButton.parent("drawingRow");


  clearButton.style("background-color", "#5755a2");
  clearButton.mousePressed(clearDrawing);
  submitButton = createButton("Share Your Sea Star!");
  //submitButton.position(25, 270); // position below canvas
  //submitButton.style("padding", "5px");
  //submitButton.style("font-size", "14px");
  submitButton.parent("submitbuttons");

  submitButton.style("background-color", "#5755a2");
  submitButton.mousePressed(submitDrawing);

    updateButtonSelection();

  if (drawing == "Garibaldi") {
    switchToGaribaldi();
  } else if (drawing == "Starfish") {
    switchToStarfish();
  } else if (drawing == "Dolphin") {
    switchToDolphin();
  }

    drawingStyle = "Plain";

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
  // finalLayer.image(baseLayer, 0, 0);
  // petal.loadPixels();
  // finalLayer.loadPixels();
  // for (let i = 3; i < petal.pixels.length; i += 4) {
  //   if (finalLayer.pixels[i] == 0) continue;
  //   finalLayer.pixels[i] = petal.pixels[i];
  // }
  // finalLayer.updatePixels();
starfishMask.clear(); // Start with a fully transparent canvas

// 1. Draw your petals first
for (let i = 0; i < 5; i++) {
  starfishMask.push();
  starfishMask.translate(starfishMask.width / 2, starfishMask.height / 2);
  starfishMask.rotate(radians(72 * i));
  starfishMask.image(petal, -starfishMask.width / 8, -starfishMask.width / 2, starfishMask.width / 4, starfishMask.width / 2);
  starfishMask.pop();
}

// 2. Manipulate the Alpha Channel
starfishMask.loadPixels();

for (let i = 0; i < starfishMask.pixels.length; i += 4) {
  // We target the Alpha channel (index i + 3)
  let alphaIndex = i + 3;
  let currentAlpha = starfishMask.pixels[alphaIndex];

  // Invert it: 255 becomes 0, 0 becomes 255
  starfishMask.pixels[alphaIndex] = 255 - currentAlpha;

  // Optional: Set the RGB to a solid color so the mask is visible
  starfishMask.pixels[i] = 36;     // R
  starfishMask.pixels[i + 1] = 32; // G
  starfishMask.pixels[i + 2] = 79; // B
}

starfishMask.updatePixels();

  finalLayer.image(baseLayer, 0, 0);
  petal.loadPixels();
 
  finalLayer.loadPixels();
  // let end;
  //   if (slider.value() == 0) {
  //   end=0.755;
  // } else if (slider.value() == 1) {
  //   end=0.71;
  // } else {
  //   end=0.67;
  // }
  for (let i = 3; i < petal.pixels.length; i += 4) {
   // starfishMask.pixels[i] = 255 - petal.pixels[i];

    // if (i>petal.pixels.length*end)
    // starfishMask.pixels[i] =0;

    if (finalLayer.pixels[i] == 0) continue;
    if (petal.pixels[i]==0)
    finalLayer.pixels[i] =0;
    
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
  // garibaldiMask.clear();
  // garibaldiMask.background("#24204f");
  // garibaldifinalLayer.image(garibaldibaseLayer, 0, 0);
  // garibaldi.loadPixels();
  // garibaldiMask.loadPixels();
  // garibaldifinalLayer.loadPixels();
  // for (let i = 3; i < garibaldi.pixels.length; i += 4) {
  //   garibaldiMask.pixels[i] = 255 - garibaldi.pixels[i];
  //   if (garibaldifinalLayer.pixels[i] == 0) continue;
  //   garibaldifinalLayer.pixels[i] = garibaldi.pixels[i];
    
  // }
  // garibaldifinalLayer.updatePixels();
  // garibaldiMask.updatePixels();

  garibaldiMask.clear();
  garibaldiMask.background("#24204f");
  garibaldifinalLayer.image(garibaldibaseLayer, 0, 0);
  garibaldi.loadPixels();
  garibaldiMask.loadPixels();
  garibaldifinalLayer.loadPixels();
  for (let i = 3; i < garibaldi.pixels.length; i += 4) {
    garibaldiMask.pixels[i] = 255 - garibaldi.pixels[i];
    if (garibaldifinalLayer.pixels[i] == 0) continue;
    if (garibaldi.pixels[i]==0)
    garibaldifinalLayer.pixels[i] =0;
    
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

// function mouseReleased() {
//   if (drawing == "Starfish" && drawingStyle=="Dolphin") {
//     finalLayer.loadPixels();
//   for (let i = 3; i < petal.pixels.length; i += 4) {
//     if (finalLayer.pixels[i] == 0) continue;
//     finalLayer.pixels[i] = petal.pixels[i];
//   }
//   finalLayer.updatePixels();
// }
// }
function mouseDragged() {

  if (drawing == "Starfish") {
    if (
      mouseX < 0 ||
      mouseX >= width ||
      mouseY < 0 ||
      mouseY >= height 
      || (drawingStyle=="Starfish" && frameCount%2==0)
      || (drawingStyle=="Garibaldi" && frameCount%2==0)
    )
      return;

    let theta = atan2(mouseY - height / 2, mouseX - width / 2);
    let rad = dist(mouseX, mouseY, width / 2, height / 2)/0.7;
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

   
    let petalx = 50 + rad * cos(theta - 72 * petalNumber) * 400 / width;
    let petaly = 200 + rad * sin(theta - 72 * petalNumber) * 400 / width;


    const px = petal.get(int(petalx), int(petaly));
    const inside = px[3] > 10;
    if (!inside) return;

        if (drawingStyle=="Plain") {

              let ptheta = atan2(pmouseY - height / 2, pmouseX - width / 2);
    let prad = dist(pmouseX, pmouseY, width / 2, height / 2)/0.7;
    ptheta = (ptheta + 360) % 360
    let ppetalNumber;

    switch (true) {
      case ptheta >= 234 && ptheta < 306:
        ppetalNumber = 0;
        break;
      case ptheta >= 306 || ptheta < 18:
        ppetalNumber = 1;
        break;
      case ptheta >= 18 && ptheta < 90:
        ppetalNumber = 2;
        break;
      case ptheta >= 90 && ptheta < 162:
        ppetalNumber = 3;
        break;
      case ptheta >= 162 && ptheta < 234:
        ppetalNumber = 4;
        break;
      default:
        ppetalNumber = 0; // fallback
    }

    // Example usage:
    //let newPos = rotateAroundCenter(mouseX, mouseY, 400, 200, -72*petalNumber);

    let petalpx = 50 + prad * cos(ptheta - 72 * ppetalNumber) * 400 / width;
    let petalpy = 200 + prad * sin(ptheta - 72 * ppetalNumber) * 400 / width;

    baseLayer.stroke(bgColors[petalDraw]);
   
    let size = dist(pmouseX, pmouseY, mouseX, mouseY) * 400 / width;
    baseLayer.strokeWeight(30);
    baseLayer.line(petalx, petaly, petalpx,petalpy);
    finalLayer.stroke(bgColors[petalDraw]);
    finalLayer.strokeWeight(30);
    finalLayer.line(petalx, petaly, petalpx,petalpy);
    //  baseLayer.line(100-pmouseX, pmouseY, 100-mouseX, mouseY);
    }
    else if (drawingStyle=="Starfish") {
    baseLayer.fill(bgColors[petalDraw]);
    baseLayer.noStroke();
    let size = dist(pmouseX, pmouseY, mouseX, mouseY) * 400 / width;
    baseLayer.ellipse(petalx, petaly, size, size);
    finalLayer.fill(bgColors[petalDraw]);
    finalLayer.noStroke();
    finalLayer.ellipse(petalx, petaly, size, size);
    //  baseLayer.line(100-pmouseX, pmouseY, 100-mouseX, mouseY);
    } else if (drawingStyle=="Garibaldi") {

          let x = petalx;
    let y = petaly;
    baseLayer.fill(bgColors[petalDraw]);
    baseLayer.noStroke();
    let size = dist(pmouseX, pmouseY, mouseX, mouseY) * 400 / width;
    //garibaldibaseLayer.ellipse(x, y, size, size);
     innerGlowEllipse(baseLayer,x, y, size, size, bgColors[petalDraw]);
    finalLayer.fill(bgColors[petalDraw]);
    finalLayer.noStroke();
    //garibaldifinalLayer.ellipse(x, y, size, size);
    innerGlowEllipse(finalLayer,x, y, size, size, bgColors[petalDraw]);

    } else if (drawingStyle=="Dolphin") {

    let x = petalx;
    let y = petaly;
    baseLayer.fill(bgColors[petalDraw]);
    baseLayer.noStroke();
    let size = dist(pmouseX, pmouseY, mouseX, mouseY) * 400 / width;
    //garibaldibaseLayer.ellipse(x, y, size, size);
     diffusedEllipse(baseLayer,x, y, size, size, bgColors[petalDraw]);
    finalLayer.fill(bgColors[petalDraw]);
    finalLayer.noStroke();
    //garibaldifinalLayer.ellipse(x, y, size, size);
    diffusedEllipse(finalLayer,x, y, size, size, bgColors[petalDraw]);

    if (rad < petal.height/3) {
           diffusedEllipse(baseLayer,petal.width-x, y, size, size, bgColors[petalDraw]);
        diffusedEllipse(finalLayer,petal.width-x, y, size, size, bgColors[petalDraw]);

    }
    }
  }

  else if (drawing == "Garibaldi") {
    if (
      mouseX < 0 ||
      mouseX >= width ||
      mouseY < 0 ||
      mouseY >= height 
            || (drawingStyle=="Starfish" && frameCount%2==0)
      || (drawingStyle=="Garibaldi" && frameCount%2==0)

    )
      return;

    let x = mouseX / width * garibaldi.width;
    let y = mouseY / height * garibaldi.height;
    const px = garibaldi.get(int(x), int(y));
    const inside = px[3] > 10;
    if (!inside) return;

    if (drawingStyle == "Plain") {
      garibaldibaseLayer.stroke(bgColors[petalDraw]);
    garibaldibaseLayer.strokeWeight(30);
    garibaldibaseLayer.line(x, y, pmouseX / width * garibaldi.width,pmouseY / height * garibaldi.height);
    garibaldifinalLayer.stroke(bgColors[petalDraw]);
    garibaldifinalLayer.strokeWeight(30);
    garibaldifinalLayer.line(x, y, pmouseX / width * garibaldi.width,pmouseY / height * garibaldi.height);

   
    } else  if (drawingStyle == "Starfish") {

         garibaldibaseLayer.fill(bgColors[petalDraw]);
    garibaldibaseLayer.noStroke();
    let size = dist(pmouseX, pmouseY, mouseX, mouseY) * 400 / width;
    garibaldibaseLayer.ellipse(x, y, size, size);
    garibaldifinalLayer.fill(bgColors[petalDraw]);
    garibaldifinalLayer.noStroke();
    garibaldifinalLayer.ellipse(x, y, size, size);
   

    } else if (drawingStyle == "Garibaldi") {
   garibaldibaseLayer.fill(bgColors[petalDraw]);
    garibaldibaseLayer.noStroke();
    let size = dist(pmouseX, pmouseY, mouseX, mouseY) * 400 / width;
    //garibaldibaseLayer.ellipse(x, y, size, size);
     innerGlowEllipse(garibaldibaseLayer,x, y, size, size, bgColors[petalDraw]);
    garibaldifinalLayer.fill(bgColors[petalDraw]);
    garibaldifinalLayer.noStroke();
    //garibaldifinalLayer.ellipse(x, y, size, size);
    innerGlowEllipse(garibaldifinalLayer,x, y, size, size, bgColors[petalDraw]);

    } else  if (drawingStyle == "Dolphin") {

       garibaldibaseLayer.fill(bgColors[petalDraw]);
    garibaldibaseLayer.noStroke();
    let size = dist(pmouseX, pmouseY, mouseX, mouseY) * 400 / width;
    //garibaldibaseLayer.ellipse(x, y, size, size);
     diffusedEllipse(garibaldibaseLayer,x, y, size, size, bgColors[petalDraw]);
    garibaldifinalLayer.fill(bgColors[petalDraw]);
    garibaldifinalLayer.noStroke();
    //garibaldifinalLayer.ellipse(x, y, size, size);
    diffusedEllipse(garibaldifinalLayer,x, y, size, size, bgColors[petalDraw]);

    }
 
    //  baseLayer.line(100-pmouseX, pmouseY, 100-mouseX, mouseY);

  }

    else if (drawing == "Dolphin") {
    if (
      mouseX < 0 ||
      mouseX >= width ||
      mouseY < 0 ||
      mouseY >= height 
            || (drawingStyle=="Starfish" && frameCount%2==0)
      || (drawingStyle=="Garibaldi" && frameCount%2==0)
    )
      return;

    let x = mouseX / width * dolphin.width;
    let y = mouseY / height * dolphin.height;
    const px = dolphin.get(int(x), int(y));
    const inside = px[3] > 10;
    if (!inside) return;


  //   dolphinbaseLayer.fill(bgColors[petalDraw]);
  //   dolphinbaseLayer.noStroke();
  //   let size = dist(pmouseX, pmouseY, mouseX, mouseY) * 400 / width;
  //  // dolphinbaseLayer.ellipse(x, y, size, size);
  //       diffusedEllipse(dolphinbaseLayer, x, y, size, size, bgColors[petalDraw]);

  //   dolphinfinalLayer.fill(bgColors[petalDraw]);
  //   dolphinfinalLayer.noStroke();
  //  // dolphinfinalLayer.ellipse(x, y, size, size);
  //       diffusedEllipse(dolphinfinalLayer, x, y, size, size, bgColors[petalDraw]);

  //   //  baseLayer.line(100-pmouseX, pmouseY, 100-mouseX, mouseY);


    if (drawingStyle == "Plain") {
      dolphinbaseLayer.stroke(bgColors[petalDraw]);
    dolphinbaseLayer.strokeWeight(30);
    dolphinbaseLayer.line(x, y, pmouseX / width * dolphin.width,pmouseY / height * dolphin.height);
    dolphinfinalLayer.stroke(bgColors[petalDraw]);
    dolphinfinalLayer.strokeWeight(30);
    dolphinfinalLayer.line(x, y, pmouseX / width * dolphin.width,pmouseY / height * dolphin.height);

   
    } else  if (drawingStyle == "Starfish") {

         dolphinbaseLayer.fill(bgColors[petalDraw]);
    dolphinbaseLayer.noStroke();
    let size = dist(pmouseX, pmouseY, mouseX, mouseY) * 400 / width;
    dolphinbaseLayer.ellipse(x, y, size, size);
    dolphinfinalLayer.fill(bgColors[petalDraw]);
    dolphinfinalLayer.noStroke();
    dolphinfinalLayer.ellipse(x, y, size, size);
   

    } else if (drawingStyle == "Garibaldi") {
   dolphinbaseLayer.fill(bgColors[petalDraw]);
    dolphinbaseLayer.noStroke();
    let size = dist(pmouseX, pmouseY, mouseX, mouseY) * 400 / width;
    //dolphinbaseLayer.ellipse(x, y, size, size);
     innerGlowEllipse(dolphinbaseLayer,x, y, size, size, bgColors[petalDraw]);
    dolphinfinalLayer.fill(bgColors[petalDraw]);
    dolphinfinalLayer.noStroke();
    //dolphinfinalLayer.ellipse(x, y, size, size);
    innerGlowEllipse(dolphinfinalLayer,x, y, size, size, bgColors[petalDraw]);

    } else  if (drawingStyle == "Dolphin") {

       dolphinbaseLayer.fill(bgColors[petalDraw]);
    dolphinbaseLayer.noStroke();
    let size = dist(pmouseX, pmouseY, mouseX, mouseY) * 400 / width;
    //dolphinbaseLayer.ellipse(x, y, size, size);
     diffusedEllipse(dolphinbaseLayer,x, y, size, size, bgColors[petalDraw]);
    dolphinfinalLayer.fill(bgColors[petalDraw]);
    dolphinfinalLayer.noStroke();
    //dolphinfinalLayer.ellipse(x, y, size, size);
    diffusedEllipse(dolphinfinalLayer,x, y, size, size, bgColors[petalDraw]);

    }
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

   //console.log(col,white);
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
      y = map(submittedFrame, 200, 100, 0, height*1/32);
      s = map(submittedFrame, 200, 0, 1, 0.5);
      s1 = map(submittedFrame, 200, 0, 1, 0.5);
    } else {
      x = map(submittedFrame, 100, 1, 0, width*7/8, true);
      y = map(submittedFrame, 100, 1, height*1/32, height*1/32, true);
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
      y = map(submittedFrame, 200, 100, 0, height*1/32);
      s = map(submittedFrame, 200, 0, 1, 0.5);
      s1 = map(submittedFrame, 200, 0, 1, 0.5);
    } else {
      x = map(submittedFrame, 100, 1, 0, width*7/8, true);
      y = map(submittedFrame, 100, 1, height*1/32, height*1/32, true);
      s = map(submittedFrame, 100, 1, -0.4, -0.22, true);
      s1 = map(submittedFrame, 100,1, 0.4, 0.22, true);

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
      image(petal, -width / 8*0.7, -width / 2*0.7, width / 4*0.7, width / 2*0.7);
      image(finalLayer, -width / 8*0.7, -width / 2*0.7, width / 4*0.7, width / 2*0.7);

      pop();
    }

         image(starfishMask, width*0.15, width*0.15, width*0.7, height*0.7);

    for (let i = 0; i < 5; i++) {
      push();
      let x = map(submittedFrame, 200, 0, width / 2, width * 0.8);
      let y = map(submittedFrame, 200, 0, width / 2, height * 0.2);
      let s = map(submittedFrame, 200, 0, 0.7, 0.2);
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
    backgroundButtons[i].style("border", "3px solid #24204f"); // default
  }

  backgroundButtons[petalFill].style("border", "3px solid white");

  for (let i = 0; i < drawingButtons.length; i++) {
    drawingButtons[i].style("border", "3px solid #24204f"); // default
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

       drawingButton1.style("border","3px solid transparent");
        drawingButton2.style("border","3px solid transparent")
         drawingButton3.style("border","3px solid transparent")
          drawingButton4.style("border","3px solid transparent")
if (drawingStyle=="Garibaldi") {
   drawingButton3.style("border","3px solid white")
} else if (drawingStyle=="Dolphin") {
   drawingButton4.style("border","3px solid white")
}   else if (drawingStyle=="Starfish") {
   drawingButton2.style("border","3px solid white")
}   else {
   drawingButton1.style("border","3px solid white")
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

      finalLayer.loadPixels();
      petal.loadPixels();

  // let end;
  //   if (slider.value() == 0) {
  //   end=0.755;
  // } else if (slider.value() == 1) {
  //   end=0.71;
  // } else {
  //   end=0.67;
  // }
  for (let i = 3; i < petal.pixels.length; i += 4) {
   // starfishMask.pixels[i] = 255 - petal.pixels[i];

    // if (i>petal.pixels.length*end)
    // starfishMask.pixels[i] =0;

    if (petal.pixels[i]==0)
    finalLayer.pixels[i] =0;
    
  }
  finalLayer.updatePixels();

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
   // starfishDB.push(data);
    socket.emit('starfish',data);

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
    //garibaldiDB.push(data);
    socket.emit('garibaldi',data);

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
    //dolphinDB.push(data);
    socket.emit('dolphin',data);

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
  submitButton.elt.innerHTML = "Share Your Sea Star";
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
