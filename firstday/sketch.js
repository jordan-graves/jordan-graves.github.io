function setup() {
 // createCanvas(1920,568);
  noCanvas();
  background(0);
  frameRate(30);

  const firebaseConfig = {
    apiKey: "AIzaSyBGykFtzq2KD3aYZAYDqLQqfgylJdnO_qo",
    authDomain: "apcs-finals.firebaseapp.com",
    databaseURL: "https://apcs-finals-default-rtdb.firebaseio.com",
    projectId: "apcs-finals",
    storageBucket: "apcs-finals.appspot.com",
    messagingSenderId: "990129759654",
    appId: "1:990129759654:web:5f08c0e1a4af8946d59b67",
    measurementId: "G-CQBFFJZJN7",
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
  //projects.on("value", gotData);
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function draw() {
  if (mouseIsPressed) {
    let data = {
      x: mouseX,
      y: mouseY,
    };
 //   projects.set(data); //overwrite
    //projects.child("name").set(data); //overwrite a branch
    //projects.push(data); //add data to list
 //   ellipse(data.x, data.y, 30, 30);
  }
}

function gotData(data) {
  let info = data.val();
  console.log(info);
  // ellipse(info.x,info.y,30,30);
}

function mousePressed() {
 // return false;
}

function submitForm() {
  let data = {
    name: document.getElementById("name").value,
    grade: document.getElementById("grade").value,
    summer: document.getElementById("summer").value
  };
  projects.push(data);
  document.getElementById("questionaire").innerHTML = "SUBMITTED!"
}
