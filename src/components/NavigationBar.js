import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { fetchCart } from '../lib/api'

export default function NavigationBar() {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const refresh = () => {
      fetchCart().then(items => {
        const totalQty = items.reduce((sum, i) => sum + (i.quantity || 1), 0);
        setCartCount(totalQty);
      });
    }; //pull cart count from backend(fetchCart()) then it totals all the item quantities in the cart and calll setCartCoutn to set.
  
    refresh(); 
    window.addEventListener('cartchange', refresh);
  
    return () => window.removeEventListener('cartchange', refresh);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <div className="container">
        <Link href="/" className="navbar-brand">
          <Image src="/logo.png" alt="MyStore" width={160} height={40} />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/add-campaign" className="nav-link">
                Add Campaign
              </Link>
            </li>
          </ul>

          <Link href="/cart" className="nav-link cart-link">
            <Image src="/cart.png" alt="Cart" width={28} height={28} />
            {cartCount > 0 && (
              <span className="badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}
