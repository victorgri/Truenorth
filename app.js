const navLinks = document.getElementById('nav-links');

document.getElementById('menu-open').addEventListener('click', () => {
  navLinks.classList.add('active');
});

document.getElementById('menu-close').addEventListener('click', () => {
  navLinks.classList.remove('active');
});

document.querySelectorAll('.faq-question-btn').forEach(button => {
  button.addEventListener('click', function() {
    this.classList.toggle('active-btn')
    const answer = this.closest('.faq-question').querySelector('.faq-question-answer');
    answer.classList.toggle('visible'); 
  });
});


function changeImage(button) {
  const img = button.querySelector("img");
  img.src = 'images/hero/hero-btn-img-white.png';  // змінюємо на картинку для ховера
}

function restoreImage(button) {
  const img = button.querySelector("img");
  img.src = "images/hero/hero-btn-img.png";  // повертаємо початкову картинку
}

