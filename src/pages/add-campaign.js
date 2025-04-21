import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavigationBar from '../components/NavigationBar';
import { fetchProducts, fetchCampaigns, createCampaign } from '../lib/api';

export default function AddCampaignPage() {
  const router = useRouter();
  const [products, setProducts]= useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [productId, setProductId] = useState('');
  const [discount, setDiscount] = useState(10);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  // load products & existing campaigns
  useEffect(() => {
    fetchProducts().then(setProducts);
    fetchCampaigns().then(setCampaigns);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!productId) {
      return alert('Please select a product.');
    }
    setBusy(true);
    try {
      const newCamp = await createCampaign({
        productId: Number(productId),
        discount: Number(discount),
      });
      setCampaigns([ ...campaigns, newCamp ]);
      setMessage('Campaign added successfully!');
      setProductId('');
      setDiscount(10);
    } catch (err) {
      console.error(err);
      alert('Failed to add campaign.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="container my-5">
        <h1>Add Campaign</h1>

        {message && (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mb-5">
          <div className="mb-3">
            <label className="form-label">Product</label>
            <select
              className="form-select"
              value={productId}
              onChange={e => setProductId(e.target.value)}
              disabled={busy}
            >
              <option value="">— Select a product —</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Discount (%)</label>
            <input
              type="number"
              className="form-control w-25"
              min="1"
              max="100"
              value={discount}
              onChange={e => setDiscount(e.target.value)}
              disabled={busy}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={busy}
          >
            {busy ? 'Adding…' : 'Add Campaign'}
          </button>
        </form>

        <hr />

        <h2>Current Campaigns</h2>
        {campaigns.length === 0 ? (
          <p>No campaigns defined yet.</p>
        ) : (
          <div className="row">
            {campaigns.map(c => {
              const prod = products.find(p => p.id == Number(c.productId));
              return (
                <div key={c.id} className="col-md-4 mb-4">
                  <div className="card h-100">
                    {prod ? (
                      <img
                        src={prod.thumbnail}
                        className="card-img-top"
                        alt={prod.title}
                      />
                    ) : null}
                    <div className="card-body">
                      <h5 className="card-title">
                        {prod ? prod.title : 'Unknown Product'}
                      </h5>
                      <p className="card-text">
                        {c.discount}% off
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
