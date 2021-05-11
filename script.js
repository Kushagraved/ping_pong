var ball=document.getElementById('ball');
var rod1=document.getElementById('rod1');
var rod2=document.getElementById('rod2');
var rodRect1 = rod1.getBoundingClientRect();
var rodRect2 = rod2.getBoundingClientRect();

var curr_score=0;
var gameOn=false;
var rod_startX=rodRect1.x;


(function(){
    
    var max_score=localStorage.getItem("max_score");
    if(max_score==null){            
        max_score=0;
    }

    alert("Ping Pong Game!!"+"                       "+"Max SCORE is"+"  "+max_score);

})();


function displayScore(curr_score){
    if(curr_score>=(localStorage.getItem("max_score"))){
        localStorage.setItem("max_score",curr_score);
    }
    window.alert("Your Score is"+"  "+curr_score+"    "+"MAX SCORE is"+"  "+localStorage.getItem("max_score"));
}

function resetGame(){
    rod1.style.left=rod_startX+'px';
    rod2.style.left=rod_startX+'px';
    ball.style.top=93.5+'vh';
    ball.style.left=50+'%';
    curr_score=0;
}
window.addEventListener("keydown",function(event){
    var rodSpeed=15;
    var key=event.key;
    //console.log(key);
    var rodRect1 = rod1.getBoundingClientRect();
    var rodRect2 = rod2.getBoundingClientRect();

    if(key=='d' ||  key=='D' || key=='ArrowRight'){
        //console.log(typeof(window.innerWidth));
        if(rodRect1.x+rodRect1.width+(parseInt)(20)<window.innerWidth){
            rod1.style.left=rodRect1.x+rodSpeed+'px';
            rod2.style.left=rodRect1.x+rodSpeed+'px';
        }
        
    }
    else if(key=='a' ||  key=='A' || key=='ArrowLeft'){
        if(rodRect1.x>=0){
            rod1.style.left=rodRect1.x-rodSpeed+'px';
            rod2.style.left=rodRect1.x-rodSpeed+'px';
        }
    }

    if(key=='Enter'){
        if(!gameOn){
            gameOn=true;
            var ballRect=ball.getBoundingClientRect();
            var ballX=ballRect.x;
            var ballY=ballRect.y;
            var ballSpeedX=3;
            var ballSpeedY=3;
            var ballDia=ballRect.width;

            var movement=setInterval(function(){
                rodRect1 = rod1.getBoundingClientRect();
                rodRect2 = rod2.getBoundingClientRect();

                ballX+=ballSpeedX;
                ballY-=ballSpeedY;

                //Actual Movement
                ball.style.left=ballX+'px';
                ball.style.top=ballY+'px';

                //Ball Remains Within Window Frame!!
                if(ballX+ballDia>=window.innerWidth || ballX<=0){
                    ballSpeedX=-ballSpeedX;
                }
                
                /*if(ballY<=0 || ballY+ballDia>=window.innerHeight){
                    ballSpeedY=-ballSpeedY;
                }*/

                //Ball Strikes Rod1
                if(ballY<=(rodRect1.y+rodRect1.height)){
                    ballSpeedY=-ballSpeedY;
                    curr_score++;
                    if(ballX+ballDia<rodRect1.x || ballX>(rodRect1.x+rodRect1.width)){
                        clearInterval(movement);
                        displayScore(curr_score);
                        resetGame();
                        gameOn=false;
                        return;
                    }
                }

                //Ball Strikes Rod2
                if(ballY+ballDia>rodRect2.y){
                    ballSpeedY=-ballSpeedY;
                    curr_score++;
                    if(ballX+ballDia<rodRect1.x || ballX>(rodRect1.x+rodRect1.width)){
                        clearInterval(movement);
                        displayScore(curr_score);
                        resetGame();
                        gameOn=false;
                        return;
                    }
                }



            },10);

        }
    }


    
});
