const navLinks = document.getElementById('nav-links');

document.getElementById('menu-open').addEventListener('click', () => {
  navLinks.classList.add('active');
});

document.getElementById('menu-close').addEventListener('click', () => {
  navLinks.classList.remove('active');
});

const acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

function changeImage(button) {
  const img = button.querySelector("img");
  img.src = 'images/hero/hero-btn-img-white.png';  // змінюємо на картинку для ховера
}

function restoreImage(button) {
  const img = button.querySelector("img");
  img.src = "images/hero/hero-btn-img.png";  // повертаємо початкову картинку
}

