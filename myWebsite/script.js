/*
  script.js
  Handles small interactive behaviors:
  - mobile nav toggle
  - active nav highlight on scroll
  - contact form -> mailto handler
  - sets current year in footer
*/

document.addEventListener('DOMContentLoaded', function() {
  // Set year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  navToggle && navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    // toggle aria-expanded for accessibility
    const expanded = nav.classList.contains('open');
    navToggle.setAttribute('aria-expanded', expanded);
  });

  // Smooth active link on scroll
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav a');

  function onScroll() {
    const y = window.scrollY;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const top = rect.top + window.scrollY - 120;
      const bottom = top + section.offsetHeight;
      const id = section.id;
      const link = document.querySelector('.nav a[href="#'+id+'"]');
      if (y >= top && y < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        link && link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Contact form: open mail client using mailto
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const message = document.getElementById('message').value.trim();
      const subject = encodeURIComponent(`Message from ${name} via portfolio`);
      const body = encodeURIComponent(message + '\n\n--\nSent from portfolio');
      const mail = `mailto:ak3958449@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mail;
    });
  }
});
