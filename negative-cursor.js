(() => {
  const cursor = document.getElementById('cursor-invert');
  if (!cursor || !window.matchMedia('(pointer:fine)').matches) return;

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let tx = x;
  let ty = y;
  let visible = false;

  window.addEventListener('pointermove', (event) => {
    tx = event.clientX;
    ty = event.clientY;
    if (!visible) {
      visible = true;
      cursor.classList.add('is-visible');
    }
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    visible = false;
    cursor.classList.remove('is-visible');
  });

  function animate() {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    cursor.style.transform = `translate3d(${x}px,${y}px,0)`;
    requestAnimationFrame(animate);
  }
  animate();
})();
