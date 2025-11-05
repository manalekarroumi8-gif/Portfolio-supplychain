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
    this.x+=this.vx; this.y+=this.vy;
    const
