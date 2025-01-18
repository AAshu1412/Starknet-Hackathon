import { Helmet } from 'react-helmet-async';

export function Metadata ({ title = '', description = '', favicon = '', image = '', name = '' }) {
  return (
    <Helmet> <title>{title}</title>
      <link rel="icon" type="image/svg+xml" href={favicon} />
      <link rel='canonical' href={ window.location.href } />
      <link rel="icon" type="image/svg+xml" href="/vite.svgt" />
      <meta name='description' content={description} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="200" />
      <meta property="og:image:alt" content={`Image of ${title} site`} />
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
