import { useEffect, useState } from 'react';

// ЗАМІНІТЬ YOUR_FORM_ID на свій endpoint із formspree.io (той самий, що в Частині 1)
const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';

const inputClass =
  'rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100';

// Завдання 3: модальне вікно з формою зворотного зв'язку
function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);

  // Через 1 хвилину відкриваємо модальне вікно
  useEffect(() => {
    // якщо користувач уже закривав вікно в цій сесії — не показуємо знову
    if (sessionStorage.getItem('modalClosed')) return;

    const timer = setTimeout(() => setIsOpen(true), 60000); // 60 000 мс

    // прибираємо таймер, якщо компонент зникне раніше
    return () => clearTimeout(timer);
  }, []);

  function handleClose() {
    setIsOpen(false);
    sessionStorage.setItem('modalClosed', 'true');
  }

  // Умовний рендеринг: поки isOpen === false, нічого не показуємо
  return (
    isOpen && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
      >
        <div className="relative w-full max-w-md rounded-2xl bg-white p-6 text-slate-800 shadow-2xl dark:bg-slate-900 dark:text-slate-200">
          <h2 id="contact-title" className="mb-4 font-mono text-xl font-bold text-emerald-600 dark:text-emerald-400">
            Зв'яжіться зі мною
          </h2>

          <form action={FORMSPREE_URL} method="POST" className="flex flex-col gap-3">
            <label className="flex flex-col gap-1 text-sm font-medium">
              Ім'я
              <input type="text" name="name" required className={inputClass} />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium">
              Email
              <input type="email" name="email" required className={inputClass} />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium">
              Номер телефону
              <input type="tel" name="phone" placeholder="+380..." required className={inputClass} />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium">
              Повідомлення
              <textarea name="message" rows="4" required className={inputClass} />
            </label>

            <div className="mt-2 flex gap-3">
              <button type="submit" className="flex-1 rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-emerald-400">
                Надіслати
              </button>
              <button type="button" onClick={handleClose} className="rounded-lg border border-slate-300 px-4 py-2 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                Закрити
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default ContactForm;
