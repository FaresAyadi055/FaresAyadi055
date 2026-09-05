import { Helmet } from 'react-helmet-async';

export default function SEO({
  title = 'FaresAyadi — Freelance Fullstack Developer & Automation Engineer for Hire',
  description = 'Freelance fullstack software engineer for hire. Website building, web app development, and business process automation for small and medium businesses.',
  path = '/',
}) {
  const url = `https://faresayadi055.github.io${path}`;
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
