import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="page-container">
      <section className="card result-card">
        <h1>Page not found</h1>
        <p>The page you requested does not exist.</p>
        <Link className="secondary-button" to="/">
          Back to home
        </Link>
      </section>
    </main>
  );
}