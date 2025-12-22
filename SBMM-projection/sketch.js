p5.disableFriendlyErrors = true;
const firebaseConfig = {
  apiKey: "AIzaSyBSbbatfziELhgfcB8appKUuzNj24p9IDs",
  authDomain: "sbmm-ca63f.firebaseapp.com",
  projectId: "sbmm-ca63f",
  storageBucket: "sbmm-ca63f.firebasestorage.app",
  messagingSenderId: "895937742811",
  appId: "1:895937742811:web:e6941e95e4c92837d709fe",
  measurementId: "G-F62BNSZ0M8",
};

let allStarfish = [];
let starfish;
let myStarfish = [];
let loaded = false;


let allDolphin = [];
let dolphin;
let myDolphin = [];
let dolphinLoaded = false;

let allGaribaldi = [];
let garibaldi;
let myGaribaldi = [];
let garibaldiLoaded = false;

let bg, bg1, bg2;
let positionsX = [
  40, 84, 53, 100, 57, 137, 99, 47, 156, 112, 64, 125, 175, 181, 121, 57, 790, 770, 826, 873, 840, 778, 745, 819, 909, 892, 858, 789, 749, 828, 903, 531, 490, 470, 416, 369, 46, 111, 64, 127, 48, 780, 804, 838, 869, 901, 912, 928, 852, 180,
];
let positionsY = [
  46, 64, 91, 116, 140, 162, 173, 185, 206, 218, 241, 269, 264, 315, 301, 304, 111, 166, 160, 155, 202, 213, 263, 248, 195, 244, 278, 298, 335, 322, 309, 394, 345, 381, 371, 368, 414, 422, 460, 480, 508, 496, 440, 478, 427, 503, 454, 402, 521, 500,
];
let taken = [];
let totalDolphin = 0;
let font;

let k;
let k1;
let k2;
let k3;

let whale = [];
let whaleImg;

let flock;
let divers;
let diver = [];

let diverAssets = [];
let fishSounds= [];
let backgroundSound;
let mute = false;

function preload() {
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();
  starfish = database.ref("starfish");
  starfish.on("value", gotData);
  dolphin = database.ref("dolphin");
  dolphin.on("value", gotDolphinData);
  garibaldi = database.ref("garibaldi");
  garibaldi.on("value", gotGaribaldiData);
  bg = loadImage("SBMM Background-02.png");
  bg1 = loadImage("SBMM Midground-02.png");
  bg2 = loadImage("SBMM Foreground-02.png");
  font = loadFont("DynaPuff-Regular.ttf");
  whaleImg = loadImage("whale.png");


  for (let i = 0; i < 12; i++) {
    diverAssets[i] = loadImage("2x/Asset " + (i + 79) + ".png");
  }

  let songNumber=int(getParameterByName("song"));

if (!mute) {
	if (songNumber==1) {
		backgroundSound=loadSound("background.mp3");
	}
}
  fishSounds=[new Audio('sound1.mp3'),new Audio('sound2.mp3'),new Audio('sound3.mp3'),new Audio('sound4.mp3'),
new Audio('sound5.mp3'),new Audio('sound6.mp3'),new Audio('sound7.mp3')]

}

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	  results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  for (let i = 0; i < positionsX.length; i++) {
    taken[i] = false;
  }
  textFont(font);

  k = new Stalk(100, 715, 340);
  k1 = new Stalk(300, 730, 500 - 50);
  k2 = new Stalk(200, 745, 600 - 50);
  k3 = new Stalk(500, 900, 1700);

  flock = new Flock();

  // Add an initial set of boids into the system
  for (let i = 0; i < 50; i++) {
    let b = new Boid(0, 200);
    flock.addBoid(b);
  }

  divers = createGraphics(800, 800);

  	if (backgroundSound && !backgroundSound.isPlaying() &&!mute) {
		backgroundSound.loop();
		backgroundSound.setVolume(0.5);
	}
}

function draw() {
  noStroke();
  translate(-width / 2, -height / 2);
  scale(width / (1920 / 2))
  myDolphin.sort((a, b) => a.y - b.y);
  myGaribaldi.sort((a, b) => a.y - b.y);

  if (loaded && myStarfish.length == 0) {
    for (let i = 0; i < 10; i++) {
      let a = Math.floor(random(0, positionsX.length));

      while (taken[a]) {
        a = Math.floor(random(0, positionsX.length));
      }
      let x = positionsX[a];
      let y = positionsY[a];
      taken[a] = true;
      myStarfish.push(new Starfish(a, x, y));
    }
  }
  if (whale.length < 1) {
    for (let i = 0; i < 1; i++) {

      whale.push((new Whale()));
    }
  }

  if (diver.length < 1) {
    for (let i = 0; i < 1; i++) {

      diver.push((new Diver()));
    }
  }

  if (dolphinLoaded && myDolphin.length < 3) {
    for (let i = 0; i < 1; i++) {

      myDolphin.push(new Dolphin());
    }
  }
  if (garibaldiLoaded && myGaribaldi.length < 7) {
    for (let i = 0; i < 1; i++) {

      myGaribaldi.push(new Garibaldi());
    }
  }
  background(220);
  image(bg, 0, 0, 1920 / 2, 1080 / 2);


  for (let i = 0; i < whale.length; i++) {
    whale[i].display();
    if (whale[i].x < -200 || whale[i].x > 1160) {
      whale.splice(i, 1);
      i--;
    }
  }

    flock.run();
  noStroke();
  
  //DRAWING KELP
  push();
  scale(0.5);
  k.display();
  k2.display();
  k1.display();
  pop();

  image(bg1, 0, 0, 1920 / 2, 1080 / 2);
  // push();
  // translate(960-frameCount/3,200);
  // scale(-1,1);
  // image(divers,0,0,200,200);
  // pop();



  for (let i = 0; i < myStarfish.length; i++) {
    if (myStarfish[i].a < 36) {
      myStarfish[i].display();
    }
    if (myStarfish[i].X > 1920 / 2) {
      myStarfish.splice(i, 1);
      i--;
    }
  }
  //console.log();


  for (let i = 0; i < diver.length; i++) {
    diver[i].display();
    if (diver[i].x < -200 || diver[i].x > 1160) {
      diver.splice(i, 1);
      i--;
    }
  }

  noStroke();



  for (let i = 0; i < myDolphin.length; i++) {
    myDolphin[i].display();
    // fill(0);
    //  textSize(24);
    //text(myDolphin[i].y,myDolphin[i].x,myDolphin[i].y) 
    //console.log(myDolphin[i].y);
    if (myDolphin[i].x < -200 || myDolphin[i].x > 1160) {
      myDolphin.splice(i, 1);
      i--;
    }
  }

  for (let i = 0; i < myGaribaldi.length; i++) {
    myGaribaldi[i].display();
    if (myGaribaldi[i].x < -200 || myGaribaldi[i].x > 1160) {
      myGaribaldi.splice(i, 1);
      i--;
    }
  }


  //DRAWING KELP
  push();
  scale(0.5);
  k3.display();
  pop();

  image(bg2, 0, 0, 1920 / 2, 1080 / 2);

  for (let i = 0; i < myStarfish.length; i++) {
    if (myStarfish[i].a >= 36) {
      myStarfish[i].display();
    }
  }

  fill(0);
  rect(0, 1080 / 2, 1920 / 2, height);

  // for (let i=0; i<positionsX.length; i++) {
  //   fill(255)
  //   ellipse(positionsX[i],positionsY[i],20,20);
  // }


  //background(255);
  
  //image(divers, 0, 0);

  fill(255);
  text(int(frameRate()),30,30)
}

function gotData(data) {
  let myProjects = data.val();
  // console.log(myProjects);

  // Grab the keys to iterate over the object
  let keys = Object.keys(myProjects);
  // console.log(keys);


  for (let i = allStarfish.length; i < keys.length; i++) {
    let key = keys[i];

    let thisProject = myProjects[key];
    allStarfish.push(thisProject);
  }
  if (loaded) {
    for (let i = 0; i < 3; i++) {
      let a = Math.floor(random(0, positionsX.length));
      let tries = 0;
      while (taken[a] && tries < 100) {
        a = Math.floor(random(0, positionsX.length));
        tries++;
      }
      let x = positionsX[a];
      let y = positionsY[a];
      let sf = allStarfish[allStarfish.length - 1];
      taken[a] = true;
      myStarfish.push(new Starfish(a, x, y, sf));
    }
  }
  loaded = true;
  //console.log(allStarfish);
}

function gotDolphinData(data) {
  let myProjects = data.val();
  // console.log(myProjects);

  // Grab the keys to iterate over the object
  let keys = Object.keys(myProjects);
  // console.log(keys);


  for (let i = allDolphin.length; i < keys.length; i++) {
    let key = keys[i];

    let thisProject = myProjects[key];
    allDolphin.push(thisProject);
  }
  if (dolphinLoaded) {
    for (let i = 0; i < 1; i++) {
      let sf = allDolphin[allDolphin.length - 1];
      myDolphin.push(new Dolphin(sf));
    }
  }
  dolphinLoaded = true;
  //console.log(allDolphin);
}

function gotGaribaldiData(data) {

  let myProjects = data.val();
  // console.log(myProjects);

  // Grab the keys to iterate over the object
  let keys = Object.keys(myProjects);
  // console.log(keys);


  for (let i = allGaribaldi.length; i < keys.length; i++) {
    let key = keys[i];

    let thisProject = myProjects[key];
    allGaribaldi.push(thisProject);
  }
  if (garibaldiLoaded) {
    for (let i = 0; i < 1; i++) {
      let sf = allGaribaldi[allGaribaldi.length - 1];
      myGaribaldi.push(new Garibaldi(sf));
    }
  }
  garibaldiLoaded = true;
  //console.log(allGaribaldi);
}

function mousePressed() {
  if (myStarfish.length > 30) {
    for (let i = 0; i < 3; i++) {

      let a = Math.floor(random(0, myStarfish.length));
      taken[myStarfish[a].a] = false;
      myStarfish[a].leaving = true;

    }
  }
  let sf = random(allStarfish);
  for (let i = 0; i < 3; i++) {

    let a = Math.floor(random(0, positionsX.length));

    while (taken[a]) {
      a = Math.floor(random(0, positionsX.length));
    }
    let x = positionsX[a];
    let y = positionsY[a];
    taken[a] = true;
    myStarfish.push(new Starfish(a, x, y, sf));

  }
  myDolphin.push(new Dolphin());
  for (let i = 0; i < 3; i++) {
    myGaribaldi.push(new Garibaldi());
  }

		backgroundSound.loop();
		backgroundSound.setVolume(0.25);
    console.log("play bg")
		//masterVolume(1.0, 0.05, 0);
	

  // if(!mute) {
	// 		let s = random(fishSounds);
	// 	s.volume=0.2;s.play();;
	// 	}

}

// function mousePressed() {
//   positionsX.push(int(mouseX/width*960));
//   positionsY.push(int(mouseY/width*960));
//   let a = ""
//   for (let x of positionsX) {
//     a+=x + ","
//   }
//   let b = ""
//   for (let y of positionsY) {
//     b+=y + ","
//   }
//   console.log(a)
//   console.log(b)
// }
class Starfish {
  constructor(a, x, y, sf) {

    if(!mute) {
			let s = random(fishSounds);
		s.volume=0.2;s.play();
		}

    this.fish = sf || random(allStarfish);
    this.petal = loadImage(this.fish.fish);
    this.targetX = x;
    this.targetY = y;
    this.x = this.targetX;
    this.y = random(-100, 0);
    this.size = random(0.4, 0.7);
    this.rotation = random(0, 360);
    this.easing = random(0.01, 0.02);
    this.a = a;
    this.leaving = false;
    this.arrived = false;
    //console.log(this.x,this.y);
  }
  display() {
    if (this.leaving && this.arrived) {
      this.x += this.size;
      this.y = 0.05 * dist(this.x, this.targetY, this.targetX, this.targetY) * sin(this.rotation + frameCount) + this.targetY - dist(this.x, this.targetY, this.targetX, this.targetY) / 2;
    } else {
      if (this.targetY > (this.y + 5)) {
        let d = (this.targetY - this.y) * this.easing
        d = constrain(d, 0, 1)
        this.y = this.y + d;
        this.x = 0.25 * dist(this.targetX, this.y, this.targetX, this.targetY) * sin(this.rotation + frameCount) + this.targetX;
      } else {
        this.arrived = true;
      }
    }
    let s = map(this.y, 0, height, 0.04 * this.size, 0.20 * this.size) * width / (1920 / 2);
    for (let i = 0; i < 5; i++) {
      push();

      translate(this.x, this.y);

      scale(s, s * 0.9);
      rotate(72 * i + 8 * sin(frameCount / 1.5 + i * this.rotation) + this.rotation);
      image(this.petal, -50, -200, 100, 200);
      pop();
    }
  }
}

class Dolphin {
  constructor(sf) {
    if(!mute) {
			let s = random(fishSounds);
		s.volume=0.2;s.play();;
		}
    if (Math.random() < 0.5) {
      this.fish = sf || random(allDolphin);
      this.petal = loadImage(this.fish.fish);
      this.x = random(1060, 1100);
      this.y = map(totalDolphin * 7 % 9, 0, 8, 20, 360);
      this.speed = random(-0.6, -0.4);
      this.size = map(this.y, 0, 400, 0.5, 1);
      this.direction = "left";
      totalDolphin++;
    } else {
      this.fish = sf || random(allDolphin);
      this.petal = loadImage(this.fish.fish);
      this.x = random(-150, -100);
      this.y = map(totalDolphin * 7 % 9, 0, 8, 20, 360) + 20;
      this.speed = -1 * random(-0.6, -0.4);
      this.size = map(this.y, 0, 400, 0.5, 1);
      this.direction = "right";
      totalDolphin++;
    }

  }

  display() {
    this.x += this.speed;
    if (this.direction == "left") {
      push();
      translate(this.x, this.y);
      //scale(this.size);
      texture(this.petal);
      //image(this.petal,0,0,400,400);
      let cols = 20;
      let waveAmp = 7 * this.size;
      let waveFreq = 8;
      let waveSpeed = -0.04;
      let w = 200 * this.size;
      let h = 200 * this.size;
      let dx = w / cols;

      beginShape(TRIANGLE_STRIP);

      for (let i = 0; i <= cols; i++) {
        let x = -w / 2 + i * dx;

        // sine wave displacement
        let wave =
          sin(i * waveFreq + this.x * 4.5 + this.y) * waveAmp;

        // top & bottom edges
        let yTop = -h / 2 + wave;
        let yBottom = h / 2 + wave;

        // texture coordinates
        let u = (i / cols) * this.petal.width;

        vertex(x, yTop, 0, u, 0);
        vertex(x, yBottom, 0, u, this.petal.height);
      }

      endShape();
      pop();
    } else {
      push();
      translate(this.x, this.y);

      //scale(this.size);
      texture(this.petal);
      //image(this.petal,0,0,400,400);
      let cols = 20;
      let waveAmp = 7 * this.size;
      let waveFreq = 8;
      let waveSpeed = -0.04;
      let w = -200 * this.size;
      let h = 200 * this.size;
      let dx = w / cols;

      beginShape(TRIANGLE_STRIP);

      for (let i = 0; i <= cols; i++) {
        let x = -w / 2 + i * dx;

        // sine wave displacement
        let wave =
          sin(i * waveFreq - this.x * 4.5 + this.y) * waveAmp;

        // top & bottom edges
        let yTop = -h / 2 + wave;
        let yBottom = h / 2 + wave;

        // texture coordinates
        let u = (i / cols) * this.petal.width;

        vertex(x, yTop, 0, u, 0);
        vertex(x, yBottom, 0, u, this.petal.height);
      }

      endShape();
      pop();
    }
  }

}

class Whale {
  constructor(sf) {
    if(!mute) {
			let s = random(fishSounds);
		s.volume=0.2;s.play();;
		}
    if (Math.random() < 0.5) {
      this.fish = sf || random(allDolphin);
      this.petal = whaleImg;
      this.x = random(1060, 1160);
      this.y = map(totalDolphin * 7 % 9, 0, 8, 40, 160);
      this.speed = random(-0.6, -0.4) / 2;
      this.size = map(this.y, 0, 400, 1, 2);
      this.direction = "left";
      totalDolphin++;
    } else {
      this.fish = sf || random(allDolphin);
      this.petal = whaleImg;
      this.x = random(-200, -100);
      this.y = map(totalDolphin * 7 % 9, 0, 8, 40, 160) + 20;
      this.speed = -1 * random(-0.6, -0.4) / 2;
      this.size = map(this.y, 0, 400, 1, 2);
      this.direction = "right";
      totalDolphin++;
    }

  }

  display() {
    this.x += this.speed;
    if (this.direction == "left") {
      push();
      translate(this.x, this.y);
      //scale(this.size);
      texture(this.petal);
      //image(this.petal,0,0,400,400);
      let cols = 20;
      let waveAmp = 7 * this.size;
      let waveFreq = 12;
      let waveSpeed = -0.08;
      let w = 200 * this.size;
      let h = 200 * this.size;
      let dx = w / cols;

      beginShape(TRIANGLE_STRIP);

      for (let i = 0; i <= cols; i++) {
        let x = -w / 2 + i * dx;

        // sine wave displacement
        let wave =
          sin(i * waveFreq + this.x * 4.5 + this.y) * waveAmp;

        // top & bottom edges
        let yTop = -h / 2 + wave;
        let yBottom = h / 2 + wave;

        // texture coordinates
        let u = (i / cols) * this.petal.width;

        vertex(x, yTop, 0, u, 0);
        vertex(x, yBottom, 0, u, this.petal.height);
      }

      endShape();
      pop();
    } else {
      push();
      translate(this.x, this.y);

      //scale(this.size);
      texture(this.petal);
      //image(this.petal,0,0,400,400);
      let cols = 20;
      let waveAmp = 7 * this.size;
      let waveFreq = 12;
      let waveSpeed = -0.08;
      let w = -200 * this.size;
      let h = 200 * this.size;
      let dx = w / cols;

      beginShape(TRIANGLE_STRIP);

      for (let i = 0; i <= cols; i++) {
        let x = -w / 2 + i * dx;

        // sine wave displacement
        let wave =
          sin(i * waveFreq - this.x * 4.5 + this.y) * waveAmp;

        // top & bottom edges
        let yTop = -h / 2 + wave;
        let yBottom = h / 2 + wave;

        // texture coordinates
        let u = (i / cols) * this.petal.width;

        vertex(x, yTop, 0, u, 0);
        vertex(x, yBottom, 0, u, this.petal.height);
      }

      endShape();
      pop();
    }
  }

}

class Diver {
  constructor(sf) {

    this.fish = sf || random(allDolphin);
    this.petal = divers;
    this.x = 1100;
    this.y = 300;
    this.speed = random(-0.6, -0.4) / 4;
    this.size = 1.5
    this.direction = "left";
    totalDolphin++;


  }

  display() {
    this.x += this.speed;
    push();
    translate(this.x, this.y);
    //scale(this.size);
  let diverAngle = PI/10+PI/10*sin(this.x*5);
  divers.clear();
  mouseX = 50;
  divers.fill("#040e61");
  divers.noStroke();
  divers.push();
  divers.translate(117 * 2, 114 * 2);
  divers.translate(30, 155);
  divers.rotate(diverAngle);
  divers.translate(-30, -155);
  divers.image(diverAssets[9], 0, 0) //boy  back leg
  divers.pop();

  divers.push();
  divers.translate(25 * 2, 170 * 2);
  divers.translate(80,5);
  divers.rotate(-diverAngle);
  divers.translate(-80, -5);
  divers.image(diverAssets[10], 0,0) //boy  back arm
  divers.pop();

  divers.ellipse(250,370,80,50);
  divers.image(diverAssets[8], 41 * 2, 143 * 2) //boy  body

  divers.push();
  divers.translate(73 * 2, 166 * 2);
  divers.translate(5,5);
  divers.rotate(diverAngle);
  divers.translate(-5, -5);
  divers.image(diverAssets[2], 0,0) //boy front arm
  divers.pop();

  divers.push();
  divers.translate(115 * 2, 154 * 2);
  divers.translate(20, 25);
  divers.rotate(-diverAngle);
  divers.translate(-20, -25);
  divers.image(diverAssets[7], 0, 0) //boy front leg
  divers.pop();

  divers.image(diverAssets[0], 55 * 2, 149 * 2) //boy snorkle

  divers.push();
  divers.translate(126 * 2, 250 * 2);
  divers.translate(80,5);
  divers.rotate(-diverAngle);
  divers.translate(-80, -5);
  divers.image(diverAssets[6], 0,0) //girl back arm
  divers.pop();

  divers.push();
  divers.translate(219 * 2, 179 * 2);
  divers.translate(30, 199);
  divers.rotate(diverAngle);
  divers.translate(-30, -199);
  divers.image(diverAssets[11], 0,0) //girl  back leg
  divers.pop();

    divers.ellipse(450,545,80,50);
 

  divers.push();
  divers.translate(146 * 2, 248 * 2);
  divers.translate(75,5);
  divers.rotate(diverAngle);
  divers.translate(-75, -5);
  divers.image(diverAssets[3], 0,0) //girl front arm
  divers.pop();

  divers.push();
  divers.translate(214 * 2, 262 * 2);
  divers.translate(20, 10);
  divers.rotate(-diverAngle);
  divers.translate(-20, -10);
  divers.image(diverAssets[4], 0,0) //girl front leg
  divers.pop();

   divers.image(diverAssets[5], 151 * 2, 208 * 2) //girl body

  divers.image(diverAssets[1], 160 * 2, 231 * 2) //girl snorkle


    texture(divers);
    //image(this.petal,0,0,400,400);
    let cols = 1;
    let waveAmp = 1 * this.size;
    let waveFreq = 6;
    let waveSpeed = -0.8;
    let w = 200 * this.size;
    let h = 200 * this.size;
    let dx = w / cols;

    beginShape(TRIANGLE_STRIP);

    for (let i = 0; i <= cols; i++) {
      let x = -w / 2 + i * dx;

      // sine wave displacement
      let wave =
        sin(i * waveFreq + this.x * 4.5 + this.y) * waveAmp;

      // top & bottom edges
      let yTop = -h / 2 + wave;
      let yBottom = h / 2 + wave;

      // texture coordinates
      let u = (i / cols) * this.petal.width;

      vertex(x, yTop, 0, u, 0);
      vertex(x, yBottom, 0, u, this.petal.height);
    }

    endShape();
    pop();

  }

}

class Garibaldi {
  constructor(sf) {
    if(!mute) {
			let s = random(fishSounds);
		s.volume=0.2;s.play();
		}
    if (Math.random() < 0.5) {
      this.fish = sf || random(allGaribaldi);
      this.petal = loadImage(this.fish.fish);
      this.x = random(960, 1060);
      this.y = map(totalDolphin * 7 % 9, 0, 8, 20, 360);
      this.speed = random(-0.6, -0.4) * 0.5;
      this.size = map(this.y, 0, 400, 0.5, 1) * 0.6;
      this.direction = "left";
      totalDolphin++;
    } else {
      this.fish = sf || random(allGaribaldi);
      this.petal = loadImage(this.fish.fish);
      this.x = random(-100, 0);
      this.y = map(totalDolphin * 7 % 9, 0, 8, 20, 360) + 20;
      this.speed = -1 * random(-0.6, -0.4) * 0.5;
      this.size = map(this.y, 0, 400, 0.5, 1) * 0.6;
      this.direction = "right";
      totalDolphin++;
    }

  }

  display() {
    this.x += this.speed;
    if (this.direction == "left") {
      push();
      translate(this.x, this.y);
      // scale(this.size);
      // image(this.petal,0,0,100,100);

      let angle = sin(this.x * 20) * PI / 8;

      // door base
      let x0 = 125 / 2 * this.size;
      let y0 = 0;
      let doorW = 75 / 2 * this.size;
      let doorH = 100 * this.size;

      // hinge (static)
      let topLeft = createVector(x0, y0);
      let bottomLeft = createVector(x0, y0 + doorH);

      // perspective factor
      let f = cos(degrees(angle));              // horizontal foreshortening
      let vScale = map(sin(degrees(angle)), -1, 1, 0.7, 1.2); // vertical exaggeration

      // right edge moves inward
      let xR = x0 + doorW * f;

      // right edge height changes
      let rightH = doorH * vScale;

      let topRight = createVector(xR, y0 + (doorH - rightH) / 2);
      let bottomRight = createVector(xR, topRight.y + rightH);

      texture(this.petal);
      beginShape();
      vertex(0, 100 * this.size, 0, 0, this.petal.width);
      vertex(0, 0, 0, 0, 0);
      vertex(topLeft.x, topLeft.y, 0, this.petal.width * 5 / 8, 0);
      vertex(topRight.x, topRight.y, 0, this.petal.width, 0);
      vertex(bottomRight.x, bottomRight.y, 0, this.petal.width, this.petal.width);
      vertex(bottomLeft.x, bottomLeft.y, 0, this.petal.width * 5 / 8, this.petal.width);

      endShape(CLOSE);

      pop();
    } else {
      push();
      translate(this.x, this.y);
      // scale(-this.size,this.size);
      //image(this.petal,0,0,100,100);
      let angle = sin(this.x * 20) * PI / 8;

      // door base
      let x0 = -125 / 2 * this.size;
      let y0 = 0;
      let doorW = -75 / 2 * this.size;
      let doorH = 100 * this.size;

      // hinge (static)
      let topLeft = createVector(x0, y0);
      let bottomLeft = createVector(x0, y0 + doorH);

      // perspective factor
      let f = cos(degrees(angle));              // horizontal foreshortening
      let vScale = map(sin(degrees(angle)), -1, 1, 0.7, 1.2); // vertical exaggeration

      // right edge moves inward
      let xR = x0 + doorW * f;

      // right edge height changes
      let rightH = doorH * vScale;

      let topRight = createVector(xR, y0 + (doorH - rightH) / 2);
      let bottomRight = createVector(xR, topRight.y + rightH);

      texture(this.petal);
      beginShape();
      vertex(0, 100 * this.size, 0, 0, this.petal.width);
      vertex(0, 0, 0, 0, 0);
      vertex(topLeft.x, topLeft.y, 0, this.petal.width * 5 / 8, 0);
      vertex(topRight.x, topRight.y, 0, this.petal.width, 0);
      vertex(bottomRight.x, bottomRight.y, 0, this.petal.width, this.petal.width);
      vertex(bottomLeft.x, bottomLeft.y, 0, this.petal.width * 5 / 8, this.petal.width);

      endShape(CLOSE);
      pop();
    }
  }

}

class Stalk {
  constructor(start, end, x) {
    this.myKelp = [];
    this.start = start;
    this.end = end;
    this.stem = color(67 * 0.6, 115 * 0.6, 129 * 0.6);
    this.offset = 45;
    this.x = x;
    for (let i = this.start; i < this.end; i += this.offset) {
      this.myKelp.push(new Kelp(this.x, i));
    }
  }

  display() {
    let fc = Date.now() / 1000;
    stroke(this.stem);
    strokeWeight(10 / 2);
    noFill();
    //line(200,200,200,800);

    beginShape();
    let j = 0;
    for (let i = this.start; i < this.end; i += this.offset) {
      let a = map(i, this.start, this.end, 20, 0);
      let y = i;
      let x =
        this.x + a * cos(i / 3 + fc / 3) + a * cos(i + fc * 1);
      vertex(x, y);
      this.myKelp[j].x = x;
      j++;
    }

    let a = map(this.end, this.start, this.end, 20, 0);
    let y = this.end;
    let x =
      this.x + a * cos(this.end / 3 + fc / 3) + a * cos(this.end + fc * 1);
    vertex(x, y);
    endShape();

    for (let i = 0; i < this.myKelp.length; i++) {
      this.myKelp[i].display();
    }
  }
}

class Kelp {
  constructor(x, y) {
    this.a = random(30, 60);
    this.x = x;
    this.y = y;
    this.offset1 = this.x / 3;
    this.offset2 = this.y;
    this.len = (40 + (y / 10) % 10)/2;
    this.freq = (y / 10 * 7) % 2 + 1;
    this.frame = this.offset1;
    this.stem = color(67 * 0.6, 115 * 0.6, 129 * 0.6);
    let colors = [color(67, 115, 129), color(60, 99, 110), color(67 * 0.6, 115 * 0.6, 129 * 0.6)]
    this.color = colors[(int(this.y / 9) * 7 + int(this.y / 17) * (4 + int(this.x % 3))) % 3];
this.points = [];
  }

  display() {
    this.frame += 0.5;
    push();
    noFill();
    strokeWeight(5 / 2);
    translate(this.x, this.y);
    rotate(-90);
    //beginShape();

    
    for (let i = 0; i < 10; i++) {
      let x = i * this.len;
      let y =
        0 +
        10 * sin(i/10 * this.frame + this.offset1) +
        5 * sin(i/10 * this.frame * this.freq + this.offset2);
      if (i == 1) {
        y *= 1.5;
        stroke(this.stem);
        line(x, y, 0, 0);
        translate(x, y);
        rotate(this.a);
        translate(-x, -y);
      }
      //  curveVertex(x, y);
      if (i >= 1) {
       // points.push(new p5.Vector(x, y));
        this.points[i-1] = (new p5.Vector(x, y));
      }
      // ellipse(x,y,5,5);
    }
    strokeWeight(5);

    // endShape();

    fill(this.color);
    noStroke();
    beginShape();
    vertex(this.points[0].x - 10, this.points[0].y);

    vertex(this.points[0].x - 10, this.points[0].y);
    for (let i = 0; i < this.points.length; i++) {
      let t = map(i, 0, this.points.length, 10, 0);
      vertex(this.points[i].x + 10, this.points[i].y - t);
    }
    for (let i = this.points.length - 1; i >= 0; i--) {
      let t = map(i, 0, this.points.length, -10, 0);
      vertex(this.points[i].x + 10, this.points[i].y - t);
    }
    vertex(this.points[0].x - 10, this.points[0].y);
    endShape(CLOSE);

    fill(0, 0, 0, 50);
    noStroke();
    beginShape();
    vertex(this.points[0].x - 10, this.points[0].y);

    vertex(this.points[0].x - 10, this.points[0].y);
    for (let i = 0; i < this.points.length; i++) {
      let t = map(i, 0, this.points.length, -2, 0);
      vertex(this.points[i].x + 10, this.points[i].y - t);
    }
    for (let i = this.points.length - 1; i >= 0; i--) {
      let t = map(i, 0, this.points.length, -10, 0);
      vertex(this.points[i].x + 10, this.points[i].y - t);
    }
    vertex(this.points[0].x - 10, this.points[0].y);

    endShape(CLOSE);

    pop();
  }
}


// Flock class to manage the array of all the boids
class Flock {
  constructor() {
    // Initialize the array of boids
    this.boids = [];
  }

  run() {
    for (let boid of this.boids) {
      // Pass the entire list of boids to each boid individually
      boid.run(this.boids);
    }
  }

  addBoid(b) {
    this.boids.push(b);
  }
}

class Boid {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(1, random(-0.5, 0.5));
    this.position = createVector(x, y);
    this.size = 1.5;

    // Maximum speed
    this.maxSpeed = 1;

    // Maximum steering force
    this.maxForce = 0.01;

  }

  run(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }

  applyForce(force) {
    // We could add mass here if we want: A = F / M
    this.acceleration.add(force);
  }

  // We accumulate a new acceleration each time based on three rules
  flock(boids) {
    let separation = this.separate(boids);
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);

    // Arbitrarily weight these forces
    separation.mult(1.5);
    alignment.mult(1.0);
    cohesion.mult(1.0);

    // Add the force vectors to acceleration
    this.applyForce(separation);
    this.applyForce(alignment);
    this.applyForce(cohesion);
    let a = map(this.position.y, 0, 300, 0.05, -0.05);
    this.applyForce(new p5.Vector(abs(a) * sin(frameCount / 10), a));
  }

  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);

    // Limit speed
    this.velocity.limit(this.maxSpeed);
    let velocityScaled = new p5.Vector(this.velocity.x/4,this.velocity.y/4)
    this.position.add(velocityScaled);

    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0);


  }

  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    // A vector pointing from the location to the target
    let desired = p5.Vector.sub(target, this.position);

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxSpeed);

    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);

    // Limit to maximum steering force
    steer.limit(this.maxForce);
    return steer;
  }

  render() {
    // Draw a triangle rotated in the direction of velocity
    let theta = this.velocity.heading() + 90;
    fill(42, 63, 153);
    stroke(42, 63, 153);
    strokeWeight(1);
    strokeJoin(ROUND);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    ellipse(0, 0, this.size * 1.5, this.size * 4)
    beginShape();

    vertex(-this.size * 1, this.size * 3);
    vertex(0, this.size * 2.5);
    vertex(this.size * 1, this.size * 3);
    vertex(0, this.size * 1);
    endShape(CLOSE);

    push();
    strokeWeight(3);
    strokeJoin(ROUND);
    beginShape();
    vertex(-this.size * 1.05, this.size * 0.5);
    vertex(0, -this.size * 0.5);
    vertex(this.size * 0.75, this.size * 0.5);
    vertex(0, -this.size * 1);
    endShape(CLOSE);
    pop();

    pop();
  }

  // Wraparound
  borders() {
    if (this.position.x < -this.size) {
      this.position.x = width + this.size;
    }

    if (this.position.y < -this.size) {
      //   this.position.y = height + this.size;
      //  this.applyForce(new p5.Vector(0,0.2));
    }

    if (this.position.x > 960 + this.size) {
      this.position.x = -this.size;
    }

    if (this.position.y > 500 + this.size) {
      //    this.position.y = -this.size;
      //     this.applyForce(new p5.Vector(0,-0.2));
    }
  }

  // Separation
  // Method checks for nearby boids and steers away
  separate(boids) {
    let desiredSeparation = 20.0;
    let steer = createVector(0, 0);
    let count = 0;

    // For every boid in the system, check if it's too close
    for (let boid of boids) {
      let distanceToNeighbor = p5.Vector.dist(this.position, boid.position);

      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if (distanceToNeighbor > 0 && distanceToNeighbor < desiredSeparation) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, boid.position);
        diff.normalize();

        // Scale by distance
        diff.div(distanceToNeighbor);
        steer.add(diff);

        // Keep track of how many
        count++;
      }
    }

    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxSpeed);
      steer.sub(this.velocity);
      steer.limit(this.maxForce);
    }
    return steer;
  }

  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  align(boids) {
    let neighborDistance = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighborDistance) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  // Cohesion
  // For the average location (i.e., center) of all nearby boids, calculate steering vector towards that location
  cohesion(boids) {
    let neighborDistance = 50;
    let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighborDistance) {
        sum.add(boids[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // Steer towards the location
    } else {
      return createVector(0, 0);
    }
  }
} // class Boid