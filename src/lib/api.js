import axios from 'axios';

// sets up a custom axios instance called api. This defines base url for all requests
const api = axios.create({baseURL: 'http://localhost:3001',}); 

export const fetchProducts = () => api.get('/products').then(res => res.data); //Retrieves the list of all products.
export const fetchCart = () => api.get('/cart').then(res => res.data); //gets the currnt shopping cart items.
export const fetchProduct = id => api.get(`/products/${id}`).then(r => r.data); //fetches a singl product by its ID.
export const fetchReviews = pid => api.get(`/reviews`, { params: { productId: pid } }).then(r => r.data); //Fetces all reviews for a specific product id
export const fetchCampaigns = () => api.get('/campaigns').then(r => r.data); //fetches campaigns.

export const addToCart = (product, quantity = 1) => {
  const { id: productId, ...rest } = product; // extracting the productId.

  return api.get('/cart', { params: { productId } }).then(({ data }) => {
    if (data.length) {
      // If the product already exists in cart: only update its quantity
      const existing = data[0];
      return api
        .put(`/cart/${existing.id}`, {
          ...existing,
          quantity: existing.quantity + quantity
        })
        .then(r => {
          notifyCartChange();
          return r.data;
        });
    }

    // If it is a new item, create a new cart entry
    return api
      .post('/cart', { productId, ...rest, quantity })
      .then(r => {
        notifyCartChange();
        return r.data;
      });
  });
};

//sending put request to update the items quentity.
export const updateCartItem = item => api.put(`/cart/${item.id}`, item).then(res => {notifyCartChange(); return res.data;}); 
//sending a delete request to remove the item from cart.
export const removeCartItem = id => api.delete(`/cart/${id}`).then(res => {notifyCartChange(); return res.data;});
//creating a new review.
export const addReview = rev => api.post('/reviews', rev).then(r => r.data);
//creating a new campaign.
export const createCampaign = camp => api.post('/campaigns', camp).then(r => r.data);

//sending a custom event for cart change
const notifyCartChange = () => window.dispatchEvent(new Event('cartchange'));

