// Scroll Animation
const scrollElements = document.querySelectorAll('.animate-on-scroll');
const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
};
const displayScrollElement = (el) => {
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
};
const handleScrollAnimation = () => {
    scrollElements.forEach(el => {
        if(elementInView(el, 1.25)) displayScrollElement(el);
    });
};
window.addEventListener('scroll', handleScrollAnimation);

// Calendrier toggle
document.getElementById('bookBtn').addEventListener('click', () => {
    const cal = document.getElementById('calendar');
    cal.style.display = (cal.style.display === 'none') ? 'block' : 'none';
});
