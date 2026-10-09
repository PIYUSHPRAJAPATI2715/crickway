// ==========================================================================
// CRICWAY CLONE - INTERACTIVE JAVASCRIPT
// Handles Login Modal, Category Tabs, Filter Pills & Ticker Slider
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
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Attach click listeners to LOGIN buttons
  loginBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Close modal on 'X' click
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close modal on backdrop overlay click
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Close modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  // Form submit dummy handler
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
  // 2. CATEGORY TABS INTERACTIVITY
  // ------------------------------------------------------------------------
  const categoryTabs = document.querySelectorAll('.tabs-bar__tab');
  const cricketSection = document.getElementById('cricketSection');
  const footballSection = document.getElementById('footballSection');

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      categoryTabs.forEach(t => t.classList.remove('tabs-bar__tab--active'));
      // Add active class to clicked tab
      tab.classList.add('tabs-bar__tab--active');

      const categoryName = tab.dataset.category;

      // Filter sections based on category selection
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
  // 3. FILTER PILLS TOGGLE (+ LIVE, + VIRTUAL, + PREMIUM)
  // ------------------------------------------------------------------------
  const filterPills = document.querySelectorAll('.header-pills .pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('active');
    });
  });

  // ------------------------------------------------------------------------
  // 4. MOBILE HAMBURGER MENU TOGGLE
  // ------------------------------------------------------------------------
  const hamburger = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebarNav');

  if (hamburger && sidebar) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  // ------------------------------------------------------------------------
  // 5. TOP TICKER HORIZONTAL MOUSE DRAG SCROLL
  // ------------------------------------------------------------------------
  const tickerContainer = document.querySelector('.ticker-section');
  if (tickerContainer) {
    let isDown = false;
    let startX;
    let scrollLeft;

    tickerContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      tickerContainer.classList.add('active');
      startX = e.pageX - tickerContainer.offsetLeft;
      scrollLeft = tickerContainer.scrollLeft;
    });

    tickerContainer.addEventListener('mouseleave', () => {
      isDown = false;
      tickerContainer.classList.remove('active');
    });

    tickerContainer.addEventListener('mouseup', () => {
      isDown = false;
      tickerContainer.classList.remove('active');
    });

    tickerContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - tickerContainer.offsetLeft;
      const walk = (x - startX) * 2; // scroll speed factor
      tickerContainer.scrollLeft = scrollLeft - walk;
    });
  }

  // ------------------------------------------------------------------------
  // 6. ODDS BOX CLICK HIGHLIGHT FEEDBACK
  // ------------------------------------------------------------------------
  const oddsBoxes = document.querySelectorAll('.odds-box:not(.disabled)');
  oddsBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const val = box.textContent.trim();
      if (val && val !== '-') {
        box.style.transform = 'scale(0.95)';
        setTimeout(() => {
          box.style.transform = 'scale(1)';
        }, 150);
      }
    });
  });
});
