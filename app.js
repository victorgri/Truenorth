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

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();
  let isValid = true;

  // Ім'я - мінімум 3 символи, без цифр
  const nameInput = document.getElementById('name');
  const nameValue = nameInput.value.trim();
  const nameErrorMessage = document.createElement('div');
  
  if (nameValue.length < 3) {
    nameErrorMessage.textContent = "Name must be at least 3 characters.";
    nameErrorMessage.classList.add('error-message');
    nameInput.parentElement.appendChild(nameErrorMessage);
    isValid = false;
  } else if (/\d/.test(nameValue)) {
    nameErrorMessage.textContent = "Name cannot contain numbers.";
    nameErrorMessage.classList.add('error-message');
    nameInput.parentElement.appendChild(nameErrorMessage);
    isValid = false;
  } else {
    // Якщо ім'я коректне, прибираємо помилку
    if (nameInput.parentElement.contains(nameErrorMessage)) {
      nameInput.parentElement.removeChild(nameErrorMessage);
    }

    console.log(nameErrorMessage);
    
  }

  // Перевірка електронної пошти
  const emailInput = document.getElementById('email');
  const emailValue = emailInput.value.trim();
  const emailErrorMessage = document.createElement('div');
  
  if (!emailValue || !/\S+@\S+\.\S+/.test(emailValue)) {
    emailErrorMessage.textContent = "Please enter a valid email address.";
    emailErrorMessage.classList.add('error-message');
    emailInput.parentElement.appendChild(emailErrorMessage);
    isValid = false;
  } else {
    // Якщо email коректний, прибираємо помилку
    if (emailInput.parentElement.contains(emailErrorMessage)) {
      emailInput.parentElement.removeChild(emailErrorMessage);
    }
  }

  // Якщо валідація не пройшла, не відправляємо форму
  if (!isValid) {
    event.preventDefault();
  }
});


