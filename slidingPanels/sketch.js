
let slider1,slider2,slider3;
let img1, img2, img3;
function setup() {
  createCanvas(1600, 400);
  img1 = createGraphics(1200,400);
  img2 = createGraphics(1200,400);
  img3 = createGraphics(1200,400);
  pattern(img1,color(255,205,0));
    pattern(img2,color(255,0,0));
    pattern(img3,color(0,0,0));
  slider1 = createSlider(-200,200,0,1);
    slider2 = createSlider(-200,200,0,1);
    slider3 = createSlider(-200,200,0,1);

}

function draw() {
  background(0);
  
   image(img1,200+slider1.value(),0);
   image(img2,200+slider2.value(),0);
   image(img3,200+slider3.value(),0);
}

function pattern(img,c) {
  img.strokeWeight(3);
  img.stroke(c);
  img.noFill();
    for (var y=0; y<img.height; y+=6) {  
  var b = 164/180.0/2;
  img.beginShape();
  
     for (var x=0;x<img.width; x++) {
      var a = 1;
      var r = a*-12*sin(radians(x*2/4*b+y*-2/4*b+-32))
      *sin(radians(x*8/4*b+y*2/4*b+74))
      *sin(radians(y*4/4*b+x*3/4*b+60))
       *sin(radians(x*0/4*b+y*4/4*b+0));
        
        img.curveVertex(x, y+r);
        
    }
    img.endShape();
  } 
}