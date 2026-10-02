(() => {
  'use strict';

  const body = document.body;
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const menuButton = document.getElementById('menuButton');
  const menuPanel = document.getElementById('menuPanel');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');
  const modalKicker = document.getElementById('modalKicker');
  const modalLink = document.getElementById('modalLink');

  const STORAGE_KEY = 'mahede-theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme, save = true) {
    const isDark = theme === 'dark';
    body.classList.toggle('dark', isDark);
    root.style.colorScheme = isDark ? 'dark' : 'light';

    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    }

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute('content', isDark ? '#0d0d0c' : '#f5f5f0');

    if (save) localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
  }

  applyTheme(getPreferredTheme(), false);

  themeToggle?.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    applyTheme(body.classList.contains('dark') ? 'light' : 'dark');
  });

  function setMenu(open) {
    if (!menuPanel || !menuButton) return;
    menuPanel.classList.toggle('open', open);
    menuPanel.setAttribute('aria-hidden', String(!open));
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    body.classList.toggle('menu-open', open);
  }

  function closeMenu() { setMenu(false); }

  menuButton?.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  document.querySelectorAll('.menu-links a[href^="#"]').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  const filterButtons = [...document.querySelectorAll('.filter')];
  const projects = [...document.querySelectorAll('.project')];
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter || 'all';
      filterButtons.forEach((item) => item.classList.toggle('active', item === button));
      projects.forEach((project) => {
        const categories = (project.dataset.category || '').split(/\s+/);
        project.classList.toggle('hidden', filter !== 'all' && !categories.includes(filter));
      });
    });
  });

  const content = {
    light: { k:'Case Study / 01', t:'Light Studio / Light Builder', d:'A custom FiveM/Qbox cinematic lighting system created for car showcases, meets, dealerships, photography and cinematic scenes. The project explores portable lights, colour, brightness, range, shadows, vehicle attachment, presets and custom flat light panels.', l:'#work' },
    hydragonz: { k:'Community / 02', t:'Hydragonz', d:'A gaming and FiveM community ecosystem built around server development, Discord, creator identity and player experience. WANNABENOOB sits at the centre of the community as owner.', l:'https://discord.gg/EbyqKHkJaD' },
    motion: { k:'Discipline / 03', t:'Motion & Video', d:'Creative editing and motion work using After Effects and Premiere Pro, with a focus on cinematic pacing, visual treatment, gaming content and polished presentation.', l:'#contact' },
    web: { k:'Discipline / 04', t:'Interactive Web', d:'Responsive HTML, CSS and JavaScript experiences with editorial typography, interaction, visual systems and purposeful navigation.', l:'#contact' },
    photo: { k:'Discipline / 05', t:'Photography', d:'Photography and image-making shaped by composition, atmosphere, colour and storytelling — another foundation of the visual practice.', l:'#contact' },
    qbox: { k:'Development / 06', t:'FiveM / Qbox Systems', d:'Custom server resources, NUI interfaces, gameplay systems and visual tools across Qbox/FiveM, with a strong emphasis on usable UI and cinematic presentation.', l:'#contact' }
  };

  const serviceContent = {
    design:['Service / 01','Visual & Graphic Design','Graphic identities, layouts, promotional artwork and visual systems built around clear hierarchy and strong composition.'],
    motion:['Service / 02','Motion & Video','Editing, motion graphics, cinematic treatments and creator content using After Effects and Premiere Pro.'],
    web:['Service / 03','Web & Interactive','Responsive websites and interfaces using HTML, CSS and JavaScript, with a strong editorial and UX focus.'],
    fivem:['Service / 04','FiveM / Qbox Development','Custom resources, NUI, lighting tools, server systems and interactive experiences for GTA V communities.'],
    creator:['Service / 05','Creator & Community Branding','Creator identity, Discord/community presentation, gaming visuals and digital ecosystems around WANNABENOOB.']
  };

  function openModal(k, t, d, link = '#contact') {
    if (!modal || !modalKicker || !modalTitle || !modalText || !modalLink) return;
    modalKicker.textContent = k;
    modalTitle.textContent = t;
    modalText.textContent = d;
    modalLink.href = link;
    if (/^https?:\/\//i.test(link)) {
      modalLink.target = '_blank';
      modalLink.rel = 'noopener';
    } else {
      modalLink.removeAttribute('target');
      modalLink.removeAttribute('rel');
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';
    modalClose?.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
  }

  document.querySelectorAll('.open-project').forEach((button) => {
    button.addEventListener('click', () => {
      const item = content[button.dataset.open];
      if (item) openModal(item.k, item.t, item.d, item.l);
    });
  });

  document.querySelectorAll('.service').forEach((button) => {
    button.addEventListener('click', () => {
      const item = serviceContent[button.dataset.service];
      if (item) openModal(item[0], item[1], item[2]);
    });
  });

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
      closeMenu();
    }
  });
})();
