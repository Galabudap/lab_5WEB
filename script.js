// ================================================================
// Лабораторна робота №4 — Частина 1 (чистий JavaScript)
// Галабуда Павло, КБ-208, варіант 5
// ================================================================

const VARIANT = 5; // номер варіанта (порядковий номер у журналі)

// ---------------------------------------------------------------
// 1. Зберігання даних у браузері (localStorage)
// ---------------------------------------------------------------

// Збираємо всю доступну інформацію про ОС та браузер
function collectSystemInfo() {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    languages: navigator.languages ? navigator.languages.join(', ') : '',
    cookieEnabled: navigator.cookieEnabled,
    online: navigator.onLine,
    hardwareConcurrency: navigator.hardwareConcurrency,
    deviceMemory: navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'невідомо',
    screen: screen.width + 'x' + screen.height,
    colorDepth: screen.colorDepth + ' bit',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    visitedAt: new Date().toLocaleString('uk-UA'),
  };
}

// Зберігаємо всю інформацію в localStorage одним ключем у вигляді JSON
// (localStorage зберігає лише рядки, тому JSON.stringify)
function saveSystemInfo() {
  const info = collectSystemInfo();
  localStorage.setItem('systemInfo', JSON.stringify(info));
}

// Виводимо ВЕСЬ вміст localStorage у футер
function renderLocalStorage() {
  const list = document.getElementById('storage-list');
  list.innerHTML = '';

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const raw = localStorage.getItem(key);

    // якщо значення — JSON-об'єкт, розгортаємо його по полях
    let value;
    try {
      value = JSON.parse(raw);
    } catch {
      value = raw;
    }

    if (value !== null && typeof value === 'object') {
      for (const field in value) {
        addRow(list, field, value[field]);
      }
    } else {
      addRow(list, key, raw);
    }
  }
}

function addRow(list, name, value) {
  const li = document.createElement('li');
  const b = document.createElement('b');
  b.textContent = name + ': ';
  li.appendChild(b);
  li.appendChild(document.createTextNode(String(value)));
  list.appendChild(li);
}

// ---------------------------------------------------------------
// 2. Відгуки роботодавців із сервера (Fetch API + async/await)
// ---------------------------------------------------------------
async function loadReviews() {
  const container = document.getElementById('reviews-list');
  container.textContent = 'Завантаження...';

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`
    );
    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }
    const comments = await response.json();

    container.innerHTML = '';
    // виводимо у тому порядку, в якому отримали
    comments.forEach((comment) => {
      const card = document.createElement('article');
      card.className = 'review';

      const title = document.createElement('h3');
      title.textContent = comment.name;

      const email = document.createElement('a');
      email.href = 'mailto:' + comment.email;
      email.textContent = comment.email;

      const body = document.createElement('p');
      body.textContent = comment.body;

      card.append(title, email, body);
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Помилка завантаження відгуків:', error);
    container.textContent = 'Не вдалося завантажити відгуки.';
  }
}

// ---------------------------------------------------------------
// 3. Модальне вікно з формою зворотного зв'язку (через 1 хвилину)
// ---------------------------------------------------------------
function setupModal() {
  const modal = document.getElementById('contact-modal');
  const closeBtn = document.getElementById('modal-close');

  function openModal() {
    // якщо вже закривали в цій сесії — повторно не показуємо
    if (sessionStorage.getItem('modalClosed')) return;
    modal.classList.add('open');
  }

  function closeModal() {
    modal.classList.remove('open');
    sessionStorage.setItem('modalClosed', 'true');
  }

  setTimeout(openModal, 60000); // 60 000 мс = 1 хвилина

  closeBtn.addEventListener('click', closeModal);

  // закриття кліком по темному фону
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  // закриття клавішею Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

// ---------------------------------------------------------------
// 4. Денна / нічна тема
// ---------------------------------------------------------------
function getThemeByTime() {
  const hours = new Date().getHours(); // 0–23
  // денна тема з 07:00 до 21:00, нічна — увесь інший час
  return hours >= 7 && hours < 21 ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.body.classList.toggle('dark-mode', theme === 'dark');
  const btn = document.getElementById('theme-toggle');
  btn.textContent = theme === 'dark' ? '☀️ Денна тема' : '🌙 Нічна тема';
}

function setupTheme() {
  let theme = getThemeByTime(); // автоматичне перемикання за часом
  applyTheme(theme);

  // ручне перемикання кнопкою
  document.getElementById('theme-toggle').addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
  });
}

// ---------------------------------------------------------------
// Запуск після завантаження сторінки
// ---------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  saveSystemInfo();
  renderLocalStorage();
  loadReviews();
  setupModal();
});
