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

    // Initial load animations (Hero Section)
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

    tl.from('header h1', { y: -50, opacity: 0, delay: 0.2 })
      .from('nav ul li', { y: -20, opacity: 0, stagger: 0.1 }, '-=0.5')
      .from('.box.a1 h2', { x: -100, opacity: 0, duration: 1.2 }, '-=0.5')
      .from('.box.a1 h1', { x: -100, opacity: 0, duration: 1.2, ease: "back.out(1.7)" }, '-=1')
      .from('.box.a1 p', { y: 30, opacity: 0, duration: 1 }, '-=0.8')
      .from('.box.a1 button', { scale: 0.5, opacity: 0, duration: 1, ease: "elastic.out(1, 0.5)" }, '-=0.8')
      .from('.image-content', { scale: 0, opacity: 0, duration: 1.5, ease: 'expo.out' }, '-=1.2')
      .from('.box.a2 img', { scale: 0.5, opacity: 0, duration: 1, ease: 'power2.out' }, '-=0.8');

    // Debug: Toggle image visibility to check animation
    const imageContent = document.querySelector('.image-content');
    if (imageContent) {
        imageContent.addEventListener('click', () => {
            imageContent.classList.toggle('hide-image');
            console.log('Image visibility toggled for debugging animation.');
        });
    }

    // Section Reveals
    const sections = ['#about', '#skill', '#project', '#contact'];
    
    sections.forEach(section => {
        gsap.from(`${section} .h1`, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1
        });
    });

    // About section content
    gsap.from('#about .section .box.a2', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 70%'
        },
        x: -100,
        opacity: 0,
        duration: 1.2
    });

    gsap.from('#about .section .a1', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 70%'
        },
        x: 100,
        opacity: 0,
        duration: 1.2
    });

    // Skill cards staggered reveal
    gsap.from('.boxs', {
        scrollTrigger: {
            trigger: '#skill',
            start: 'top 70%'
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1
    });

    // Project cards reveal
    gsap.from('.card', {
        scrollTrigger: {
            trigger: '#project',
            start: 'top 70%'
        },
        scale: 0.9,
        opacity: 0,
        stagger: 0.3,
        duration: 1
    });

    // Contact sections reveal
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 70%'
        },
        x: -50,
        opacity: 0,
        duration: 1
    });

    gsap.from('.con-mess', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 70%'
        },
        x: 50,
        opacity: 0,
        duration: 1
    });
});
