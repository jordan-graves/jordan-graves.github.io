let context, lfo, lfoGain, oscillator, vcaLfo, vcaLfoGain, vca, analyser, speed;
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  console.log("dragging");
}

function drop1(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  //console.log(data);
  if (ev.target.tagName == "IMG") {
    console.log(ev.target.parentNode.id);
    ev.target.src = document.getElementById(data).src;
    ev.target.id = data;
    if (data == "gearVoltage") {
      ev.target.parentNode.classList.add("forwards");
      //  console.log(ev.target.parentNode.id);
    } else {
      ev.target.parentNode.classList.remove("forwards");

    }
  } else {
    console.log(ev.target.id);
    let img = createImg(document.getElementById(data).src);
    img.elt.draggable = "true";
    img.elt.id = data;
    img.elt.addEventListener("dragstart", function (event) {
      drag(event);
    });
    ev.target.appendChild(img.elt);
    if (data == "gearVoltage") {
      ev.target.classList.add("forwards");
      console.log(ev.target.id);
    }

  }

  setAllAngles();

}
let gearRows = [];
let gears = [];

function setAllAngles() {
  gearRows = [0, 0, 0, 0, 0, 0, 0, 0,0,0];
  gears = [[0, 0, 0, 0, 0, 0, 0, 0,0,0], [0, 0, 0, 0, 0, 0, 0, 0,0,0], [0, 0, 0, 0, 0, 0, 0, 0,0,0], [0, 0, 0, 0, 0, 0, 0, 0,0,0],
  [0, 0, 0, 0, 0, 0, 0, 0,0,0], [0, 0, 0, 0, 0, 0, 0, 0,0,0], [0, 0, 0, 0, 0, 0, 0, 0,0,0], [0, 0, 0, 0, 0, 0, 0, 0,0,0],[0, 0, 0, 0, 0, 0, 0, 0,0,0], [0, 0, 0, 0, 0, 0, 0, 0,0,0]];
  console.log(gears);
  for (let i = 0; i < document.getElementsByClassName("geardrops").length; i++) {
    if (document.getElementsByClassName("geardrops")[i].children.length > 0) {
      //console.log("Gear at:"+document.getElementsByClassName("geardrops")[i].id);
      if (document.getElementsByClassName("geardrops")[i].children[0].id == "gearVoltage") {
        setAngle(document.getElementsByClassName("geardrops")[i], "forwards");
      }
    }
  }
}

function getAngle(gear) {
    //Calcultating Angle from:
  //https://css-tricks.com/get-value-of-css-rotation-through-javascript/

  let el = gear.children[0];
  //console.log(el);
  let st = window.getComputedStyle(el, null);
  //console.log(st);
  let tr = st.getPropertyValue("transform");

  var values = tr.split('(')[1].split(')')[0].split(',');
  var a = values[0];
  var b = values[1];
  var c = values[2];
  var d = values[3];
  //return (Math.atan2(b, a) * (180 / Math.PI));
  return (Math.acos(a) * (180 / Math.PI));

}

function setAngle(gear, direction) {

  let row = int(gear.id.substring(2, 3));
  let column = int(gear.id.substring(3, 4));
  gears[row][column]=1;
  console.log("gd" + row + "" + int(column));
  if (row % 2 == 1) {
    if (document.getElementById("gd" + row + "" + int(column + 1)).children.length > 0 && gears[row][column + 1] == 0) {
      //right

      document.getElementById("gd" + int(row) + int(column + 1)).children[0].style.transform = "rotate(" + (getAngle(gear) + 13.5) + "deg)";
      gears[row][column + 1] = 1;
      if (direction == "forwards") {
        document.getElementById("gd" + int(row) + int(column + 1)).classList.add("backwards");
        setAngle(document.getElementById("gd" + int(row) + int(column + 1)), "backwards");
      } else {
        document.getElementById("gd" + int(row) + int(column + 1)).classList.add("forwards");
        setAngle(document.getElementById("gd" + int(row) + int(column + 1)), "forwards");
      }

    }
    if (document.getElementById("gd" + int(row) + "" +int(column - 1)).children.length > 0 && gears[row][column - 1] == 0) {
      //left

      document.getElementById("gd" + int(row) + int(column - 1)).children[0].style.transform = "rotate(" + (getAngle(gear) + 13.5) + "deg)";
      gears[row][column - 1] = 1;
      if (direction == "forwards") {
        document.getElementById("gd" + int(row) + int(column - 1)).classList.add("backwards");
        setAngle(document.getElementById("gd" + int(row) + int(column - 1)), "backwards");

      } else {
        document.getElementById("gd" + int(row) + int(column - 1)).classList.add("forwards");
        setAngle(document.getElementById("gd" + int(row) + int(column - 1)), "forwards");

      }
    }
    if (document.getElementById("gd" + int(row - 1) + "" +int(column - 1)).children.length > 0 && gears[row - 1][column - 1] == 0) {
      //top left

      document.getElementById("gd" + int(row - 1) + int(column - 1)).children[0].style.transform = "rotate(" + (getAngle(gear) + 7.5) + "deg)";
      gears[row - 1][column - 1] = 1;
      if (direction == "forwards") {
        document.getElementById("gd" + int(row - 1) + int(column - 1)).classList.add("backwards");
        setAngle(document.getElementById("gd" + int(row - 1) + int(column - 1)), "backwards");
      } else {
        document.getElementById("gd" + int(row - 1) + int(column - 1)).classList.add("forwards");
        setAngle(document.getElementById("gd" + int(row - 1) + int(column - 1)), "forwards");

      }
    }
    if (document.getElementById("gd" + int(row - 1) + "" +int(column )).children.length > 0 && gears[row - 1][column] == 0) {
      //top right

      document.getElementById("gd" + int(row - 1) + int(column )).children[0].style.transform = "rotate(" + (getAngle(gear) + 7.5) + "deg)";
      gears[row - 1][column ] = 1;
      if (direction == "forwards") {
        document.getElementById("gd" + int(row - 1) + int(column )).classList.add("backwards");
        setAngle(document.getElementById("gd" + int(row - 1) + int(column )), "backwards");
      } else {
        document.getElementById("gd" + int(row - 1) + int(column )).classList.add("forwards");
        setAngle(document.getElementById("gd" + int(row - 1) + int(column )), "forwards");

      }

    }
    if (document.getElementById("gd" + int(row + 1) + "" +int(column - 1)).children.length > 0 && gears[row + 1][column - 1] == 0) {
      //bottom left

      document.getElementById("gd" + int(row + 1) + int(column - 1)).children[0].style.transform = "rotate(" + (getAngle(gear) + 1.5) + "deg)";
      gears[row + 1][column - 1] = 1;
      if (direction == "forwards") {
        document.getElementById("gd" + int(row + 1) + int(column - 1)).classList.add("backwards");
        setAngle(document.getElementById("gd" + int(row + 1) + int(column - 1)), "backwards");
      } else {
        document.getElementById("gd" + int(row + 1) + int(column - 1)).classList.add("forwards");
        setAngle(document.getElementById("gd" + int(row + 1) + int(column - 1)), "forwards");

      }
    }
    if (document.getElementById("gd" + int(row + 1) + "" +int(column )).children.length > 0 && gears[row + 1][column] == 0) {
      //bottom right

      document.getElementById("gd" + int(row + 1) + int(column )).children[0].style.transform = "rotate(" + (getAngle(gear) + 8) + "deg)";
      gears[row + 1][column ] = 1;
      if (direction == "forwards") {
        document.getElementById("gd" + int(row + 1) + int(column )).classList.add("backwards");
        setAngle(document.getElementById("gd" + int(row + 1) + int(column )), "backwards");
      } else {
        document.getElementById("gd" + int(row + 1) + int(column )).classList.add("forwards");
        setAngle(document.getElementById("gd" + int(row + 1) + int(column )), "forwards");

      }
    }
  } else {
      if (document.getElementById("gd" + row + "" + int(column + 1)).children.length > 0 && gears[row][column + 1] == 0) {
      //right

      document.getElementById("gd" + int(row) + int(column + 1)).children[0].style.transform = "rotate(" + (getAngle(gear) + 13.5) + "deg)";
      gears[row][column + 1] = 1;
      if (direction == "forwards") {
        document.getElementById("gd" + int(row) + int(column + 1)).classList.add("backwards");
        setAngle(document.getElementById("gd" + int(row) + int(column + 1)), "backwards");
      } else {
        document.getElementById("gd" + int(row) + int(column + 1)).classList.add("forwards");
        setAngle(document.getElementById("gd" + int(row) + int(column + 1)), "forwards");
      }

    }
    if (document.getElementById("gd" + row + "" +int(column - 1)).children.length > 0 && gears[row][column - 1] == 0) {
      //left

      document.getElementById("gd" + int(row) + int(column - 1)).children[0].style.transform = "rotate(" + (getAngle(gear) + 13.5) + "deg)";
      gears[row][column - 1] = 1;
      if (direction == "forwards") {
        document.getElementById("gd" + int(row) + int(column - 1)).classList.add("backwards");
        setAngle(document.getElementById("gd" + int(row) + int(column - 1)), "backwards");

      } else {
        document.getElementById("gd" + int(row) + int(column - 1)).classList.add("forwards");
        setAngle(document.getElementById("gd" + int(row) + int(column - 1)), "forwards");

      }
    }
    if (document.getElementById("gd" + int(row - 1) + "" +int(column + 1)).children.length > 0 && gears[row - 1][column + 1] == 0) {
      //top right

      document.getElementById("gd" + int(row - 1) + int(column + 1)).children[0].style.transform = "rotate(" + (getAngle(gear) + 7.5) + "deg)";
      gears[row - 1][column + 1] = 1;
      if (direction == "forwards") {
        document.getElementById("gd" + int(row - 1) + int(column + 1)).classList.add("backwards");
        setAngle(document.getElementById("gd" + int(row - 1) + int(column + 1)), "backwards");
      } else {
        document.getElementById("gd" + int(row - 1) + int(column + 1)).classList.add("forwards");
        setAngle(document.getElementById("gd" + int(row - 1) + int(column + 1)), "forwards");

      }
    }
    if (document.getElementById("gd" + int(row - 1) + "" +int(column )).children.length > 0 && gears[row - 1][column] == 0) {
      //top left

      document.getElementById("gd" + int(row - 1) + int(column )).children[0].style.transform = "rotate(" + (getAngle(gear) + 7.5) + "deg)";
      gears[row - 1][column ] = 1;
      if (direction == "forwards") {
        document.getElementById("gd" + int(row - 1) + int(column )).classList.add("backwards");
        setAngle(document.getElementById("gd" + int(row - 1) + int(column )), "backwards");
      } else {
        document.getElementById("gd" + int(row - 1) + int(column )).classList.add("forwards");
        setAngle(document.getElementById("gd" + int(row - 1) + int(column )), "forwards");

      }

    }
    if (document.getElementById("gd" + int(row + 1) + "" +int(column + 1)).children.length > 0 && gears[row + 1][column + 1] == 0) {
      //bottom right

      document.getElementById("gd" + int(row + 1) + int(column + 1)).children[0].style.transform = "rotate(" + (getAngle(gear) + 7.5) + "deg)";
      gears[row + 1][column + 1] = 1;
      if (direction == "forwards") {
        document.getElementById("gd" + int(row + 1) + int(column + 1)).classList.add("backwards");
        setAngle(document.getElementById("gd" + int(row + 1) + int(column + 1)), "backwards");
      } else {
        document.getElementById("gd" + int(row + 1) + int(column + 1)).classList.add("forwards");
        setAngle(document.getElementById("gd" + int(row + 1) + int(column + 1)), "forwards");

      }
    }
    if (document.getElementById("gd" + int(row + 1) + "" +int(column )).children.length > 0 && gears[row + 1][column] == 0) {
      //bottom left

      document.getElementById("gd" + int(row + 1) + int(column )).children[0].style.transform = "rotate(" + (getAngle(gear) + 7.5) + "deg)";
      gears[row + 1][column ] = 1;
      if (direction == "forwards") {
        document.getElementById("gd" + int(row + 1) + int(column )).classList.add("backwards");
        setAngle(document.getElementById("gd" + int(row + 1) + int(column )), "backwards");
      } else {
        document.getElementById("gd" + int(row + 1) + int(column )).classList.add("forwards");
        setAngle(document.getElementById("gd" + int(row + 1) + int(column )), "forwards");

      }
    }
  }

  //img.parentNode.classList.add("backwards");
  //img.style.transform = "rotate("+int(angle-2)+"deg)";
}

function setup() {
  createCanvas(950, 600);

  context = new AudioContext();

  lfo = context.createOscillator();
  lfo.type = "sine";
  lfo.frequency.setValueAtTime(0.1, 0);
  lfo.start(0);

  lfoGain = context.createGain();
  lfoGain.gain.setValueAtTime(10, 0);

  oscillator = context.createOscillator();
  oscillator.frequency.setValueAtTime(50, 0);
  oscillator.type = "sine";
  oscillator.start(0);

  vca = context.createGain();
  vca.gain.setValueAtTime(1, 0);

  vcaLfo = context.createOscillator();
  vcaLfo.type = "sine";
  vcaLfo.frequency.setValueAtTime(0.1, 0);
  vcaLfo.start(0);

  vcaLfoGain = context.createGain();
  vcaLfoGain.gain.setValueAtTime(1, 0);

  lfo.connect(lfoGain);
  lfoGain.connect(oscillator.frequency);

  vcaLfo.connect(vca.gain);
  vcaLfoGain.connect(vca.gain);

  oscillator.connect(vca);

  /*
  let oscillator1 = context.createOscillator();
  oscillator1.frequency.setValueAtTime(120, 0);
  oscillator1.type = "square";
  oscillator1.start(0);
  oscillator1.connect(vca);
*/

  vca.connect(context.destination);

  analyser = context.createAnalyser();
  vca.connect(analyser);
  frameRate(60);
  speed = 0;

  strokeJoin(ROUND);
  let frequencies = [0.1, 1, 10, 20];
  let shapes = ["sine", "square", "sawtooth", "triangle"];
  for (let k = 0; k < 4; k++) {
    for (let j = 0; j < 4; j++) {
      let i = createGraphics(200, 200);
      drawOscillatorGear(
        0,
        shapes[k],
        frequencies[j], true, i
      );

      let img = createImg(i.elt.toDataURL());
      img.parent("gearImagesLFO");
      img.elt.draggable = "true";
      img.elt.id = "gear" + j + "_" + k;
      img.elt.addEventListener("dragstart", function (event) {
        drag(event);
      });
    }
  }

  frequencies = [50, 100, 300, 500];
  shapes = ["sine", "square", "sawtooth", "triangle"];
  for (let k = 0; k < 4; k++) {
    for (let j = 0; j < 4; j++) {
      let i = createGraphics(200, 200);
      drawOscillatorGear(
        0,
        shapes[k],
        frequencies[j], false, i
      );

      let img = createImg(i.elt.toDataURL());
      img.parent("gearImagesOsc");
      img.elt.draggable = "true";
      img.elt.id = "gear" + j + "_" + k;
      img.elt.addEventListener("dragstart", function (event) {
        drag(event);
      });
    }
  }
  let gains = [10, 50, 100, 300];

  for (let j = 0; j < 4; j++) {
    let i = createGraphics(200, 200);
    drawGainGear(
      0, gains[j], i);

    let img = createImg(i.elt.toDataURL());
    img.parent("gearImagesGain");
    img.elt.draggable = "true";
    img.elt.id = "gear" + j + "gain";
    img.elt.addEventListener("dragstart", function (event) {
      drag(event);
    });
  }

  let i = createGraphics(200, 200);
  drawGear("voltage", i);

  let img = createImg(i.elt.toDataURL());
  img.parent("gearImagesSpeakers");
  img.elt.draggable = "true";
  img.elt.id = "gearVoltage";
  img.elt.addEventListener("dragstart", function (event) {
    drag(event);
  });

  let i1 = createGraphics(200, 200);
  drawGear("speaker", i1);

  let img1 = createImg(i1.elt.toDataURL());
  img1.parent("gearImagesSpeakers");
  img1.elt.draggable = "true";
  img1.elt.id = "gearSpeaker";
  img1.elt.addEventListener("dragstart", function (event) {
    drag(event);
  });

  let i2 = createGraphics(100, 100);
  i2.fill(100);
  i2.noStroke();
  i2.ellipse(50, 50, 15, 15);
  for (let j = 0; j < document.getElementsByClassName("geardrops").length; j++) {
    //let img2 = createImg(i2.elt.toDataURL());
    document.getElementsByClassName("geardrops")[j].style.backgroundImage = "url(" + i2.elt.toDataURL() + ")";
  }
  noCanvas();
}

function draw() {
  scale(1.25);
  translate(0, 50);
  background(0);

  strokeWeight(1);
  stroke(155);
  noFill();

  speed += 36 / max(frameRate(), 0.1);
  drawOscillatorGear(
    0,
    document.getElementById("lfoType").value,
    document.getElementById("lfoFrequency").value
  );
  drawGainGear(
    1, document.getElementById("lfoGain").value);
  drawOscillatorGear(
    2,
    document.getElementById("OscType").value,
    document.getElementById("OscFrequency").value / 100
  );
  drawOscillatorGear(
    3,
    document.getElementById("vcalfoType").value,
    document.getElementById("vcalfoFrequency").value
  );

  analyser.fftSize = 2048;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Float32Array(bufferLength);
  analyser.getFloatTimeDomainData(dataArray);

  strokeWeight(3);
  // print(dataArray);
  noFill();
  stroke(0, 255, 200);
  beginShape();
  for (let i = 0; i < 1024; i++) {
    vertex((i / 1024) * width / 2, dataArray[i] * 30 + 325);
  }
  endShape();
  stroke(255, 0, 200);

  beginShape();

  for (let i = 0; i < 1024; i++) {
    let r = dataArray[i] * 40 + 40;
    vertex(
      600 + r * cos(radians((i / 1024) * 360)),
      325 + r * sin(radians((i / 1024) * 360))
    );
  }
  endShape();
  noStroke();
  fill(255);
  textSize(24);
  text("Gears (Will become drag and drop instead of drop downs)", 30, -15);
  text("Oscilloscope", 30, 250);
  //text("Radial View",530,250);
}

function changeOscType() {
  let type = document.getElementById("OscType").value;
  print(type);
  oscillator.type = type;
}

function changeOscFrequency() {
  let type = document.getElementById("OscFrequency").value;
  print(type);
  oscillator.frequency.setValueAtTime(type, 0);
}

function changeLfoType() {
  let type = document.getElementById("lfoType").value;
  print(type);
  lfo.type = type;
}

function changeLfoFrequency() {
  let type = document.getElementById("lfoFrequency").value;
  print(type);
  lfo.frequency.setValueAtTime(type, 0);
}

function changeLfoGain() {
  let type = document.getElementById("lfoGain").value;
  print(type);
  lfoGain.gain.setValueAtTime(type, 0);
}

function changeVcaLfoType() {
  let type = document.getElementById("vcalfoType").value;
  print(type);
  vcaLfo.type = type;
}

function changeVcaLfoFrequency() {
  let type = document.getElementById("vcalfoFrequency").value;
  print(type);
  vcaLfo.frequency.setValueAtTime(type, 0);
}

function changeVcaLfoGain() {
  let type = document.getElementById("vcalfoGain").value;
  print(type);
  vcaLfoGain.gain.setValueAtTime(type, 0);
}

function drawOscillatorGear(number, type, frequency, lfo, canvas) {
  if (!canvas) {
    canvas = this;
  }
  canvas.strokeJoin(ROUND);
  let f = frequency * 10;
  if (!lfo) {
    f = frequency / 10;
  }
  let R = 100;
  let R1 = R - 15;
  let teeth = 20;
  let xOff = 0;

  let gearX = 100 + number * 185;
  let gearY = 100;
  canvas.strokeWeight(1);
  canvas.fill(50);
  canvas.beginShape();
  if (number % 2 == 1) {
    speed = speed * -1;
    xOff = 13;
  }
  for (let i = 0; i < teeth; i++) {
    let x1 = gearX + R * cos(radians((i / teeth) * 360 + speed + xOff));
    let y1 = gearY + R * sin(radians((i / teeth) * 360 + speed + xOff));

    let x2 = gearX + R1 * cos(radians(((i + 0.25) / teeth) * 360 + speed + xOff));
    let y2 = gearY + R1 * sin(radians(((i + 0.25) / teeth) * 360 + speed + xOff));

    let x3 = gearX + R1 * cos(radians(((i + 0.5) / teeth) * 360 + speed + xOff));
    let y3 = gearY + R1 * sin(radians(((i + 0.5) / teeth) * 360 + speed + xOff));

    let x4 = gearX + R * cos(radians(((i + 0.75) / teeth) * 360 + speed + xOff));
    let y4 = gearY + R * sin(radians(((i + 0.75) / teeth) * 360 + speed + xOff));

    canvas.vertex(x1, y1);
    canvas.vertex(x2, y2);
    canvas.vertex(x3, y3);
    canvas.vertex(x4, y4);
  }
  canvas.endShape(CLOSE);
  canvas.fill(0);
  canvas.ellipse(100 + number * 185, 100, 30, 30);
  canvas.noFill();

  canvas.ellipse(100 + number * 185, 100, 110, 110);
  canvas.ellipse(100 + number * 185, 100, 160, 160);

  canvas.strokeWeight(1);
  canvas.stroke(255);

  if (type == "sine") {
    canvas.beginShape();
    for (let i = 0; i < 361; i += .1) {
      let r = 55 + 25 / 2 + (25 / 2) * sin(radians(i * f + 207));
      let x = gearX + r * cos(radians(i + speed + xOff));
      let y = 100 + r * sin(radians(i + speed + xOff));
      canvas.vertex(x, y);
    }
    canvas.endShape();
  } else if (type == "square") {
    canvas.beginShape();
    for (let i = 0; i < 361; i += .1) {
      let r = 55 + 25;
      if (((i * f) % 360) / 360 < 0.5) {
        r = 55;
      }

      let x = gearX + r * cos(radians(i + speed + xOff - 213));
      let y = 100 + r * sin(radians(i + speed + xOff - 213));
      canvas.vertex(x, y);
    }
    canvas.endShape();
  } else if (type == "sawtooth") {
    canvas.beginShape();

    for (let i = 0; i < 361; i += .1) {
      let r = 55 + 25 - 25 * (((i * f) % 360) / 360);
      let x = gearX + r * cos(radians(i + speed + xOff - 190));
      let y = gearY + r * sin(radians(i + speed + xOff - 190));
      canvas.vertex(x, y);
    }
    canvas.endShape();
  } else if (type == "triangle") {
    canvas.beginShape();
    for (let i = 0; i < 361; i += .1) {
      let r = 55 + 50 - 50 * (((i * f) % 360) / 360);
      if (((i * f) % 360) / 360 < 0.5) {
        r = 55 + 50 * (((i * f) % 360) / 360);
      }

      let x = gearX + r * cos(radians(i + speed + xOff - 278));
      let y = gearY + r * sin(radians(i + speed + xOff - 278));
      canvas.vertex(x, y);
    }
    canvas.endShape();
  }
  canvas.stroke(155);

  canvas.push();
  canvas.translate(gearX, gearY);
  canvas.rotate(radians(speed));
  canvas.noStroke();
  canvas.fill(255);
  canvas.textSize(16);
  canvas.textAlign(CENTER);
  canvas.text(type, 0, -25);
  canvas.pop();

  canvas.push();
  canvas.translate(gearX, gearY);
  canvas.rotate(radians(speed + 180));
  canvas.noStroke();
  canvas.fill(255);
  canvas.textSize(16);
  canvas.textAlign(CENTER);
  canvas.text(frequency + " Hz", 0, -25);
  canvas.pop();

  if (number % 2 == 1) {
    speed = speed * -1;
  }
}

function drawGainGear(number, gain, canvas) {
  if (!canvas) {
    canvas = this;
  }
  canvas.strokeJoin(ROUND);
  let R = 100;
  let R1 = R - 15;
  let teeth = 20;
  let xOff = 0;

  let gearX = 100 + number * 185;
  let gearY = 100;
  canvas.strokeWeight(1);
  canvas.fill(50);
  canvas.beginShape();
  if (number % 2 == 1) {
    speed = speed * -1;
    xOff = 13;
  }
  for (let i = 0; i < teeth; i++) {
    let x1 = gearX + R * cos(radians((i / teeth) * 360 + speed + xOff));
    let y1 = gearY + R * sin(radians((i / teeth) * 360 + speed + xOff));

    let x2 = gearX + R1 * cos(radians(((i + 0.25) / teeth) * 360 + speed + xOff));
    let y2 = gearY + R1 * sin(radians(((i + 0.25) / teeth) * 360 + speed + xOff));

    let x3 = gearX + R1 * cos(radians(((i + 0.5) / teeth) * 360 + speed + xOff));
    let y3 = gearY + R1 * sin(radians(((i + 0.5) / teeth) * 360 + speed + xOff));

    let x4 = gearX + R * cos(radians(((i + 0.75) / teeth) * 360 + speed + xOff));
    let y4 = gearY + R * sin(radians(((i + 0.75) / teeth) * 360 + speed + xOff));

    canvas.vertex(x1, y1);
    canvas.vertex(x2, y2);
    canvas.vertex(x3, y3);
    canvas.vertex(x4, y4);
  }
  canvas.endShape(CLOSE);
  canvas.fill(0);
  canvas.ellipse(100 + number * 185, 100, 30, 30);
  canvas.noFill();
  canvas.strokeWeight(3);
  let r = map(gain, 0, 300, 30, 160);
  canvas.stroke(255);
  canvas.ellipse(100 + number * 185, 100, r, r);
  canvas.stroke(155);
  canvas.push();
  canvas.translate(gearX, gearY);
  canvas.rotate(radians(speed));
  canvas.noStroke();
  canvas.fill(255);
  canvas.textSize(16);
  canvas.textAlign(CENTER);
  canvas.text("Gain: " + gain, 0, -50);
  canvas.pop();

  if (number % 2 == 1) {
    speed = speed * -1;
  }
}

function drawGear(type, canvas) {
  if (!canvas) {
    canvas = this;
  }
  canvas.strokeJoin(ROUND);
  let R = 100;
  let R1 = R - 15;
  let teeth = 20;
  let xOff = 0;

  let gearX = 100;
  let gearY = 100;
  canvas.strokeWeight(1);
  canvas.fill(50);
  canvas.beginShape();
  for (let i = 0; i < teeth; i++) {
    let x1 = gearX + R * cos(radians((i / teeth) * 360 + speed + xOff));
    let y1 = gearY + R * sin(radians((i / teeth) * 360 + speed + xOff));

    let x2 = gearX + R1 * cos(radians(((i + 0.25) / teeth) * 360 + speed + xOff));
    let y2 = gearY + R1 * sin(radians(((i + 0.25) / teeth) * 360 + speed + xOff));

    let x3 = gearX + R1 * cos(radians(((i + 0.5) / teeth) * 360 + speed + xOff));
    let y3 = gearY + R1 * sin(radians(((i + 0.5) / teeth) * 360 + speed + xOff));

    let x4 = gearX + R * cos(radians(((i + 0.75) / teeth) * 360 + speed + xOff));
    let y4 = gearY + R * sin(radians(((i + 0.75) / teeth) * 360 + speed + xOff));

    canvas.vertex(x1, y1);
    canvas.vertex(x2, y2);
    canvas.vertex(x3, y3);
    canvas.vertex(x4, y4);
  }
  canvas.endShape(CLOSE);
  canvas.fill(0);
  canvas.ellipse(100, 100, 30, 30);
  canvas.noFill();
  canvas.strokeWeight(3);
  canvas.stroke(155);
  canvas.push();
  canvas.translate(gearX, gearY);
  canvas.rotate(radians(speed));
  canvas.noStroke();
  canvas.fill(255);
  canvas.textSize(16);
  canvas.textAlign(CENTER);
  if (type == "voltage")
    canvas.text("POWER\nSUPPLY", 0, -50);
  if (type == "speaker")
    canvas.text("SPEAKER", 0, -50);
  canvas.pop();

}