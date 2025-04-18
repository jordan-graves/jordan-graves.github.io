let cnv;
let json;

function preload() {
  json = loadJSON("../projects.json",);
 
}
function setup() {
//  cnv = createCanvas(document.getElementById("opening").offsetWidth, 400);
 // cnv.parent("opening");
//  cnv = resizeCanvas(document.getElementById("opening").offsetWidth, map(sc,1,19.5/40,500,250));
  console.log(width);
//noLoop();
noCanvas();
unfilterProjects();
}
function mousePressed() {

}
/*
function windowResized() {
  let sc = map(width,800,290,1,19.5/40,true);
  document.getElementById("opening").style.height = map(sc,1,19.5,500,300)+"px"

 // cnv = resizeCanvas(document.getElementById("opening").offsetWidth, map(sc,1,19.5/40,500,250));
redraw();
}


function draw() {
  background(39,38,46);
  noStroke();
 
  let sc = map(width,800,290,1,19.5/40,true);
  let mousex = map(window.scrollY,0,400,120*sc,-300 )
  let mousex1 = map(window.scrollY,0,400,600,500 )
mousex1=mousex/2+700
    for (let y=50; y<150; y+=15) {
    for (let x=0; x<width*2-0; x+=1) {
      //if (abs(width-x)<10) continue;
      let x1 = x;
      let xf = x + mousex1;
      let y1 = y + 12*sin(radians(xf*2.5/(800*sc-10)*360+y*1))
      + 17*sin(radians(xf*0.5/(800*sc-10)*360+y/2.5));
   
  //     if (dist(x1,y1,width/2,height/2)>150 && dist(x1,y1,width/2+width,height/2)>150) {
      if (true) {
      if (x<width) {
        fill("#eb594f");
         //fill("#3478e7");
           ellipse(x1,y1*sc,5*sc,5*sc);   
      }
      else { 
  fill("#3478e7");
  ellipse(width*2-x1,y1*sc,5*sc,5*sc);  
      }
       }
    }
  }
  
    for (let y=215; y<260; y+=15) {
    for (let x=0; x<width*2-0; x+=1) {
     // if (abs(width-x)<10) continue;
      let x1 = x;
      let xf = x + mousex1;
      let y1 = y + 12*sin(radians(xf*2.5/(800*sc-10)*360+y*1))
      + 17*sin(radians(xf*0.5/(800*sc-10)*360+y/2.5));
   
  //     if (dist(x1,y1,width/2,height/2)>150 && dist(x1,y1,width/2+width,height/2)>150) {
      if (true) {
      if (x<width) {
        fill("#eb594f");
         //fill("#3478e7");
           ellipse(x1,y1*sc,5*sc,5*sc);   
      }
      else { 
  fill("#3478e7");
  ellipse(width*2-x1,y1*sc,5*sc,5*sc);  
      }
       }
    }
  }

  for (let y=370; y<455; y+=15) {
    for (let x=0; x<width*2-0; x+=1) {
     // if (abs(width-x)<10) continue;
      let x1 = x;
      let xf = x + mousex1;
      let y1 = y + 12*sin(radians(xf*2.5/(800*sc-10)*360+y*1))
      + 17*sin(radians(xf*0.5/(800*sc-10)*360+y/2.5));
   
  //     if (dist(x1,y1,width/2,height/2)>150 && dist(x1,y1,width/2+width,height/2)>150) {
      if (true) {
      if (x<width) {
        fill("#eb594f");
         //fill("#3478e7");
           ellipse(x1,y1*sc,5*sc,5*sc);   
      }
      else { 
  fill("#3478e7");
  ellipse(width*2-x1,y1*sc,5*sc,5*sc);  
      }
       }
    }
  }
  
  
  let textHeights = [190,285,335];
  let off = map(map(width,800,290,1,19.5/40),1,19.5/40,0,20,false);
  let p = ["M ","M ","M "]
    for (let i=0; i<3; i++) {
      y=textHeights[i];
    for (let x=-10; x<width+10; x+=15) {
      
      let x1 = x;
      let xf = x + mousex1;
            let y1 = y + 12*sin(radians(xf*2.5/(800*sc-10)*360+y*1))
      + 17*sin(radians(xf*0.5/(800*sc-10)*360+y/2.5));
      p[i]+=int(x1)+" "+int(y1*sc)+"L ";

    //  p[i]+=int(x1)+","+int(y1*sc)+" S"+int(x1)+","+int(y1*sc)+" ";
    //       ellipse(x1,y1*sc,8,8);   
      }
    
    p[i] = p[i].substring(0,p[i].length-2);

   // console.log(p[i])
    document.getElementById("curve"+(i+1)).setAttribute("d",p[i])
    }
  
fill("#f7e4cf");
  fill(0)
  //text(width,50,50)
//ellipse(width/2,height/2,300,300)
  document.getElementById("text-path").setAttribute("startOffset",mousex-30+"px")
  document.getElementById("text-path1").setAttribute("startOffset",mousex+"px")
  document.getElementById("text-path2").setAttribute("startOffset",mousex-30+"px")

  document.getElementById("opening").style.height = map(sc,1,19.5/40,500,250)+"px";

  
  
background(39,38,46,80)
}
*/

function draw() {
  //window.scrollY
  document.body.style.setProperty(
    "--scroll",
     window.pageYOffset / (document.body.offsetHeight - window.innerHeight) / 2
  );
let off = map(window.innerWidth,900,1600,0,350,true);
let off2 = map(window.scrollY,0,600,off/2,-off*3/2);
  document.getElementById("pathForText").style.transform="translate(-"+window.scrollY/4+"px,0px)";
let sc1 = map(window.innerWidth,900,300,1,0.33,true);
let sc2 = map(window.innerWidth,900,300,0,167,true);
  document.getElementById("pathForText").style.scale = sc1;
  document.getElementById("pathForText").style.marginTop = sc2;
  document.getElementById("redpath").style.transform="translate(-"+window.scrollY/4+"px,0px)";
  document.getElementById("bluepath").style.transform="translate("+window.scrollY/2+"px,0px)";
  let sc = map(width,800,290,1,19.5/40,true);
 // document.getElementById("opening").style.height = map(sc,1,19.5,500,300)+"px"
document.getElementsByTagName("text")[0].children[0].setAttribute("startOffset",off+off2+window.scrollY/4+100+"px")
document.getElementsByTagName("text")[1].children[0].setAttribute("startOffset",off+off2+window.scrollY/4+140+"px")
document.getElementsByTagName("text")[2].children[0].setAttribute("startOffset",off+off2+window.scrollY/4+115+"px")
  //class="st3"   document.getElementById("text-path").setAttribute("startOffset",mousex-30+"px")
  //10.4
  //5.8
  //6.3
}