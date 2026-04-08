const observer = new IntersectionObserver(
    entries => entries.forEach(e => { 
      if (e.isIntersecting) {
        e.target.classList.add('visible'); 
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.06, rootMargin: '0px 0px -32px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Immediately show hero content
  window.addEventListener('load', () => {
    document.querySelectorAll('.hero .fade-in').forEach(el => el.classList.add('visible'));
  });
