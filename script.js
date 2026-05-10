
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = -100, my = -100, rx = -100, ry = -100;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
document.querySelectorAll('a,button,input,textarea').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});
(function tick() { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; rx += (mx - rx) * .12; ry += (my - ry) * .12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(tick); })();

document.getElementById('nav') && window.addEventListener('scroll', () => document.getElementById('nav').classList.toggle('scrolled', scrollY > 50));

const hb = document.getElementById('hamburger'), mm = document.getElementById('mobileMenu');
hb.addEventListener('click', () => { hb.classList.toggle('open'); mm.classList.toggle('open'); });
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => { hb.classList.remove('open'); mm.classList.remove('open'); }));

const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }), { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const f = tab.dataset.filter;
        document.querySelectorAll('.project-card').forEach(c => { c.style.display = (f === 'all' || c.dataset.category === f) ? '' : 'none'; });
    });
});

const hbg = document.getElementById('heroBgText');
window.addEventListener('scroll', () => { const y = scrollY; hbg.style.transform = `translate(-50%,calc(-50% + ${y * .25}px))`; hbg.style.opacity = Math.max(0, 1 - y / 400); });

const sb = document.getElementById('sendBtn');
sb.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.f-input');
    const textarea = document.querySelector('.f-textarea');
    const name = inputs[0] ? inputs[0].value.trim() : '';
    const email = inputs[1] ? inputs[1].value.trim() : '';
    const company = inputs[2] ? inputs[2].value.trim() : '';
    const message = textarea ? textarea.value.trim() : '';

    if (!name || !email || !message) {
        sb.innerHTML = '⚠ Please fill in Name, Email & Message';
        sb.style.background = '#f59e0b'; sb.style.color = '#fff';
        setTimeout(() => { sb.innerHTML = 'Send Message <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>'; sb.style.background = ''; sb.style.color = ''; }, 3000);
        return;
    }

    const subject = encodeURIComponent(`Portfolio Contact from ${name}` + (company ? ` — ${company}` : ''));
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany/Role: ${company}\n\nMessage:\n${message}`);
    window.location.href = `mailto:abdulsamathu632@gmail.com?subject=${subject}&body=${body}`;

    sb.innerHTML = '✓ Opening your email client...';
    sb.style.background = '#22c55e'; sb.style.color = '#fff';
    setTimeout(() => { sb.innerHTML = 'Send Message <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>'; sb.style.background = ''; sb.style.color = ''; }, 3000);
});