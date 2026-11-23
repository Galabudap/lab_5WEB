function About() {
  return (
    <section id="about" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-emerald-500/20 md:col-span-2">
      <h2 className="mb-4 font-mono text-xl font-bold tracking-wide text-emerald-600 dark:text-emerald-400"><span className="text-slate-400 dark:text-slate-500">//</span> Про мене</h2>
      <p className="leading-relaxed">
        Я студент, навчаюсь у <strong className="text-slate-900 dark:text-white">Національному університеті «Львівська політехніка»</strong>, група КБ-208.
      </p>
    </section>
  );
}

export default About;