


const H=window.innerHeight;
const W=window.innerWidth;
var can,ct;
let circles=[];//array for circle Objects

let colors=[
'#2185C5',
'#088eff',
'#4d39ce',
'#00bdff'
];
function randColor(){
    return colors[Math.floor(Math.random()*(colors.length-1)+1)];
}

//circle Object
function Circle(x,y,raduis,color){
    this.x=x;
    this.y=y;
    this.raduis=raduis;
    this.color=color;
    this.radian=Math.random()*2*Math.PI;//for rotating circles 
    this.speed=0.05;//speed of rotation
    this.distance=Math.random()*(125-25)+25;
    //distance from center to circle 
    
    this.lastCircle={x:x,y:y};
    
    
    this.update=()=>{
       //storing last point before updating
       var lastPointX=this.x;
       var lastPointY=this.y;
//last Circle objct is for mouse drag effect only          
this.lastCircle.x+=(mouse.x-this.x)*this.speed;
this.lastCircle.y+=(mouse.y-this.y)*this.speed;
       
       //upadting
       //circular motion
      this.radian+=this.speed;
      this.x=this.lastCircle.x+Math.cos(this.radian)*this.distance;
this.y=this.lastCircle.y+Math.sin(this.radian)*this.distance;
        
        
        
      //Drawing circle
       ct.beginPath();
       ct.strokeStyle=this.color;
       ct.lineWidth=this.raduis/2;
       ct.moveTo(lastPointX,lastPointY);
       ct.lineTo(this.x,this.y); 
       ct.stroke();
       ct.closePath();
        
    };
    
}


//initializing on window load
function init(){

    can=document.getElementById("can");
    can.height=innerHeight;
    can.width=innerWidth;
    ct=can.getContext("2d");
    
    
    //creating array of circles
    for(let i=0;i<40;i++){
        
        circles.push(new Circle(can.width/2,can.height/2,3,randColor()));
        
    }
    
    animat();
    
    
}



//animation && update
function animat(){
    requestAnimationFrame(animat);
    ct.fillStyle='rgba(255,255,255,0.05)'
    ct.fillRect(0,0,innerWidth,innerHeight);
    
    
    //updating/moving each Object
    circles.forEach(circle=>{
        circle.update();
    });
    
}

//for mouse hover
let mouse={
    x:W/2,
    y:H/2
};
addEventListener('mousemove',event=>{
  
   mouse.x=event.clientX;
   mouse.y=event.clientY; 
});



window.onload=init;
