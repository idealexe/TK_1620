/********************************************/
/* グローバル変数
/********************************************/
var _canvasSize=800; // キャンバスサイズ

var _particles=[]; // パーティクルオブジェクトの配列
var _particleNum=500; // パーティクルの数
var _sLimit=220; //パーティクルの最大速度
var _weather="SNOWY"; //天気の情報(SUNNY,RAINY,CLOUDY,SNOWY)


function setup(){
  createCanvas(_canvasSize,_canvasSize);
  colorMode(HSB, 360, 100, 100, 1);
  background(0);

  for (var i=0; i<_particleNum; i++) {
    _particles.push(new Particle());
  }
  console.log(random(1,3));
  mouseX=width/2
  mouseY=height/2;
}

function draw(){
  noStroke();
  background(1,100,1,0.035);    // パーティクルを上塗りする量

  for(var i=0;i<_particles.length;i++){
    _particles[i].update();
    _particles[i].draw();
    // var dia=random(2,10);
    // stroke(208,round(random(0,100)),100,0.03);
    // line(width/2,height/2,_particles[i].pos.x,_particles[i].pos.y);
    // ellipse(_particles[i].pos.x,_particles[i].pos.y,dia,dia);
  }
  // if(random()<0.03)  hamon(random(width),random(height),50+random(),random(10,50),random(1,5),color(random(170,250)%360,100,100));
}

function mousePressed(){
  for(var i=0;i<_particles.length;i++){
    _particles[i].inv();
  }
}

var Particle=function(){
  this.pos= createVector(random(width-1),random(height-1));
  //console.log(this.pos);
  this.pre= createVector(this.pos.x,this.pos.y);
  this.sp= createVector(random(10),random(10));
  this.ac= createVector(0,0);
  // this.mouse= createVector(width/2,height/2);
  this.tune=random(3,20);
  this.strokeW=random(0.1,2);

  switch(_weather){
    case "SUNNY":
    this.col=color(random(320,420)%360,100,100);
    break;
    case "RAINY":
    this.col=color(random(170,250)%360,100,100);
    break;
    case "CLOUDY":
    this.col=color(0,0,round(random(30,100)));
    break;
    case "SNOWY":
    this.col=color(208,round(random(0,100)),100);
    break;
    default:
    this.col=color(random(360),90,100);
    break;
  }
};

Particle.prototype={
  update : function(){
    this.pre=createVector(this.pos.x,this.pos.y);
    if(this.pos.x>width || this.pos.x<0){
      this.sp.x*=-0.5;
    }
    if(this.pos.y<0||this.pos.y>height){
      this.sp.y*=-0.5;
    }

    attraction=createVector(mouseX,mouseY);
    attraction.sub(this.pos);
    this.ac.set(attraction);
    this.ac.normalize();
    this.ac.div(this.tune);
    this.sp.add(this.ac);
    this.sp.limit(_sLimit*(1.0/60.0));
    this.pos.add(this.sp);
  },
  draw : function(){
    stroke(this.col);
    strokeWeight(this.strokeW);
    line(this.pre.x,this.pre.y,this.pos.x,this.pos.y);
  },
  inv : function(){
    this.pre=createVector(this.pos.x,this.pos.y);
    if(this.pos.x>width || this.pos.x<0){
      this.sp.x*=-0.5;
    }else{
      this.sp.x*=-5;
      this.ac.x*=-1;
    }
    if(this.pos.y<0||this.pos.y>height){
      this.sp.y*=-0.5;
    }else{
      this.sp.y*=-5;
      this.ac.y*=-1;
    }

    //attraction=createVector(mouseX,mouseY);
    //attraction.sub(this.pos);
    //this.ac.set(attraction);
    this.ac.normalize();
    this.ac.div(this.tune);
    this.sp.add(this.ac);
    // this.sp.limit(_sLimit*(1.0/20.0));
    this.pos.add(this.sp);
  }
};

function hamon(xPos, yPos, size, num, interval, col) {
  noFill();
  stroke(col);
  for (var i = 0; i < num; i += interval) {
    ellipse(xPos, yPos, size + interval * i);
  }
}


// var Particle=(function(){
//     // クラス変数
//     //var pos,pre,mouse,sp,ac,col;
//     var tune=random(3,10);
//     // var tune=3;
//
//     var particle=function(){
//       this.pos= createVector(random(width),random(height));
//       this.pre=createVector(this.pos.x,this.pos.y);
//       this.sp=createVector(random(2),random(2));
//       this.ac=createVector();
//       this.mouse=createVector();
//
//       switch(_weather){
//         case "SUNNY":
//         this.col=color(random(320,420)%360,90,100);
//         break;
//         default:
//         this.col=color(random(360),90,100);
//         break;
//       }
//     };
//
//     var p=particle.prototype;
//
//     p.update=function(){
//       this.pre.copy(this.pos);
//       if(this.pos.x>width || this.pos.x<0){
//         this.sp*=-0.9;
//       }
//       if(this.pos.y<0||pos.y>height){
//         this.sp*=-0.9;
//       }
//       this.mouse.x=mouseX;
//       this.mouse.y=mouseY;
//       var attraction=createVector(this.mouse.x,this.mouse.y);
//       attraction.sub(this.pos);
//       this.ac.copy(attraction);
//       this.ac.norm();
//       this.ac.div(tune);
//       this.sp.add(acc);
//       this.sp.limit(_sLimit*(1.0/60.0));
//       this.pos.add(this.sp);
//     };
//
//     p.draw=function(){
//       stroke(this.col);
//       strokeWeight(2);
//       line(this.pre.x,this.pre.y,this.pos.x,this.pos.y);
//     };
//
//   return particle;
// })();
