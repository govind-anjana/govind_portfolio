// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Typing Animation
const typedTextEl = document.getElementById('typed-text');
const roles = ['MERN Stack Developer', 'Full Stack Developer', 'React Developer', 'Node.js Developer'];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
    const current = roles[roleIndex];
    if (isDeleting) {
        typedTextEl.textContent = current.substring(0, charIndex--);
    } else {
        typedTextEl.textContent = current.substring(0, charIndex++);
    }
    let delay = isDeleting ? 60 : 100;
    if (!isDeleting && charIndex === current.length + 1) {
        delay = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
    }
    setTimeout(typeEffect, delay);
}
typeEffect();


// Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Use Lenis for scroll events
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

const full = document.querySelector("#full");


const email = document.querySelector("#email");
const sub = document.querySelector("#sub");
const mes = document.querySelector("#mes");

function sentemail() {
    const myMessage = `Full Name: ${full.value}<br/>
        Email: ${email.value}<br/>
        Subject: ${sub.value}<br/>
        Message: ${mes.value}`;

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "govindanjana2004@gmail.com",
        Password: "1B0A305C93219D77F7BA0C8AC1C1664493E9",
        To: 'govindanjana2004@gmail.com',
        From: "govindanjana2004@gmail.com",
        Subject: "New Portfolio Message",
        Body: myMessage
    }).then(
        message => {
            if (message == "OK") {
                Swal.fire({
                    title: "Success!",
                    text: "Message Sent Successfully!",
                    icon: "success"
                })
            }
        }
    )
}

let sections = document.querySelectorAll('section');
let navlink = document.querySelectorAll('ul li a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navlink.forEach(links => {
                links.classList.remove('active');
            })
            const activeLink = document.querySelector(`ul li a[href='#${id}']`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    })

    // Show/hide scroll-top button after 700px
    const scrollTop = document.querySelector('#scrollTop');
    if (window.scrollY > 700) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }
}

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ── PRE-HIDE all scroll-animated elements so they don't flash on reload ──
    gsap.set([
        '#about .h1', '#skill .h1', '#project .h1', '#contact .h1',
        '#about .section .box.a2',
        '#about .section .a1',
        '.boxs',
        '.card',
        '.contact-info',
        '.con-mess',
        '.image-content', '.box.a2 img'
    ], { opacity: 0 });

    // ── Hero Section: plays once on load (no scroll needed) ──
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    
    // Set initial transform states for hero elements
    gsap.set('.image-content', { scale: 0.8 });
    gsap.set('.box.a2 img', { scale: 0.6 });

    tl.from('header h1',      { y: -50, opacity: 0, delay: 0.2 })
      .from('nav ul li',      { y: -20, opacity: 0, stagger: 0.1 }, '-=0.5')
      .from('.box.a1 h2',     { x: -100, opacity: 0, duration: 1.2 }, '-=0.5')
      .from('.box.a1 h1',     { x: -100, opacity: 0, duration: 1.2, ease: 'back.out(1.7)' }, '-=1')
      .from('.box.a1 p',      { y: 30,  opacity: 0, duration: 1 }, '-=0.8')
      .from('.hero-actions',  { y: 30,  opacity: 0, duration: 1 }, '-=0.7')
      .to('.image-content',   { scale: 1, opacity: 1, duration: 1.5, ease: 'expo.out' }, '-=1.2')
      .to('.box.a2 img',      { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out', delay: 0.5 }, '-=0.8');

    // ── Helper: build a standard scroll-reveal tween ──
    function reveal(targets, trigger, vars = {}) {
        gsap.to(targets, {
            scrollTrigger: {
                trigger,
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true
            },
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: vars.duration ?? 1,
            ease: vars.ease ?? 'power3.out',
            stagger: vars.stagger ?? 0,
            ...vars
        });
    }

    // ── Section headings ──
    ['#about', '#skill', '#project', '#contact'].forEach(sec => {
        reveal(`${sec} .h1`, sec, { y: 50, duration: 1 });
    });

    // ── About section ──
    gsap.set('#about .section .box.a2', { x: -100, opacity: 0 });
    gsap.to('#about .section .box.a2', {
        scrollTrigger: { trigger: '#about', start: 'top 75%', once: true,
            toggleActions: 'play none none none' },
        opacity: 1, x: 0, duration: 1.2, ease: 'power3.out'
    });

    gsap.set('#about .section .a1', { x: 100, opacity: 0 });
    gsap.to('#about .section .a1', {
        scrollTrigger: { trigger: '#about', start: 'top 75%', once: true,
            toggleActions: 'play none none none' },
        opacity: 1, x: 0, duration: 1.2, ease: 'power3.out'
    });

    // ── Skills cards ──
    gsap.set('.boxs', { y: 60, opacity: 0 });
    gsap.to('.boxs', {
        scrollTrigger: { trigger: '#skill', start: 'top 75%', once: true,
            toggleActions: 'play none none none' },
        opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: 'power3.out'
    });

    // ── Project cards ──
    gsap.set('.card', { scale: 0.88, opacity: 0 });
    gsap.to('.card', {
        scrollTrigger: { trigger: '#project', start: 'top 75%', once: true,
            toggleActions: 'play none none none' },
        opacity: 1, scale: 1, stagger: 0.2, duration: 1, ease: 'power3.out'
    });

    // ── Contact panels ──
    gsap.set('.contact-info', { x: -60, opacity: 0 });
    gsap.to('.contact-info', {
        scrollTrigger: { trigger: '#contact', start: 'top 78%', once: true,
            toggleActions: 'play none none none' },
        opacity: 1, x: 0, duration: 1, ease: 'power3.out'
    });

    gsap.set('.con-mess', { x: 60, opacity: 0 });
    gsap.to('.con-mess', {
        scrollTrigger: { trigger: '#contact', start: 'top 78%', once: true,
            toggleActions: 'play none none none' },
        opacity: 1, x: 0, duration: 1, ease: 'power3.out'
    });
});

