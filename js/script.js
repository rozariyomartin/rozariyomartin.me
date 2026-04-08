// =========================
// FADE-IN ANIMATION
// =========================
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
  document.querySelectorAll('.hero .fade-in')
    .forEach(el => el.classList.add('visible'));
});


// =========================
// EMAILJS CONTACT FORM
// =========================
document.addEventListener("DOMContentLoaded", function () {

  // 🔑 Initialize EmailJS (PUT YOUR PUBLIC KEY HERE)
  emailjs.init("YOUR_PUBLIC_KEY");

  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("c-name").value.trim();
      const email = document.getElementById("c-email").value.trim();
      const message = document.getElementById("c-msg").value.trim();

      // =========================
      // VALIDATION
      // =========================
      if (!name || !email || !message) {
        alert("Please fill all fields");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Enter a valid email address");
        return;
      }

      // =========================
      // SEND EMAIL
      // =========================
      emailjs.sendForm(
        "service_dfbdsyp",
        "template_1qh2o2t",  // e.g. template_xxx
        this
      )
      .then(() => {
        alert("Message sent successfully 🚀");
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send message ❌");
      });
    });
  }
});
