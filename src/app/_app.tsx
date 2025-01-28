// pages/_app.tsx
import '../styles/global.css';  // Import global CSS

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
