//You can use this link to submit it to be viewable on the projection screen (1920x568 recommended): https://codingforart.herokuapp.com/submitProjectionLinks to an external site.
let boids = [];
function setup() {
 createCanvas(windowWidth, windowHeight);
   background(0);
  textAlign(CENTER,CENTER);
  
const firebaseConfig = {
  apiKey: "AIzaSyBGykFtzq2KD3aYZAYDqLQqfgylJdnO_qo",
  authDomain: "apcs-finals.firebaseapp.com",
  databaseURL: "https://apcs-finals-default-rtdb.firebaseio.com",
  projectId: "apcs-finals",
  storageBucket: "apcs-finals.appspot.com",
  messagingSenderId: "990129759654",
  appId: "1:990129759654:web:5f08c0e1a4af8946d59b67",
  measurementId: "G-CQBFFJZJN7"
};
  
  //inititalize database
  firebase.initializeApp(firebaseConfig);
 database = firebase.database();

 projects = database.ref("students_bblock");
 if (getParameterByName("block")=="d")
 projects = database.ref("students_dblock");
 if (getParameterByName("block")=="e")
 projects = database.ref("students_eblock");
 if (getParameterByName("block")=="f")
 projects = database.ref("students_fblock");
 if (getParameterByName("block")=="g")
 projects = database.ref("students_gblock");
  
  //call gotData() when receive data
projects.on("value", gotAllData);
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function gotData(data){
   let info = data.val();
 // console.log(info);
 // ellipse(info.x,info.y,30,30);
}

let allData = [];
function gotAllData(data) {
  let allObjects = data.val();
//  console.log(allObjects); 
  // Grab the keys to iterate over the object
  let keys = Object.keys(allObjects);
 // console.log(keys);
  
  for (let i = allData.length; i < keys.length; i++) {
    let key = keys[i];
    let thisObject = allObjects[key];
    allData.push(thisObject);
    boids.push(new Boid(random(150,width-150), random(150,height-150),thisObject.name,thisObject.grade,thisObject.summer));

  }
  console.log(allData);  
}

function draw() {
  background(51);
  // Run all the boids
  for (let i = 0; i < boids.length; i++) {
    boids[i].run(boids);
  }
}

// Boid class
// Methods for Separation, Cohesion, Alignment added
class Boid {
  constructor(x, y,n,g,s) {
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.position = createVector(x, y);
    this.r = -125.0;
    this.maxspeed = 1;    // Maximum speed
    this.maxforce = 0.05; // Maximum steering force
    this.n=n;
    this.g=g;
    this.s=s;
                                        this.c=color(random(0,150),random(150,250),random(150,250),150);
  }

  run(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }
  
  // Forces go into acceleration
  applyForce(force) {
    this.acceleration.add(force);
  }
  
  // We accumulate a new acceleration each time based on three rules
  flock(boids) {
    let sep = this.separate(boids); // Separation
    let ali = this.align(boids);    // Alignment
    let coh = this.cohesion(boids); // Cohesion
    // Arbitrarily weight these forces
    sep.mult(2.5);
    ali.mult(1.0);
    coh.mult(1.0);
    // Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }
  
  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0);
  }
  
  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    return steer;
  }
  
  // Draw boid as a circle
  render() {
    fill(this.c);
    stroke(200);
    ellipse(this.position.x, this.position.y, 260, 260);
    fill(255);
    stroke(255);
    strokeWeight(0.5);
    textSize(25);
    text(this.n,this.position.x, this.position.y-45);
        textSize(25);
    noStroke();
    text(this.g,this.position.x, this.position.y-20);
        textSize(15);
        text("My Summer:",this.position.x, this.position.y+10);
    text(this.s,this.position.x, this.position.y+30);
  }
  
  // Wraparound
  borders() {
    if (this.position.x < -this.r) {this.velocity.x *= -1;
                                        this.c=color(random(0,150),random(150,250),random(150,250),150);

                                   }
    if (this.position.y < -this.r) {this.velocity.y *= -1;    this.c=color(random(0,150),random(150,250),random(150,250),150);

                                   }
    if (this.position.x > width + this.r) {this.velocity.x *= -1;    this.c=color(random(0,150),random(150,250),random(150,250),150);

                                          }
    if (this.position.y > height + this.r) {this.velocity.y *= -1;    this.c=color(random(0,150),random(150,250),random(150,250),150);

                                           }
  }
  
  // Separation
  // Method checks for nearby boids and steers away
  separate(boids) {
    let desiredseparation = 245.0;
    let steer = createVector(0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
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
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }
  
  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  align(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }
  
  // Cohesion
  // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
  cohesion(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
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
}