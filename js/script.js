document.addEventListener('DOMContentLoaded', () => {
    // Pre-loader logic
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    
    // Wait for the animation on the loader bar to finish (2s)
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        mainContent.style.opacity = '1';
    }, 2200);

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu on link click
            if (!mobileMenu.classList.contains('hidden')) {
                 mobileMenu.classList.add('hidden');
            }
        });
    });

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Glitchy background canvas animation
    const canvas = document.getElementById('glitch-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const glitchColors = ['#00ff00', '#00aaff', '#ff00ff'];

        function glitchAnimation() {
            // Create a fading trail effect by drawing a semi-transparent black rectangle
            ctx.fillStyle = 'rgba(1, 1, 1, 0.1)';
            ctx.fillRect(0, 0, width, height);

            // Draw a few new glitchy lines each frame
            const lines = Math.random() * 5;
            for (let i = 0; i < lines; i++) {
                ctx.fillStyle = glitchColors[Math.floor(Math.random() * glitchColors.length)];
                const x = Math.random() * width;
                const y = Math.random() * height;
                const w = Math.random() * 200 + 50;
                const h = Math.random() * 2 + 1;
                ctx.globalAlpha = Math.random() * 0.2 + 0.05; // Make lines very faint
                ctx.fillRect(x, y, w, h);
                ctx.globalAlpha = 1.0; // Reset alpha
            }
            
            requestAnimationFrame(glitchAnimation);
        }

        glitchAnimation();
    }
});
