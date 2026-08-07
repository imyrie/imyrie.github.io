document.getElementById('year').textContent = new Date().getFullYear();

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.style.transform = `translateY(${window.scrollY > 50 ? '-6px' : '0'})`;
});
