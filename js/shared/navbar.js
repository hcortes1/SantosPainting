// navbar code

function initNavbar() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdown = document.querySelector('.dropdown');

  // Hamburger — open/close the nav menu
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Services dropdown — toggle on mobile tap
  if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener('click', () => {
      dropdown.classList.toggle('open');
    });
  }

  // Close menu when a nav link is clicked
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        if (dropdown) dropdown.classList.remove('open');
      });
    });
  }
}
