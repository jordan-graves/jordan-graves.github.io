let globalBrightness = 1;

let incomingDevice = 0;
let newDevice;
let maxDraw = 555;
let maxDevice = 10;

let eachLED = [];
let y;
let k = 0;
let aa = 0;

let xEase = [];
let yEase = [];
let easing = 0.05;
let threshold = 1.0;

let ID = [];

let numPixels;
let previousFrame;
let d = 0;
let e = 0;
let f = 0;
let g = 0;
let led = 0;
let movement = 0;
let c = [];
let xpos;
let ypos;
let gradient;
let video;
let ledsPerPin = 250;

let gamma = 1.7;
let a = 0;
let numPorts = 0; // the number of serial ports in use
let maxPorts = 2; // maximum number of serial ports
let numLEDs = 250 * 8 * 1;

let errorCount = 0;
let framerate = 30.0;
let timer = 0;

let darkest = 200;
let brightest = 50;

let remap = [];
let lastTime = -1;

function setup() {
  remapPos();

  createCanvas(640, 480);
 // pixelDensity(1);
  background(0);
  c = [];
  for (let i=0; i<2000; i++) {
    c[i] = color(0,0,0);
  }
  eachLED = [];
  xpos = [];
  ypos = [];
  xEase = [];
  yEase = [];
  gradient = [];
  loadPixels();
  noStroke();
  colorMode(HSB, 255, 255, 255);


  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();  

  numPixels = video.width * video.height;
  previousFrame = [];
  for (let i=0; i<numPixels*4; i++) {
    previousFrame[i]=0;
  }
  loadPixels();

  setPositions();
  frameRate(30);
}

function draw() {


  if (frameCount < 30) return;
if (video.elt.currentTime !== lastTime) {
    background(0);
    video.loadPixels();
  lastTime = video.elt.currentTime;
    noStroke();

    if (timer < 1) {
      colorMode(HSB, 255, 255, 255);
      led = 0;

      if (movement < 50) {
        f++;
        if (f > 10) {
          if (f > 30) {
            f = 30;
          }
          for (let j = 0; j < 2000; j++) {
            let i = j / 2;
            i *= (int(j / 50) % 6) + (int(j / 100) % 3) + 1;

            c[remap[j]] = color(
              (e * 1.1 + i) % 255,
              (e * 1.2 + i) % 255,
              (((e + i) % 205) * (f - 10)) / 20
            );
          }

          e += 5;
        }
      } else {
        for (let j = 0; j < 2000; j++) {
          c[j] = color(hue(c[j]), saturation(c[j]), brightness(c[j]) * 0.9);
        }
        f--;
        if (f < 0) {
          f = 0;
        }
      }

      if (f > 20) {
        // background(0);
        movement = 0;

        for (let a = 0; a < 2000; a++) {
          let y = ypos[a];
          let x = xpos[a];

          let x1 = 960 + (((x * 4 - 720) * 960) / 720 / 5) * 2 - 0;
          let y1 = 540 + ((y * 4 - 240) * 1080) / 480 / 3 + 50;
          //x1 /=4;
          //y1/=4;
          x1 = int(x);
          y1 = int(y);
          let index = y1 * video.width + video.width - x1;

          let currR = video.pixels[index * 4];
          let currG = video.pixels[index * 4 + 1];
          let currB = video.pixels[index * 4 + 2];

          let prevR = previousFrame[index * 4];
          let prevG = previousFrame[index * 4 + 1];
          let prevB = previousFrame[index * 4 + 2];

          let diffR = abs(currR - prevR);
          let diffG = abs(currG - prevG);
          let diffB = abs(currB - prevB);
          if (diffR + diffG + diffB > 40 * threshold) {
            c[a] = color(
              (d * 3 + currR) % 255,
              (d + currG) % 255,
              (d + currB) % 205
            );

            movement++;
          }
          fill(c[a]);
          ellipse(x, y, 4,4);
          if (diffR + diffG + diffB > 100 * threshold) {
            fill((d * 3 + currR) % 255, (d + currG) % 255, (d + currB) % 205);

            ellipse(x, y, 4,4);
          }
        }
      } else {
        if (movement < 1000) {
          g--;
          if (g < 0) {
            g = 0;
          }

          movement = 0;

          for (let a = 0; a < 2000; a++) {
            let y = ypos[a];
            let x = xpos[a];

            let x1 = 960 + (((x * 4 - 720) * 960) / 720 / 5) * 2 - 0;
            let y1 = 540 + ((y * 4 - 240) * 1080) / 480 / 3 + 50;

            //x1 /=4;
            //y1/=4;
              x1 = int(x);
          y1 = int(y);
            let index = y1 * video.width + video.width - x1;

            let currR = video.pixels[index * 4];
            let currG = video.pixels[index * 4 + 1];
            let currB = video.pixels[index * 4 + 2];

            let prevR = previousFrame[index * 4];
            let prevG = previousFrame[index * 4 + 1];
            let prevB = previousFrame[index * 4 + 2];
            // Compute the difference of the red, green, and blue values
            let diffR = abs(currR - prevR);
            let diffG = abs(currG - prevG);
            let diffB = abs(currB - prevB);
            if (diffR + diffG + diffB > 60 * threshold) {
              c[a] = color(
                (d * 3 + currR) % 255,
                (d + currG) % 255,
                ((d + currB) % 205) 
              );

              movement++;
            }
            fill(c[a]);
            ellipse(x, y, 4,4);

            if (diffR + diffG + diffB > 100 * threshold) {
              fill( (d * 3 + currR) % 255,(d + currG) % 255,((d + currB) % 105) + 100);
              ellipse(x, y, 4,4);
            }

            led++;
          }
        } else {
          g++;
          if (g > 30) {
            g = 30;
          }

          movement = 0;

          for (let a = 0; a < 2000; a++) {
            let y = ypos[a];
            let x = xpos[a];

            let x1 = 960 + (((x * 4 - 720) * 960) / 720 / 5) * 2 - 0;
            let y1 = 540 + ((y * 4 - 240) * 1080) / 480 / 3 + 50;
            // x1 /=4;
            //y1/=4;
              x1 = int(x);
          y1 = int(y);
            let index = y1 * video.width + video.width - x1;

            let currR = video.pixels[index * 4];
            let currG = video.pixels[index * 4 + 1];
            let currB = video.pixels[index * 4 + 2];

            let prevR = previousFrame[index * 4];
            let prevG = previousFrame[index * 4 + 1];
            let prevB = previousFrame[index * 4 + 2];
            // Compute the difference of the red, green, and blue values
            let diffR = abs(currR - prevR);
            let diffG = abs(currG - prevG);
            let diffB = abs(currB - prevB);
            if (diffR + diffG + diffB > 60 * threshold) {
              c[a] = color(
                (d * 3 + currR) % 255,
                (d + currG) % 255,
                (d + currB) % 205
              );

              movement++;
              fill(c[a]);
              ellipse(x, y, 4,4);
            }

            if (diffR + diffG + diffB > 100 * threshold) {
              fill((gradient[a] + currR + d * 3) % 255, 50, 255);
              ellipse(x, y, 4,4);
            }

            led++;
          }
        }
      }
      d += 1;

      console.log("f:" + f);
      console.log("g:" + g);
      //println(led);
      console.log("movement:" + movement);
      // println(frameRate);
      previousFrame = Array.from(video.pixels);
      //  loadPixels();
    }
  }
}

function setPositions() {
  led = 0;
  let mouseX1 = 269;
  let mouseY1 = 465;
  let mouseX2 = 213;
  let mouseY2 = 85;
  let mouseZ = 3;
  let mouseZ1 = -7;
  let aa = frameCount * 3;

  for (let a = 0; a < 4; a += 1) {
    for (let b = 12; b < 14.5; b += 0.5) {
      if ((b * 8 - a * 5 + 110 - 4) % 3 == 0) {
        //   continue;
      }
      let c = 2 * abs(b - 2.5) + 2 * abs(a % 2);
      c = -4;
      let row = 0;
      for (let j = b * 10 + 0.5; j < b * 10 + 4.5; j += 0.8) {
        let col = 0;
        for (
          let i = a * 60 + 20 + (j % 5) * c;
          i < a * 60 + 40 + (j % 5) * c;
          i += 2
        ) {
          let x = 2 + i * 2;
          let y =
            -200 +
            2 *
              (-10 +
                j * 3.45 +
                mouseZ *
                  cos(
                    radians(
                      (i * mouseX1) / 100 + (j * (mouseX2 + a * 0)) / 10.0
                    )
                  ) +
                mouseZ1 *
                  cos(
                    radians((i * mouseY1) / 100 - 60 - (j * mouseY2) / 10.0)
                  ));
          let aaa = aa - i * 1 - j * 20 - b * 71 + 20000;
          let aaa1 = aa * 1.3 - i * 1 - j * 20 - b * 71 + 20000;

          fill((aaa1 * 1.0) % 255, aaa % 255, aaa % 205);
          ellipse(x, y, 5 * 0.77, 5 * 0.77);
          if (row % 2 == 1) {
            xpos[led] = int(x);
            ypos[led] = int(y);
          } else {
            xpos[led - (led % 10) + 9 - col] = int(x);
            ypos[led - (led % 10) + 9 - col] = int(y);
          }
          led++;
          col++;
        }
        row++;
          if (row==5) {break;}
      }
    }
    for (let b = 12; b < 14.5; b += 0.5) {
      if ((b * 8 - a * 5 + 110 - 4) % 3 == 0) {
        //   continue;
      }
      let c = 2 * abs(b - 2.5) + 2 * abs(a % 2);
      c = -4;
      let row = 0;
      for (let j = b * 10 + 5.5; j < b * 10 + 9.5; j += 0.8) {
        let col = 0;
        for (
          let i = a * 60 + 50 + (j % 5) * c;
          i < a * 60 + 70 + (j % 5) * c;
          i += 2
        ) {
          let x = 2 + i * 2;
          let y =
            -200 +
            2 *
              (-10 +
                j * 3.45 +
                mouseZ *
                  cos(
                    radians(
                      (i * mouseX1) / 100 + (j * (mouseX2 + a * 0)) / 10.0
                    )
                  ) +
                mouseZ1 *
                  cos(
                    radians((i * mouseY1) / 100 - 60 - (j * mouseY2) / 10.0)
                  ));
          let aaa = aa - i * 1 - j * 20 - b * 71 + 20000;
          let aaa1 = aa * 1.3 - i * 1 - j * 20 - b * 71 + 20000;

          fill((aaa1 * 1.0) % 255, aaa % 255, aaa % 205);
          ellipse(x, y, 5 * 0.77, 5 * 0.77);
          if (row % 2 == 1) {
            xpos[led] = int(x);
            ypos[led] = int(y);
          } else {
            xpos[led - (led % 10) + 9 - col] = int(x);
            ypos[led - (led % 10) + 9 - col] = int(y);
          }
          led++;
          col++;
        }
        row++;
        if (row==5) {break;}
      }
    }
  }

  for (let i = 0; i < xpos.length; i++) {
    if (xpos[i] == 0) continue;
    xpos[i] += 0;
    ypos[i] -= 500;
    xpos[i] *= 1.25;
    ypos[i] *= 1.25;
  }
}

function remapPos() {
  let i = 0;
  for (let k = 0; k < 2000; k += 50) {
    for (let j = 0; j < 10; j++) {
      remap[i] = j + k;
      i++;
      remap[i] = 19 - j + k;
      i++;
      remap[i] = 20 + j + k;
      i++;
      remap[i] = 39 - j + k;
      i++;
      remap[i] = 40 + j + k;
      i++;
    }
  }
}
