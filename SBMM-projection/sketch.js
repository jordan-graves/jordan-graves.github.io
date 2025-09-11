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
let bg;
let positionsX = [
  60,
  136,
  165,
  229,
  264,
  317,
  187,
  120,
  126,
  49,
  31,
  85,
  215,
  271,
  278,
  228,
  180,
  147,
  209,
  231,
  183,
  183,
  219,
  264,
  411,
  467,
  507,
  539,
  615,
  692,
  659,
  728,
  760,
  792,
  701,
  754,
  701,
  735,
  773,
  775,
  732,
  802,
  844,
  814,
  874,
  838,
  902,
  888,
  946,
  939,
];
let positionsY = [
  467,
  510,
  444,
  475,
  428,
  479,
  362,
  312,
  368,
  326,
  378,
  414,
  294,
  295,
  248,
  237,
  253,
  208,
  199,
  166,
  152,
  108,
  128,
  205,
  352,
  372,
  338,
  380,
  490,
  508,
  442,
  421,
  489,
  391,
  325,
  312,
  271,
  220,
  262,
  202,
  157,
  165,
  201,
  225,
  235,
  335,
  323,
  372,
  372,
  447,
];
let taken = [];

function preload() {
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();
  starfish = database.ref("starfish");
  starfish.on("value", gotData);
  bg = loadImage("Untitled-3.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  for (let i = 0; i < positionsX.length; i++) {
    taken[i] = false;
  }
}

function draw() {
  scale(width/(1920/2))
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
  background(220);
  image(bg, 0, 0,1920/2,1080/2);

  for (let i = 0; i < myStarfish.length; i++) {
    myStarfish[i].display();
    if (myStarfish[i].X>1920/2) {
      myStarfish.splice(i,1);
      i--;
    }
  }
    fill(0);
  rect(0,1080/2,1920/2,height);
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
    for (let i=0; i<3; i++) {
   let a = Math.floor(random(0, positionsX.length));

  while (taken[a]) {
    a = Math.floor(random(0, positionsX.length));
  }
  let x = positionsX[a];
  let y = positionsY[a];
    let sf = allStarfish[allStarfish.length-1];
  taken[a] = true;
  myStarfish.push(new Starfish(a, x, y,sf));
  }
  }
  loaded = true;
  console.log(allStarfish);
}

function mousePressed() {
  if (myStarfish.length>30) {
     for (let i=0; i<3; i++) {
    
  let a = Math.floor(random(0, myStarfish.length));
       taken[myStarfish[a].a]= false;
       myStarfish[a].leaving = true;
       
     }
  }
  let sf = random(allStarfish);
  for (let i=0; i<3; i++) {
    
  let a = Math.floor(random(0, positionsX.length));

  while (taken[a]) {
    a = Math.floor(random(0, positionsX.length));
  }
  let x = positionsX[a];
  let y = positionsY[a];
  taken[a] = true;
  myStarfish.push(new Starfish(a, x, y, sf));
  // positionsX.push(mouseX);
  // positionsY.push(mouseY);
  // let a = ""
  // for (let x of positionsX) {
  //   a+=x + ","
  // }
  // let b = ""
  // for (let y of positionsY) {
  //   b+=y + ","
  // }
  // console.log(a)
  // console.log(b)
  }
}
class Starfish {
  constructor(a, x, y, sf) {
    this.fish = sf || random(allStarfish);
    this.petal = loadImage(this.fish.fish);
    this.targetX = x;
    this.targetY = y;
    this.x= this.targetX;
    this.y=random(-100,0);
    this.size = random(0.7, 1);
    this.rotation = random(0, 360);
    this.easing = random(0.01,0.02);
    this.a= a;
    this.leaving = false;
    this.arrived = false;
    //console.log(this.x,this.y);
  }
  display() {
    if (this.leaving && this.arrived) {
      this.x+=this.size;
      this.y = 0.05*dist(this.x, this.targetY,this.targetX,this.targetY)*sin(this.rotation+frameCount)+this.targetY-dist(this.x, this.targetY,this.targetX,this.targetY)/2;
    } else {
    if (this.targetY>(this.y+5)) {
      let d = (this.targetY - this.y) * this.easing
      d = constrain(d,0,1)
      this.y = this.y + d;
      this.x = 0.25*dist(this.targetX, this.y,this.targetX,this.targetY)*sin(this.rotation+frameCount)+this.targetX;
    } else {
      this.arrived = true;
    }
    }
    let s = map(this.y, 0, height, 0.04 * this.size, 0.20 * this.size)*width/(1920/2);
    for (let i = 0; i < 5; i++) {
      push();

      translate(this.x, this.y);

      scale(s, s*0.9);
      rotate(72 * i + 8 * sin(frameCount / 1.5 + i * this.rotation) + this.rotation);
      image(this.petal, -50, -200, 100, 200);
      pop();
    }
  }
}
