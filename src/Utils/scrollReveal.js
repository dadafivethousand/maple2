const ATTR = '[data-sr]';
const VISIBLE = 'sr-visible';

function attach(el, io) {
  if (el._srBound) return;
  el._srBound = true;
  io.observe(el);
}

export function initScrollReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = Number(el.dataset.srDelay) || 0;
        if (delay) {
          setTimeout(() => el.classList.add(VISIBLE), delay);
        } else {
          el.classList.add(VISIBLE);
        }
        io.unobserve(el);
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll(ATTR).forEach((el) => attach(el, io));

  const mo = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      m.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        if (node.matches?.(ATTR)) attach(node, io);
        node.querySelectorAll?.(ATTR).forEach((el) => attach(el, io));
      });
    });
  });

  mo.observe(document.body, { childList: true, subtree: true });

  return () => {
    io.disconnect();
    mo.disconnect();
  };
}
