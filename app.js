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
  img.src = 'images/hero/hero-btn-img-white.svg';  // змінюємо на картинку для ховера
}

function restoreImage(button) {
  const img = button.querySelector("img");
  img.src = "images/hero/hero-btn-img.svg";  // повертаємо початкову картинку
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

const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let t = 0;

// Базові точки для зеленої хвилі
const baseWavePoints = [0, 60, 80, 30, 160, 90, 240, 40, 320, 100, 400, 60, 512, 80];

// Хвильові параметри
const wave1 = {
  color: "green",
};

const wave2 = {
  color: "red",
};

// Генерація точок з анімацією + модифікація (зліва-нижче, справа-вище)
function generateModifiedPoints(basePoints, phaseShift = 0, flip = false) {
  const result = [];
  for (let i = 0; i < basePoints.length; i += 2) {
    const x = basePoints[i];
    const baseY = basePoints[i + 1];
    const ratio = (x / canvas.width - 0.5) * 2; // від -1 до 1
    const offset = Math.sin((t + x + phaseShift) * 0.01) * 5;
    const shift = ratio * 40; // асиметричне зміщення

    // Якщо flip == true, то хвиля зліва нижче, справа вище
    const yMod = baseY + offset + (flip ? shift : -shift);
    result.push(x, yMod);
  }
  return result;
}

// Малювання хвилі
function drawWaveWithStrokeAndGradient(points, color) {
  const path = new Path2D();
  const coords = [];

  for (let i = 0; i < points.length; i += 2) {
    coords.push({
      x: points[i],
      y: points[i + 1]
    });
  }

  path.moveTo(coords[0].x, coords[0].y);
  for (let i = 1; i < coords.length - 1; i++) {
    const xc = (coords[i].x + coords[i + 1].x) / 2;
    const yc = (coords[i].y + coords[i + 1].y) / 2;
    path.quadraticCurveTo(coords[i].x, coords[i].y, xc, yc);
  }

  // Верхній контур — stroke
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.stroke(path);

  // Заливка градієнтом
  ctx.save();
  path.lineTo(canvas.width, canvas.height);
  path.lineTo(0, canvas.height);
  path.closePath();

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, "transparent");

  ctx.fillStyle = gradient;
  ctx.fill(path);
  ctx.restore();
}

// Анімація
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const greenPoints = generateModifiedPoints(baseWavePoints, 0, false);
  const redPoints = generateModifiedPoints(baseWavePoints, 200, true);

  drawWaveWithStrokeAndGradient(greenPoints, wave1.color);
  drawWaveWithStrokeAndGradient(redPoints, wave2.color);

  t += 1;
  requestAnimationFrame(animate);
}

animate();

const chartCanvas = document.getElementById('chart');
const ctx2 = chartCanvas.getContext('2d');

// Установка фиксированных размеров
const W = 263;
const H = 165;
chartCanvas.width = W;
chartCanvas.height = H;

const candleWidth = 17;
const candleGap = 16;
const maxCandles = Math.floor(W / (candleWidth + candleGap));
const centerY = H / 2;

const wickTopLengthMin = 5;
const wickTopLengthMax = 20;
const wickBottomLengthMin = 5;
const wickBottomLengthMax = 20;

const growthSpeed = 20;

let candles = [];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCandle() {
  return {
    direction: Math.random() < 0.5 ? 'up' : 'down',
    bodyHeight: randomInt(growthSpeed * 1, growthSpeed * 4),
    wickTop: randomInt(wickTopLengthMin, wickTopLengthMax),
    wickBottom: randomInt(wickBottomLengthMin, wickBottomLengthMax),
    drawnHeight: 0,
  };
}

function drawCandle(index) {
  const c = candles[index];
  const x = index * (candleWidth + candleGap);
  ctx2.lineWidth = 2;
  const halfWidth = candleWidth / 2;

  let color = c.direction === 'up' ? '#26a69a' : '#ef5350';
  ctx2.strokeStyle = color;
  ctx2.fillStyle = color;

  ctx2.beginPath();

  let progress = c.drawnHeight / c.bodyHeight;

  if (c.direction === 'up') {
    let wickTopCurrent = c.wickTop * progress;
    let topY = centerY - c.drawnHeight - wickTopCurrent;
    let wickBottomCurrent = c.wickBottom * progress;
    let bottomY = centerY + wickBottomCurrent;

    ctx2.moveTo(x + halfWidth, centerY);
    ctx2.lineTo(x + halfWidth, bottomY);
    ctx2.moveTo(x + halfWidth, centerY - c.drawnHeight);
    ctx2.lineTo(x + halfWidth, topY);
    ctx2.stroke();

    ctx2.fillRect(x, centerY - c.drawnHeight, candleWidth, c.drawnHeight);
  } else {
    let wickTopCurrent = c.wickTop * progress;
    let topY = centerY - wickTopCurrent;
    let wickBottomCurrent = c.wickBottom * progress;
    let bottomY = centerY + c.drawnHeight + wickBottomCurrent;

    ctx2.moveTo(x + halfWidth, topY);
    ctx2.lineTo(x + halfWidth, centerY);
    ctx2.moveTo(x + halfWidth, centerY + c.drawnHeight);
    ctx2.lineTo(x + halfWidth, bottomY);
    ctx2.stroke();

    ctx2.fillRect(x, centerY, candleWidth, c.drawnHeight);
  }
}

function redraw() {
  ctx2.clearRect(0, 0, W, H);
  for(let i=0; i<candles.length; i++) {
    drawCandle(i);
  }
}

function animateCandle(index, callback) {
  const c = candles[index];
  let lastTime = performance.now();

  function step(time) {
    let delta = (time - lastTime) / 1000;
    lastTime = time;

    c.drawnHeight += growthSpeed * delta;
    if (c.drawnHeight > c.bodyHeight) c.drawnHeight = c.bodyHeight;

    redraw();

    if (c.drawnHeight < c.bodyHeight) {
      requestAnimationFrame(step);
    } else {
      callback && callback();
    }
  }
  requestAnimationFrame(step);
}

function loop() {
  if (candles.length < maxCandles) {
    candles.push(generateCandle());
    animateCandle(candles.length -1, loop);
  } else {
    candles.shift();
    candles.push(generateCandle());
    animateCandle(candles.length -1, loop);
  }
}

loop();
