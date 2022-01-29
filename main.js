const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

const dino = { //캐릭터의 정보를 미리 object 자료로 정리
  x : 10,
  y : 200,
  width : 50,
  height : 50,
  draw(){
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
dino.draw();

class Cactus { //장애물도 마찬가지
  constructor(){
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw(){
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
var cactus = new Cactus();
cactus.draw()

var timer = 0;
var cactuses = [];

function 프레임마다실행할거(){
  requestAnimationFrame(프레임마다실행할거)
  timer++;
  ctx.clearRect(0,0, canvas.width, canvas.height);
  
  if(timer % 60 === 0){ //60 frame마다 장애물 생성
    var cactus = new Cactus();
    cactuses.push(cactus) //생성 후 관리 위해 배열에 삽입
  }
  cactuses.forEach((a)=>{
    a.x--;
    a.draw(); //배열에 있던거 전부 화면에 출력
  })
}
프레임마다실행할거();