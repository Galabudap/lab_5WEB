import { useEffect, useState } from 'react';

const VARIANT = 5; // номер варіанта (порядковий номер у журналі)

// Завдання 2: відгуки попередніх роботодавців з JSONPlaceholder
function Reviews() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // [] — запит виконується лише один раз, при монтуванні
  useEffect(() => {
    async function loadComments() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setComments(data);
      } catch (err) {
        console.error(err);
        setError('Не вдалося завантажити відгуки.');
      } finally {
        setLoading(false);
      }
    }

    loadComments();
  }, []);

  return (
    <section id="reviews" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900 md:col-span-2">
      <h2 className="mb-4 font-mono text-xl font-bold tracking-wide text-emerald-600 dark:text-emerald-400">
        <span className="text-slate-400 dark:text-slate-500">//</span> Відгуки роботодавців
      </h2>

      {loading && <p>Завантаження...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        {comments.map((comment) => (
          <article key={comment.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
            <h3 className="font-semibold capitalize text-slate-900 dark:text-white">{comment.name}</h3>
            <a href={`mailto:${comment.email}`} className="text-sm text-cyan-700 hover:underline dark:text-cyan-400">
              {comment.email}
            </a>
            <p className="mt-2 text-sm leading-relaxed">{comment.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Reviews;
