import { Helmet } from 'react-helmet-async';

/**
 * Drop-in SEO control. Defaults are tuned for the homepage; override per-section
 * pages if this project grows beyond a single page (e.g. /services, /work).
 */
export default function SEO({
  title = 'FaresAyadi.dev — Freelance Fullstack Developer & Automation Engineer for Hire',
  description = 'Freelance fullstack software engineer for hire. Website building, web app development, and business process automation for small and medium businesses.',
  path = '/',
}) {
  const url = `https://www.FaresAyadi.dev${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
    </Helmet>
  );
}
