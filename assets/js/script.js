/**
 * Add event on element(s)
 */
const addEventOnElem = (elem, type, callback) => {
  if (NodeList.prototype.isPrototypeOf(elem)) {
    elem.forEach(el => el.addEventListener(type, callback));
  } else if (elem) {
    elem.addEventListener(type, callback);
  }
};

/**
 * Navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navbarToggler = document.querySelector("[data-nav-toggler]");

const toggleNav = () => {
  navbar?.classList.toggle("active");
  navbarToggler?.classList.toggle("active");
};

const closeNav = () => {
  navbar?.classList.remove("active");
  navbarToggler?.classList.remove("active");
};

if (navbarToggler) {
  addEventOnElem(navbarToggler, "click", toggleNav);
}

if (navbarLinks.length > 0) {
  addEventOnElem(navbarLinks, "click", closeNav);
}

/**
 * Header active on scroll
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  if (header && backTopBtn) {
    const isActive = window.scrollY >= 100;
    header.classList.toggle("active", isActive);
    backTopBtn.classList.toggle("active", isActive);
  }
});

/**
 * Service item click behavior
 */
document.querySelectorAll('.service-item').forEach(item => {
  item.addEventListener('click', function () {
    // Remove active class from all items & articles
    document.querySelectorAll('.service-item').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.service-article').forEach(a => a.classList.remove('active'));

    // Add active class to clicked item
    this.classList.add('active');
    const serviceId = this.dataset.service;
    document.getElementById(serviceId)?.classList.add('active');
  });
});

/**
 * Sync scrolling between service content and navigation
 */
document.addEventListener('DOMContentLoaded', () => {
  const serviceContent = document.querySelector('.service-content');
  const servicesNav = document.querySelector('.services-nav');

  if (!serviceContent || !servicesNav) return;

  let isSyncingScroll = false;

  const syncScroll = (source, target) => {
    if (!isSyncingScroll) {
      isSyncingScroll = true;
      target.scrollTop = source.scrollTop;
      requestAnimationFrame(() => (isSyncingScroll = false));
    }
  };

  serviceContent.addEventListener('scroll', () => syncScroll(serviceContent, servicesNav));
  servicesNav.addEventListener('scroll', () => syncScroll(servicesNav, serviceContent));

  /**
   * Handle service item clicks (smooth scroll to corresponding article)
   */
  document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('click', function () {
      const serviceId = this.dataset.service;
      const targetArticle = document.getElementById(serviceId);

      if (targetArticle) {
        targetArticle.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Update active states
      document.querySelectorAll('.service-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    });
  });

  /**
   * Handle window resize (resync scroll positions)
   */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      serviceContent.scrollTop = servicesNav.scrollTop;
    }, 250);
  });
});
