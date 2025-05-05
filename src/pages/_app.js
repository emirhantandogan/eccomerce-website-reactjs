import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import { useEffect, useState } from 'react';
import '../styles/globals.css';
import { fetchCart } from '../lib/api';


export default function App({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  return <Component {...pageProps} />;
}
