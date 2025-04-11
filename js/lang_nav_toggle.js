
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.responsive-nav'); // الكلاس الصحيح
  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  const langButtons = document.querySelectorAll('.lang-switcher-toggle button');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // منطق تغيير اللغة هنا إذا احتجت
    });
  });
});
