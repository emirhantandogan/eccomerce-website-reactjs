import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Carousel from 'react-bootstrap/Carousel';
import {
  fetchProduct,
  fetchReviews,
  fetchCart,
  addToCart,
  updateCartItem,
  addReview
} from '../../lib/api';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [cartItem, setCartItem]= useState(null);
  const [quantity, setQuantity]= useState(1);
  const [total, setTotal] = useState(0);

  // fetch product, reviews, existing cart when page loads
  useEffect(() => {
    if (!id) return;
    fetchProduct(id).then(setProduct);
    fetchReviews(id).then(setReviews);
    fetchCart().then(items => {
      const item = items.find(i => String(i.productId) === String(id));
      if (item) {
        setCartItem(item);
        setQuantity(item.quantity);
      }
    });
  }, [id]);

  // compute total payment
  useEffect(() => {
    if (product) setTotal(product.price * quantity);
  }, [product, quantity]);

  /*
  if quantity entered wrong it will alert and do nothing.
  if the product already exists in the cart it will only update the number
  else the product will be added to cart newly
  */
  const handleCart = () => {
    if (quantity < 1) return alert('Please select a quantity.');
  
    const existing = cartItem;
  
    if (existing) {
      updateCartItem({ ...existing, quantity: existing.quantity + quantity })
        .then(updated => {setCartItem(updated); alert('Cart is updated.');});
    } else {
      addToCart(product, quantity).then(newItem => {setCartItem(newItem); alert('Product is added to cart.');});
    }
  };

  return (
    <>
      <NavigationBar />

      {product && (
        <div className="container my-5">
          <div className="row">
            {/* Product Image */}
            <div className="col-md-6">
              <Carousel
                className="product-carousel"
                interval={null}           
              >
                {product.images?.map((src, idx) => (
                  <Carousel.Item key={idx}>
                    <img
                      src={src}
                      alt={`${product.title} ${idx + 1}`}
                      className="d-block w-100 img-fluid rounded"
                      style={{ objectFit: 'contain', maxHeight: 450 }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            <div className="col-md-6">
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <p className="h4">{product.price.toFixed(2)} TL</p>

              <div className="d-flex align-items-center my-3">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  className="form-control w-25 me-3"
                  onChange={e => setQuantity(Number(e.target.value) || 1)}
                />
                <button
                  className="btn btn-primary me-2"
                  onClick={handleCart}
                >
                  {cartItem ? 'Update Cart' : 'Add to Cart'}
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => router.push('/cart')}
                >
                  Go to Cart
                </button>
              </div>

              <p>
                <strong>Total:</strong> {total.toFixed(2)} TL
              </p>
            </div>
          </div>

          <hr />

          <h3>Reviews</h3>
          <ul className="list-group mb-4">
            {reviews.map(r => (
              <li key={r.id} className="list-group-item">
                <strong>{r.username}</strong> —{' '}
                {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                <h5 className="mt-1">{r.title}</h5>
                <p>{r.text}</p>
              </li>
            ))}
          </ul>

          <AddReviewForm
            productId={Number(id)}
            onNew={rev => setReviews([rev, ...reviews])}
          />
        </div>
      )}
    </>
  );
}

// Review form for the bottom of the page
function AddReviewForm({ productId, onNew }) {
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText]  = useState('');
  const [rating, setRating] = useState(5);
  const [busy, setBusy] = useState(false);

  const handleSubmit = e => {
    e.preventDefault(); // prevent the browsers degault form behaviour (this is a must in react when handling forms)
    if (!username || !title || !text)
      return alert('All fields are required.');

    setBusy(true); //for control checking for form is submitting 
    addReview({ productId, username, title, text, rating })
      .then(newRev => {
        onNew(newRev);
        setUsername(''); setTitle(''); setText(''); setRating(5);
      })
      .finally(() => setBusy(false)); //it sets busy to false when it succesfully submits the form
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <h4>Add Your Review</h4>
      <div className="mb-2">
        <label className="form-label">Name</label>
        <input
          className="form-control"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Review</label>
        <textarea
          className="form-control"
          rows="3"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Rating</label>
        <select
          className="form-select w-auto"
          value={rating}
          onChange={e => setRating(Number(e.target.value))}
        >
          {[5, 4, 3, 2, 1].map(n => (
            <option key={n} value={n}>{n} Star{n>1?'s':''}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="btn btn-success"
        disabled={busy}
      >
        {busy ? 'Submitting…' : 'Submit Review'}
      </button>
    </form>
  );
}
