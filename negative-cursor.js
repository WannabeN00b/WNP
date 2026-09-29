(() => {
  const cursor = document.getElementById('cursor-invert');
  if (!cursor || !window.matchMedia('(pointer:fine)').matches) return;

  let x = 0, y = 0;
  let visible = false;
  let raf = 0;

  const render = () => {
    raf = 0;
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const move = (e) => {
    x = e.clientX;
    y = e.clientY;
    if (!visible) {
      visible = true;
      cursor.classList.add('is-visible');
    }
    if (!raf) raf = requestAnimationFrame(render);
  };

  const hide = () => {
    visible = false;
    cursor.classList.remove('is-visible');
  };

  window.addEventListener('pointermove', move, { passive: true });
  window.addEventListener('pointerleave', hide, { passive: true });
  window.addEventListener('blur', hide, { passive: true });
})();
