const canvas = document.getElementById("linesCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 100;

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x; this.y = y;
    this.directionX = directionX; this.directionY = directionY;
    this.size = size; this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    if(this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
    if(this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

function init() {
  particlesArray = [];
  for(let i=0;i<numberOfParticles;i++){
    let size = Math.random()*3 + 1;
    let x = Math.random()*(canvas.width-size*2);
    let y = Math.random()*(canvas.height-size*2);
    let directionX = (Math.random()*0.6)-0.3;
    let directionY = (Math.random()*0.6)-0.3;
    let color = "rgba(0,224,255,0.7)";
    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

function connect() {
  for(let a=0;a<particlesArray.length;a++){
    for(let b=a;b<particlesArray.length;b++){
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = dx*dx + dy*dy;
      if(distance < 15000){
        ctx.strokeStyle = "rgba(0,224,255,0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p => p.update());
  connect();
}

window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();
