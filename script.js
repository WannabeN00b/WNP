(() => {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const menuButton = document.getElementById('menuButton');
  const menuPanel = document.getElementById('menuPanel');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');
  const modalKicker = document.getElementById('modalKicker');
  const modalLink = document.getElementById('modalLink');
  const savedTheme = localStorage.getItem('mahede-theme');
  if (savedTheme === 'dark') body.classList.add('dark');

  themeToggle?.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('mahede-theme', body.classList.contains('dark') ? 'dark' : 'light');
  });

  function setMenu(open){
    if(!menuPanel || !menuButton) return;
    menuPanel.classList.toggle('open', open);
    menuPanel.setAttribute('aria-hidden', String(!open));
    menuButton.setAttribute('aria-expanded', String(open));
    body.classList.toggle('menu-open', open);
  }
  function closeMenu(){ setMenu(false); }
  menuButton?.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  document.querySelectorAll('.menu-links a[href^="#"]').forEach(a => a.addEventListener('click', closeMenu));

  const filterButtons = document.querySelectorAll('.filter');
  const projects = document.querySelectorAll('.project');
  filterButtons.forEach(btn => btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active')); btn.classList.add('active');
    const filter = btn.dataset.filter;
    projects.forEach(p => p.classList.toggle('hidden', filter !== 'all' && !p.dataset.category.includes(filter)));
  }));

  const content = {
    light:{k:'Case Study / 01',t:'Light Studio / Light Builder',d:'A custom FiveM/Qbox cinematic lighting system created for car showcases, meets, dealerships, photography and cinematic scenes. The project explores portable lights, colour, brightness, range, shadows, vehicle attachment, presets and custom flat light panels.',l:'#work'},
    hydragonz:{k:'Community / 02',t:'Hydragonz',d:'A gaming and FiveM community ecosystem built around server development, Discord, creator identity and player experience. WANNABENOOB sits at the centre of the community as owner.',l:'https://discord.gg/EbyqKHkJaD'},
    motion:{k:'Discipline / 03',t:'Motion & Video',d:'Creative editing and motion work using After Effects and Premiere Pro, with a focus on cinematic pacing, visual treatment, gaming content and polished presentation.',l:'#contact'},
    web:{k:'Discipline / 04',t:'Interactive Web',d:'Responsive HTML, CSS and JavaScript experiences with editorial typography, interaction, visual systems and purposeful navigation.',l:'#contact'},
    photo:{k:'Discipline / 05',t:'Photography',d:'Photography and image-making shaped by composition, atmosphere, colour and storytelling — another foundation of the visual practice.',l:'#contact'},
    qbox:{k:'Development / 06',t:'FiveM / Qbox Systems',d:'Custom server resources, NUI interfaces, gameplay systems and visual tools across Qbox/FiveM, with a strong emphasis on usable UI and cinematic presentation.',l:'#contact'}
  };
  const serviceContent = {
    design:['Service / 01','Visual & Graphic Design','Graphic identities, layouts, promotional artwork and visual systems built around clear hierarchy and strong composition.'],
    motion:['Service / 02','Motion & Video','Editing, motion graphics, cinematic treatments and creator content using After Effects and Premiere Pro.'],
    web:['Service / 03','Web & Interactive','Responsive websites and interfaces using HTML, CSS and JavaScript, with a strong editorial and UX focus.'],
    fivem:['Service / 04','FiveM / Qbox Development','Custom resources, NUI, lighting tools, server systems and interactive experiences for GTA V communities.'],
    creator:['Service / 05','Creator & Community Branding','Creator identity, Discord/community presentation, gaming visuals and digital ecosystems around WANNABENOOB.']
  };
  function openModal(k,t,d,l='#contact'){
    if(!modal || !modalKicker || !modalTitle || !modalText || !modalLink) return; modalKicker.textContent=k; modalTitle.textContent=t; modalText.textContent=d; modalLink.href=l; modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
  }
  function closeModal(){if(!modal) return; modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow='';}
  document.querySelectorAll('.open-project').forEach(btn => btn.addEventListener('click', () => { const x=content[btn.dataset.open]; openModal(x.k,x.t,x.d,x.l); }));
  document.querySelectorAll('.service').forEach(btn => btn.addEventListener('click', () => { const x=serviceContent[btn.dataset.service]; openModal(x[0],x[1],x[2]); }));
  modalClose?.addEventListener('click', closeModal); modal?.addEventListener('click', e => {if(e.target===modal) closeModal()});
  document.addEventListener('keydown', e => {if(e.key==='Escape'){closeModal();closeMenu()}});
})();
