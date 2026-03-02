document.addEventListener("DOMContentLoaded", function () {

  // ================= FAQ =================
  document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  // ================= REVEAL =================
  function revealOnScroll() {
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();


  // ================= CAROUSEL =================
  const carousel = document.querySelector('.carousel');

  if (carousel) {

    carousel.innerHTML += carousel.innerHTML;

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let speed = 0.5;

    const halfWidth = carousel.scrollWidth / 2;
    carousel.scrollLeft = halfWidth;

    function autoScrollCarousel() {
      if (!isDragging) {
        carousel.scrollLeft += speed;

        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
          carousel.scrollLeft -= halfWidth;
        }

        if (carousel.scrollLeft <= 0) {
          carousel.scrollLeft += halfWidth;
        }
      }

      requestAnimationFrame(autoScrollCarousel);
    }

    autoScrollCarousel();

    carousel.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseup', () => isDragging = false);
    carousel.addEventListener('mouseleave', () => isDragging = false);

    carousel.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const walk = e.pageX - startX;
      carousel.scrollLeft = scrollLeft - walk;
    });

  }


  // ================= NAV =================
  const navScroll = document.querySelector('.nav-scroll');
  const navTrack = document.querySelector('.nav-track');

  if (navScroll && navTrack) {

    navTrack.innerHTML += navTrack.innerHTML;

    let isDraggingNav = false;
    let startXNav = 0;
    let scrollLeftNav = 0;
    let speedNav = 0.5;

    const navHalf = navTrack.scrollWidth / 2;
    navScroll.scrollLeft = navHalf;

    function autoScrollNav() {
      if (!isDraggingNav) {
        navScroll.scrollLeft += speedNav;

        if (navScroll.scrollLeft >= navHalf * 2) {
          navScroll.scrollLeft -= navHalf;
        }

        if (navScroll.scrollLeft <= 0) {
          navScroll.scrollLeft += navHalf;
        }
      }

      requestAnimationFrame(autoScrollNav);
    }

    autoScrollNav();

    navScroll.addEventListener('mousedown', (e) => {
      isDraggingNav = true;
      startXNav = e.pageX;
      scrollLeftNav = navScroll.scrollLeft;
    });

    navScroll.addEventListener('mouseup', () => isDraggingNav = false);
    navScroll.addEventListener('mouseleave', () => isDraggingNav = false);

    navScroll.addEventListener('mousemove', (e) => {
      if (!isDraggingNav) return;
      e.preventDefault();
      const walk = e.pageX - startXNav;
      navScroll.scrollLeft = scrollLeftNav - walk;
    });

  }


  // ================= PROMESSAS =================
  const promessas = document.querySelectorAll('.promessas');

  if (promessas.length > 0) {

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {

          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 250);

          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    promessas.forEach(item => observer.observe(item));
  }

// ================= FEEDBACKS MANUAL INFINITO =================
const wrapper = document.querySelector('.feedbacksWrapper');
const track = document.querySelector('.feedbacksTrack');

if (wrapper && track) {


  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let position = 0;

  const totalWidth = track.scrollWidth / 2;

  wrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    currentTranslate = position;
  });

  wrapper.addEventListener('mouseup', () => isDragging = false);
  wrapper.addEventListener('mouseleave', () => isDragging = false);

  wrapper.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const walk = e.pageX - startX;
    position = currentTranslate + walk;

    // loop infinito
    if (position <= -totalWidth) {
      position += totalWidth;
    }

    if (position >= 0) {
      position -= totalWidth;
    }

    track.style.transform = `translateX(${position}px)`;
  });

}

// ================= NAV ATIVA NO SCROLL =================
window.addEventListener('scroll', function() {

  const nav = document.querySelector('.nav');
  const heroSection = document.querySelector('.hero');

  if (!nav || !heroSection) return;

  if (window.scrollY > (heroSection.offsetHeight - 50)) {
    nav.classList.add('nav-active');
  } else {
    nav.classList.remove('nav-active');
  }

});




});