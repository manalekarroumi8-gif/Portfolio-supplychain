/* MENU TOGGLE */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

/* FOND MOLÉCULES */
const canvas = document.getElementById("linesCanvas");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
const particles = [];
const numParticles = 100;
const maxDistance = 150;
let mouse = { x: null, y: null, radius: 150 };

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random()-0.5)*1.2;
    this.vy = (Math.random()-0.5)*1.2;
    this.size = 2;
  }
  move() {
    if(this.x<0||this.x>width)this.vx*=-1;
    if(this.y<0||this.y>height)this.vy*=-1;
    this.x+=this.vx;
    this.y+=this.vy;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fillStyle="#00e0ff";
    ctx.fill();
  }
}

function connectParticles() {
  for(let a=0;a<particles.length;a++){
    for(let b=a;b<particles.length;b++){
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let distance = Math.sqrt(dx*dx + dy*dy);
      if(distance < maxDistance){
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,224,255,${1-distance/maxDistance})`;
        ctx.moveTo(particles[a].x,particles[a].y);
        ctx.lineTo(particles[b].x,particles[b].y);
        ctx.stroke();
      }
    }
  }
}

for(let i=0;i<numParticles;i++){
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0,0,width,height);
  particles.forEach(p=>{
    p.move();
    p.draw();
    // Interaction with mouse
    if(mouse.x && mouse.y){
      let dx = p.x - mouse.x;
      let dy = p.y - mouse.y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < mouse.radius){
        p.x += dx/20;
        p.y += dy/20;
      }
    }
  });
  connectParticles();
  requestAnimationFrame(animate);
}

animate();

/* FADE-IN SECTIONS */
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
  threshold: 0.2,
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
