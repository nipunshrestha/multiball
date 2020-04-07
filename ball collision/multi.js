var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');



function Ball(x,y,radius,index){
    var that=this;
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.vx =  Math.floor(Math.random()*(5-(-5))) + (-5);
    this.vy =  Math.floor(Math.random()*(5-(-5))) + (-5);
    this.index=index;
    this.color = 'rgb('+Math.ceil(Math.random()*256)+','+Math.ceil(Math.random()*256)+','+Math.ceil(Math.random()*256)+')';
    
    this.draw=function(){

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
       
    }

    this.move =function(){
        this.x+=this.vx ;
        this.y+=this.vy ;
        this.checkcollsion();
    }
    this.checkcollsion = function(){

        if(this.x+this.radius>=700 || this.x-this.radius<=0 ){
            this.vx = - this.vx;
        }
            
            
        if(this.y-this.radius<=0 || this.y+this.radius>=700){
                this.vy = - this.vy;
        }

        for(var i=0;i<balls.length;i++){
            if(i==this.index)
                break;
            var nextBall=balls[i];
            if(nextBall.radius+this.radius>=this.distanceFromThis(nextBall.x,nextBall.y)){
                var tempvx=this.vx;
                var tempvy = this.vy;
                this.vx=nextBall.vx;
                this.vy=nextBall.vy
                nextBall.vx=tempvx;
                nextBall.vy=tempvy
            }
        }
        
    }

     this.distanceFromThis = function(x1,y1){
        var delx=x1-this.x;
        var dely=y1-this.y;

        return Math.sqrt((delx*delx)+(dely*dely));
    }




}
    

var balls =[];
var bindex = 0 ;
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0)';
    ctx.fillRect(0, 0, 700, 700);
  
    while (balls.length < 10) {
        var r=Math.ceil((Math.random()*20)+10);

        var x=Math.ceil((Math.random()*700)%(700-(2*r+1))+r);
        var y=Math.ceil((Math.random()*700)%(700-(2*r+1))+r);

        var ball=new Ball(x,y,r,bindex);
        balls.push(ball);
        bindex++;
    }
  
    for (i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].move();
    }
  
    requestAnimationFrame(loop);
  }
loop();
  