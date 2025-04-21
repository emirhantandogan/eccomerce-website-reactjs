import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import { useEffect, useState } from 'react';
import '../styles/globals.css';
import { fetchCart } from '../lib/api';


export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
