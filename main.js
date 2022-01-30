const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

const img1 = new Image();
img1.src = 'dinosaur.png';

const dino = { //캐릭터의 정보를 미리 object 자료로 정리
  x : 10,
  y : 200,
  width : 50,
  height : 50,
  draw(){
    // ctx.fillStyle = 'green';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img1, this.x, this.y,50,50)
  }
}
dino.draw();

const img2 = new Image();
img2.src = 'ghost.png';
class Cactus { //장애물 뽑는 기계
  constructor(){
    this.x = 500;
    this.y = 200;
    this.width = 30;
    this.height = 30;
  }
  draw(){
    // ctx.fillStyle = 'red';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img2, this.x-10, this.y-10, 50,50);
  }
}

var timer = 0; 
var cactuses = [];
var jumptimer = 0;
var animation;

function 프레임마다실행할거(){
  animation = requestAnimationFrame(프레임마다실행할거)
  timer++;

  ctx.clearRect(0,0, canvas.width, canvas.height);
  
  if(timer % 150 === 0){ //60 frame마다 장애물 생성
    var cactus = new Cactus();
    cactuses.push(cactus) //생성 후 관리 위해 배열에 삽입
  }
  cactuses.forEach((a, i, o)=>{
    if(a.x < 0){
      o.splice(i, 1) //화면 넘어가면 cactus 삭제
    }
    a.x -= 2;
    a.draw(); //배열에 있던거 전부 화면에 출력

    collision(dino, a);


  })

  if (jumping == true){ //점프 시작
    dino.y -= 3;
    jumptimer++;
  }
  if(jumptimer>50){ //최대 높이
    jumping = false;
  }
  if(jumping == false){ //하강 시작
    if(dino.y < 200){
      dino.y+=3;
    }
  }
  if(dino.y == 200){ //착지 후 타이머 리셋
    jumptimer = 0;
  }
  dino.draw();
}
프레임마다실행할거();

//충돌확인

function collision (dino, cactus){
  var x축차이 = cactus.x - (dino.x + dino.width);
  var y축차이  = cactus.y - (dino.y + dino.height);
  if (x축차이 < 0 && y축차이 < 0){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    cancelAnimationFrame(animation)
  }
}

var jumping = false;
document.addEventListener('keydown',function(e){
  if (e.code === 'Space'){
    jumping = true;
  }
})