import { useEffect, useState } from 'react';
import { fetchCampaigns, fetchProducts } from '../lib/api';
import Carousel from 'react-bootstrap/Carousel';

export default function CampaignCarousel() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    Promise.all([fetchCampaigns(), fetchProducts()])
      .then(([campaigns, products]) => {
        // join campaigns with product data
        const merged = campaigns.map(c => {
          const prod = products.find(p => p.id == c.productId);
          return { ...c, ...prod };
        });
        setSlides(merged);
      });
  }, []);

  /*
  slides the array of campaign and products which is merged.
  with map it creates a <Carousel.Item> for each item using the items in slides
  to make each one unique I gave item.id for Carousel.Item
  */
  return (
    <div className="my-4 custom-carousel">
      <Carousel>
        {slides.map(item => (
          <Carousel.Item key={item.id}>
            <img
              className="d-block w-100"
              src={item.thumbnail}
              alt={item.title}
            />
            <Carousel.Caption>
              <h5>{item.title} – {item.discount}% off</h5>
              <p>{item.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
