document.getElementById('year').textContent = new Date().getFullYear();

const navigationLinks = [...document.querySelectorAll('nav a')];
const sections = navigationLinks
  .map(link => link.getAttribute('href'))
  .filter(href => href.startsWith('#'))
  .map(href => document.querySelector(href))
  .filter(Boolean);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navigationLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-25% 0px -65% 0px' });

sections.forEach(section => observer.observe(section));

const copyEmailButton = document.querySelector('.copy-email');

copyEmailButton?.addEventListener('click', async () => {
  const email = copyEmailButton.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
  } catch {
    const field = document.createElement('textarea');
    field.value = email;
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    document.execCommand('copy');
    field.remove();
  }

  copyEmailButton.textContent = 'Email copied!';
  copyEmailButton.classList.add('copied');
  window.setTimeout(() => {
    copyEmailButton.textContent = 'Copy email';
    copyEmailButton.classList.remove('copied');
  }, 1800);
});
