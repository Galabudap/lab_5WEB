import { useEffect, useState } from 'react';
import Header from './components/Header';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contacts from './components/Contacts';
import Reviews from './components/Reviews';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

// Денна тема з 07:00 до 21:00, нічна — увесь інший час
function getThemeByTime() {
  const hours = new Date().getHours();
  return hours >= 7 && hours < 21 ? 'light' : 'dark';
}

function App() {
  const [theme, setTheme] = useState('light');

  // Автоматичне перемикання: при першому завантаженні перевіряємо час
  useEffect(() => {
    setTheme(getThemeByTime());
  }, []);

  // Застосування стилів: клас dark на <html> вмикає Tailwind-варіанти dark:
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Ручне перемикання кнопкою в шапці
  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-200">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="mx-auto grid max-w-5xl gap-6 px-4 py-10 md:grid-cols-2">
        <About />
        <Education />
        <Experience />
        <Skills />
        <Contacts />
        <Reviews />
      </main>
      <Footer />
      <ContactForm />
    </div>
  );
}

export default App;
