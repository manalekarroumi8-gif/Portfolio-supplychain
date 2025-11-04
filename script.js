// ===== Planètes compétences =====
const skillPlanets = [
    {el: document.getElementById('excel'), radius: 100, speed: 0.02, angle: 0},
    {el: document.getElementById('python'), radius: 130, speed: 0.015, angle: 90},
    {el: document.getElementById('powerbi'), radius: 160, speed: 0.01, angle: 180},
    {el: document.getElementById('sql'), radius: 190, speed: 0.008, angle: 270},
];

// ===== Planètes formations =====
const eduPlanets = [
    {el: document.getElementById('bac'), radius: 220, speed: 0.012, angle: 0},
    {el: document.getElementById('prepas'), radius: 250, speed: 0.009, angle: 120},
    {el: document.getElementById('oc'), radius: 280, speed: 0.007, angle: 240},
];

// ===== Canvas pour les lignes =====
const canvas = document.getElementById('linesCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ===== Animation planètes =====
function animatePlanets() {
    const allPlanets = skillPlanets.concat(eduPlanets);
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    allPlanets.forEach(p => {
        p.angle += p.speed;
        p.x = centerX + p.radius * Math.cos(p.angle);
        p.y = centerY + p.radius * Math.sin(p.angle);
        p.el.style.left = `${p.x - 30}px`; // 30px = demi largeur planète
        p.el.style.top = `${p.y - 30}px`;
    });

    drawLines(allPlanets);
    requestAnimationFrame(animatePlanets);
}

// ===== Dessiner lignes style molécule =====
function drawLines(planets) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    planets.forEach(p1 => {
        planets.forEach(p2 => {
            if(p1 !== p2){
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = 'rgba(0,224,255,0.1)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        });
    });
}

// ===== Lancer animation =====
animatePlanets();
