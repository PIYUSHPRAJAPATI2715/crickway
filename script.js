// ==========================================================================
// CRICWAY CLONE - INTERACTIVE JAVASCRIPT
// Mobile Responsive Drawer, Login Modal, Tabs & Touch Slider
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. LOGIN MODAL CONTROLS
  // ------------------------------------------------------------------------
  const modalOverlay = document.getElementById('loginModal');
  const loginBtns = document.querySelectorAll('.btn-login, .open-login-modal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const demoBtn = document.querySelector('.modal-demo-btn');
  const loginForm = document.getElementById('loginForm');

  function openModal() {
    if (modalOverlay) {
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  loginBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('usernameInput')?.value;
      if (username) {
        alert(`Welcome back, ${username}! (Demo login success)`);
        closeModal();
      } else {
        alert('Please enter your username');
      }
    });
  }

  if (demoBtn) {
    demoBtn.addEventListener('click', () => {
      alert('Logging in with Demo ID...');
      closeModal();
    });
  }

  // ------------------------------------------------------------------------
  // 2. MOBILE SIDEBAR DRAWER TOGGLE
  // ------------------------------------------------------------------------
  const hamburger = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebarNav');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  function toggleMobileSidebar() {
    if (sidebar && sidebarOverlay) {
      const isOpen = sidebar.classList.contains('mobile-open');
      if (isOpen) {
        sidebar.classList.remove('mobile-open');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        sidebar.classList.add('mobile-open');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  }

  function closeMobileSidebar() {
    if (sidebar && sidebarOverlay) {
      sidebar.classList.remove('mobile-open');
      sidebarOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeMobileSidebar);
  }

  // Close sidebar on clicking any sidebar link
  const sidebarLinks = document.querySelectorAll('.sidebar__item');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', closeMobileSidebar);
  });

  // ------------------------------------------------------------------------
  // 3. CATEGORY TABS INTERACTIVITY
  // ------------------------------------------------------------------------
  const categoryTabs = document.querySelectorAll('.tabs-bar__tab');
  const cricketSection = document.getElementById('cricketSection');
  const footballSection = document.getElementById('footballSection');

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('tabs-bar__tab--active'));
      tab.classList.add('tabs-bar__tab--active');

      const categoryName = tab.dataset.category;

      if (categoryName === 'cricket') {
        if (cricketSection) cricketSection.style.display = 'block';
        if (footballSection) footballSection.style.display = 'none';
      } else if (categoryName === 'football') {
        if (cricketSection) cricketSection.style.display = 'none';
        if (footballSection) footballSection.style.display = 'block';
      } else if (categoryName === 'inplay') {
        if (cricketSection) cricketSection.style.display = 'block';
        if (footballSection) footballSection.style.display = 'block';
      }
    });
  });

  // ------------------------------------------------------------------------
  // 4. FILTER PILLS TOGGLE (+ LIVE, + VIRTUAL, + PREMIUM)
  // ------------------------------------------------------------------------
  const filterPills = document.querySelectorAll('.header-pills .pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('active');
    });
  });

  // ------------------------------------------------------------------------
  // 5. TOUCH & MOUSE DRAG SCROLL FOR TOP TICKER
  // ------------------------------------------------------------------------
  const tickerContainer = document.querySelector('.ticker-section');
  if (tickerContainer) {
    let isDown = false;
    let startX;
    let scrollLeft;

    tickerContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - tickerContainer.offsetLeft;
      scrollLeft = tickerContainer.scrollLeft;
    });

    tickerContainer.addEventListener('mouseleave', () => { isDown = false; });
    tickerContainer.addEventListener('mouseup', () => { isDown = false; });

    tickerContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - tickerContainer.offsetLeft;
      const walk = (x - startX) * 2;
      tickerContainer.scrollLeft = scrollLeft - walk;
    });
  }
});
