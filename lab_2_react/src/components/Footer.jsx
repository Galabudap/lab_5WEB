import { useEffect, useState } from 'react';

// Завдання 1: системна інформація у футері
function Footer() {
  const [systemInfo, setSystemInfo] = useState(null);

  // Запускається один раз при монтуванні компонента
  useEffect(() => {
    // 1) зчитуємо дані з navigator
    const info = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: String(navigator.cookieEnabled),
      screen: `${window.screen.width}x${window.screen.height}`,
    };

    // 2) зберігаємо в localStorage (тільки рядки → JSON.stringify)
    localStorage.setItem('systemInfo', JSON.stringify(info));

    // 3) отримуємо з localStorage і кладемо у стан для відображення
    setSystemInfo(JSON.parse(localStorage.getItem('systemInfo')));
  }, []);

  return (
    <footer className="border-t border-slate-200 py-6 text-center font-mono text-sm text-slate-500 dark:border-slate-800">
      <p>&copy; 2026 Галабуда Павло</p>

      {systemInfo && (
        <ul className="mx-auto mt-4 max-w-5xl space-y-1 px-4 text-left text-xs break-words">
          {Object.entries(systemInfo).map(([key, value]) => (
            <li key={key}>
              <span className="text-emerald-600 dark:text-emerald-400">{key}:</span> {value}
            </li>
          ))}
        </ul>
      )}
    </footer>
  );
}

export default Footer;
