const stages = [
  { image: '/assets/scene.jpg', alt: 'Nook introduces a pretend vegetable-shop payment', text: '“You are at a vegetable shop. The shopkeeper asks for ₹50.” Nook tells you the situation before any buttons appear.' },
  { image: '/assets/mode.jpg', alt: 'Nook offers Practice, Watch and Read choices', text: 'Choose the pace that feels right: practise each tap, watch a demonstration, or read beside the real app.' },
  { image: '/assets/phone-home.jpg', alt: 'Nook highlights the Google Pay icon on its practice phone', text: 'The practice phone shows where to start. A glow, a pointing hand and an optional hint guide each step.' },
  { image: '/assets/safety.jpg', alt: 'Nook asks a pretend safety question about receiving money', text: 'A pretend request asks for a PIN. Practising the answer helps make the safe choice feel familiar.' },
  { image: '/assets/complete.jpg', alt: 'Nook shows the completed lesson and next action', text: 'A short recap leads into the next attempt on the real app—only when the learner is ready.' }
];
const tabs = [...document.querySelectorAll('.journey-tab')];
const image = document.querySelector('#journey-image');
const description = document.querySelector('#journey-description');
const step = document.querySelector('#journey-step');
function chooseStage(index) {
  const item = stages[index];
  if (!item) return;
  tabs.forEach((tab, i) => { tab.classList.toggle('active', i === index); tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
  image.src = item.image;
  image.alt = item.alt;
  description.textContent = item.text;
  step.textContent = `${String(index + 1).padStart(2, '0')} / 05`;
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => chooseStage(i));
  tab.addEventListener('keydown', event => {
    if (!['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (i + (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1) + tabs.length) % tabs.length;
    chooseStage(next);
    tabs[next].focus();
  });
});
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
  const target = document.querySelector(link.getAttribute('href'));
  if (target) setTimeout(() => target.focus?.({ preventScroll: true }), 500);
}));
