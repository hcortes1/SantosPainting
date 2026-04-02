// Fetches and injects navbar.html and footer.html into every page

async function loadComponent(id, path) {
  const placeholder = document.getElementById(id);
  if (!placeholder) return;
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
    placeholder.innerHTML = await res.text();
  } catch (err) {
    console.error(err);
  }
}

// Resolve paths relative to the site root regardless of page depth
const root = document.location.pathname.includes('/pages/') ? '../' : './';

// Load navbar first, then init toggle logic once it's in the DOM
loadComponent('navbar-placeholder', root + 'components/navbar.html').then(() => {
  if (typeof initNavbar === 'function') initNavbar();
});
loadComponent('footer-placeholder', root + 'components/footer.html');
