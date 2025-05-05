import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavigationBar from '../components/NavigationBar';
import {
  fetchCart,
  updateCartItem,
  removeCartItem,
} from '../lib/api';

export default function CartPage() {
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const loadCart = () => {
    fetchCart().then(setItems);
  };
  useEffect(loadCart, []);

  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryPrice = totalPrice > 0 && totalPrice < 1000 ? 50 : 0; //if it exceeds 1000 remove the deliveryPrice
  const payable = totalPrice + deliveryPrice;

  const handleUpdate = (id, updates) => {
    const item = items.find(i => i.id === id);
    setBusy(true);
    updateCartItem({ ...item, ...updates })
      .then(loadCart)
      .finally(() => setBusy(false));
  };

  const handleLocalNote = (id, note) => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, note } : i)),
    );
  };

  const handleRemove = id => {
    setBusy(true);
    removeCartItem(id)
      .then(loadCart)
      .finally(() => setBusy(false));
  };

  const handleEmpty = () => {
    if (!confirm('Empty your cart?')) return;
    setBusy(true);
    Promise.all(items.map(i => removeCartItem(i.id)))
      .then(() => setItems([]))
      .finally(() => setBusy(false));
  };

  const handleCheckout = () => {
    if (items.length === 0) return alert('Your cart is empty.');
    setConfirming(true); //opening confirmation page
  };

  const completePayment = () => {
    setBusy(true);
    Promise.all(items.map(i => removeCartItem(i.id)))
      .then(() => {
        setItems([]);
        setConfirming(false);
        alert('Payment successful! Thank you for your purchase.');
        router.push('/');
      })
      .finally(() => setBusy(false));
  };

  return (
    <>
      <NavigationBar />

      <div className="container my-5">
        <h1>Shopping Cart</h1>

        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="list-group mb-4">
              {items.map(item => (
                <div key={item.id} className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col-2">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="img-fluid"
                      />
                    </div>

                    <div className="col-4">
                      <h5>{item.title}</h5>
                    </div>

                    <div className="col-2">
                      <input
                        type="number"
                        min="1"
                        className="form-control w-100"
                        value={item.quantity}
                        onChange={e =>
                          handleUpdate(item.id, {
                            quantity: Number(e.target.value) || 1,
                          })
                        }
                        disabled={busy}
                      />
                    </div>

                    <div className="col-4">
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Special note"
                        value={item.note || ''}
                        onChange={e =>
                          handleLocalNote(item.id, e.target.value)
                        }
                        onBlur={e =>
                          handleUpdate(item.id, { note: e.target.value })
                        }
                      />

                      <div className="d-flex justify-content-between">
                        <span>
                          {item.price.toFixed(2)} TL × {item.quantity} ={' '}
                          <strong>
                            {(item.price * item.quantity).toFixed(2)} TL
                          </strong>
                        </span>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemove(item.id)}
                          disabled={busy}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <p>
                  Total Price:{' '}
                  <strong>{totalPrice.toFixed(2)} TL</strong>
                </p>
                <p>
                  Delivery Fee:{' '}
                  <strong>{deliveryPrice.toFixed(2)} TL</strong>
                </p>
                <hr />
                <p className="h5">
                  Amount to Pay:{' '}
                  <strong>{payable.toFixed(2)} TL</strong>
                </p>
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <button
                className="btn btn-outline-danger"
                onClick={handleEmpty}
                disabled={busy}
              >
                Empty Cart
              </button>
              <button
                className="btn btn-success"
                onClick={handleCheckout}
                disabled={busy}
              >
                Proceed Checkout
              </button>
            </div>
          </>
        )}
      </div>

      {confirming && (
        <div
          className="modal d-block"
          tabIndex="-1"
          onClick={() => !busy && setConfirming(false)}
        >
          <div
            className="modal-dialog"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order summary</h5>
              </div>

              <div className="modal-body">
                <p>
                  Total Price:{' '}
                  <strong>{totalPrice.toFixed(2)} TL</strong>
                </p>
                <p>
                  Delivery Fee:{' '}
                  <strong>{deliveryPrice.toFixed(2)} TL</strong>
                </p>
                <hr />
                <p className="h5">
                  Amount to Pay:{' '}
                  <strong>{payable.toFixed(2)} TL</strong>
                </p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-outline-secondary"
                  disabled={busy}
                  onClick={() => setConfirming(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  disabled={busy}
                  onClick={completePayment}
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
