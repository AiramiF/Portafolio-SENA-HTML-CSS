// Script del menú de navegación del sitio.
// Este archivo controla el comportamiento del menú móvil, el cierre al hacer clic y el efecto visual al desplazarse.

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const hamburgerBtn = document.querySelector('.hamburger-btn');

  if (hamburgerBtn && nav) {
    // Abre o cierra el menú al hacer clic en el botón hamburguesa.
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle('menu-open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
      
      // Bloquear scroll de la página de fondo
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Cierra el menú cuando el usuario selecciona un enlace del menú.
    const navLinksList = nav.querySelectorAll('.nav-links a');
    navLinksList.forEach(link => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('menu-open')) {
          nav.classList.remove('menu-open');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });

    // Cierra el menú si el usuario hace clic fuera de él.
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('menu-open') && !nav.contains(e.target)) {
        nav.classList.remove('menu-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Cambia la apariencia de la barra de navegación al hacer scroll en la página.
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(60, 20, 0, 0.1)';
      } else {
        if (!nav.classList.contains('menu-open')) {
          nav.style.background = 'rgba(255, 255, 255, 0.92)';
          nav.style.boxShadow = 'none';
        }
      }
    });
  }
});
