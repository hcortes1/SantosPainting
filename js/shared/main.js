// main

(function () {
  // Inject modal markup once
  const modal = document.createElement('div');
  modal.id = 'gallery-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Image viewer');
  modal.innerHTML = `
    <button id="gallery-modal-close" aria-label="Close">&times;</button>
    <img id="gallery-modal-img" src="" alt="" />
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector('#gallery-modal-img');

  function openModal(src, alt) {
    modalImg.src = src;
    modalImg.alt = alt || '';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    modalImg.src = '';
  }

  // Wire up gallery images (handles images added after DOMContentLoaded via delegation)
  document.addEventListener('click', function (e) {
    if (e.target.matches('.gallery-img')) {
      openModal(e.target.src, e.target.alt);
    }
  });

  modal.querySelector('#gallery-modal-close').addEventListener('click', closeModal);

  // Close on backdrop click
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
})();
