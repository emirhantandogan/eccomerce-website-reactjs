import Link from 'next/link';

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card h-100">
      <Link href={`/products/${product.id}`} className="text-decoration-none text-dark">
        <img
          src={product.thumbnail}
          className="card-img-top"
          alt={product.title}
        />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text text-truncate">{product.description}</p>
        </div>
      </Link>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <span className="fw-bold">{product.price.toFixed(2)} TL</span>
        <button className="btn btn-sm btn-primary" onClick={onAdd}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
