/* === FOND ANIMÉ : MOLÉCULES CONNECTÉES === */
const canvas = document.getElementById("linesCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 80;

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
    if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 2 + 1;
    let x = Math.random() * (window.innerWidth - size * 2);
    let y = Math.random() * (window.innerHeight - size * 2);
    let directionX = (Math.random() * 0.4) - 0.2;
    let directionY = (Math.random() * 0.4) - 0.2;
    let color = "#00e0ff";
    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

function connect() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = dx*dx + dy*dy;
      if (distance < 12000) {
        ctx.strokeStyle = "rgba(0, 224, 255, 0.15)";
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
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particlesArray.forEach(p => p.update());
  connect();
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();

/* === ANIMATION DES PLANÈTES AUTOUR DU NOM === */
const planets = document.querySelectorAll(".planet");

function orbitPlanets() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  let time = Date.now() * 0.001;

  planets.forEach((planet, index) => {
    const angle = time * (0.3 + index * 0.1);
    const radius = 150 + index * 50;

    const x = centerX + Math.cos(angle) * radius - planet.offsetWidth / 2;
    const y = centerY + Math.sin(angle) * radius - planet.offsetHeight / 2;

    planet.style.transform = `translate(${x}px, ${y}px) rotate(${angle * 57.3}deg)`;
  });

  requestAnimationFrame(orbitPlanets);
}

orbitPlanets();
