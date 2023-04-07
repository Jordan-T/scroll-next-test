import './style.scss';

let maxScroll = 0;
function updateMaxScroll() {
  maxScroll =
    Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    ) - window.innerHeight;
}
window.addEventListener(
  'scroll',
  () => {
    console.log(window.scrollY, maxScroll);
    if (window.scrollY === maxScroll) {
      watchWheel();
    } else if (window.scrollY - maxScroll < 10) {
      console.log('CANCEL');
    }
  },
  { passive: true }
);

window.addEventListener('resize', updateMaxScroll, { passive: true });
updateMaxScroll();

function watchWheel() {
  const hero = document.querySelector('a.hero');
  let currentHeight = hero.getBoundingClientRect().height;
  window.addEventListener(
    'wheel',
    (event) => {
      currentHeight += event.deltaY * 0.01;
      console.log(currentHeight);

      // Restrict scale
      currentHeight = Math.min(Math.max(50, currentHeight), 100);

      // Apply scale transform
      hero.style.height = `${currentHeight}px`;
    },
    { passive: true }
  );
}
