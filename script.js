document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.main-nav');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const galleryItems = document.querySelectorAll('.gallery-item img, .menu-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  let index = 0;

  const show = (nextIndex) => {
    if (!galleryItems.length) return;
    if (nextIndex < 0) nextIndex = galleryItems.length - 1;
    if (nextIndex >= galleryItems.length) nextIndex = 0;
    index = nextIndex;
    const item = galleryItems[index];
    lightboxImg.src = item.src;
    lightboxCaption.textContent = item.alt || 'Gallery image';
  };

  galleryItems.forEach((img, i) => {
    img.addEventListener('click', () => {
      lightbox.style.display = 'flex';
      show(i);
    });
  });

  const hideLightbox = () => {
    lightbox.style.display = 'none';
  };

  closeBtn?.addEventListener('click', hideLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) hideLightbox();
  });

  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    show(index - 1);
  });

  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    show(index + 1);
  });

  mobileMenuToggle?.addEventListener('click', () => {
    nav?.classList.toggle('active');
  });

  nav?.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      const target = anchor.getAttribute('href');
      if (target === '#') return;
      nav.classList.remove('active');
      const section = document.querySelector(target);
      if (!section) return;
      const top = section.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  document.addEventListener('keydown', (event) => {
    if (lightbox.style.display !== 'flex') return;

    if (event.key === 'Escape') {
      hideLightbox();
    }

    if (event.key === 'ArrowLeft') {
      show(index - 1);
    }

    if (event.key === 'ArrowRight') {
      show(index + 1);
    }
  });
});
