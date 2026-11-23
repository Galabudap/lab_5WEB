const links = [
  { href: '#about', label: 'Про мене' },
  { href: '#education', label: 'Освіта' },
  { href: '#experience', label: 'Досвід' },
  { href: '#skills', label: 'Навички' },
  { href: '#contacts', label: 'Контакти' },
  { href: '#reviews', label: 'Відгуки' },
];

function Header({ theme, onToggleTheme }) {
  return (
    <header className="relative border-b border-emerald-500/20 bg-linear-to-br from-emerald-50 via-white to-cyan-50 px-6 py-16 text-center dark:from-slate-900 dark:via-slate-950 dark:to-emerald-950">
      {/* Кнопка ручного перемикання теми */}
      <button
        type="button"
        onClick={onToggleTheme}
        className="absolute top-4 right-4 rounded-full border border-emerald-500/40 px-4 py-1.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-500 hover:text-white dark:text-emerald-300 dark:hover:text-slate-950"
      >
        {theme === 'dark' ? '☀️ Денна тема' : '🌙 Нічна тема'}
      </button>

      <h1 className="font-mono text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
        Галабуда Павло<span className="animate-pulse text-emerald-500 dark:text-emerald-400">_</span>
      </h1>
      <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">Студент групи КБ-208, НУ «Львівська політехніка»</p>
      <nav>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-block rounded-full border border-emerald-500/40 px-5 py-2 text-sm font-medium text-emerald-700 transition hover:scale-105 hover:bg-emerald-500 hover:text-white dark:text-emerald-300 dark:hover:bg-emerald-400 dark:hover:text-slate-950"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
