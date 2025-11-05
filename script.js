/* === FOND MOLÉCULES === */
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
    this.x+=this.vx; this.y+=this.vy;
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx*dx+dy*dy);
    if(dist<mouse.radius){this.x-=dx/20; this.y-=dy/20;}
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fillStyle="#00e0ff"; ctx.fill();
  }
}
for(let i=0;i<numParticles;i++){particles.push(new Particle());}

function animate(){
  ctx.clearRect(0,0,width,height);
  for(let i=0;i<particles.length;i++){
    particles[i].move(); particles[i].draw();
    for(let j=i+1;j<particles.length;j++){
      const dx=particles[i].x-particles[j].x;
      const dy=particles[i].y-particles[j].y;
      const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<maxDistance){
        ctx.beginPath();
        ctx.strokeStyle=`rgba(0,224,255,${1-dist/maxDistance})`;
        ctx.lineWidth=1;
        ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(particles[j].x,particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}
animate();

/* === FADE-IN AU SCROLL === */
const faders = document.querySelectorAll(".fade-in");
const appearOptions = { threshold: 0.3, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver(function(entries, observer){
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

/* === MENU DÉROULANT === */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
menuToggle.addEventListener("click", () => { navMenu.classList.toggle("open"); });
