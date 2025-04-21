import { useState, useEffect } from 'react'
import { fetchProducts, addToCart } from '../lib/api'
import ProductCard from './ProductCard'

export default function FilterableProductList() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortInput,setSortInput] = useState('')
  const [searchInput,setSearchInput] = useState('')

  const [appliedSort,setAppliedSort] = useState('')
  const [appliedSearch, setAppliedSearch] = useState('')

  // Load products and categories once
  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data)
      setCategories(Array.from(new Set(data.map(p => p.category))))
    })
  }, [])

  // when we pick a category set that category as selected then clear search and sort completely
  const handleCategoryChange = e => {
    const cat = e.target.value
    setSelectedCategory(cat)

    setSearchInput('')
    setAppliedSearch('')
    setSortInput('')
    setAppliedSort('')
  }

  // handling sort, this sets the input also applies it
  const handleSortChange = e => {
    const val = e.target.value
    setSortInput(val)
    setAppliedSort(val)
  }

  // on click of search button it will apply that seach 
  const handleSearch = () => {
    setAppliedSearch(searchInput)
  }

  let displayed = products

  // filtering according to the categry
  if (selectedCategory) {
    displayed = displayed.filter(p => p.category === selectedCategory)
  }

  //filtering the products according to search text, it searches the text in title also description
  if (appliedSearch) {
    const q = appliedSearch.toLowerCase()
    displayed = displayed.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    )
  }

  // sorting the items low to high and high to low.
  if (appliedSort === 'low') {
    displayed = [...displayed].sort((a, b) => a.price - b.price)
  } else if (appliedSort === 'high') {
    displayed = [...displayed].sort((a, b) => b.price - a.price)
  }

  return (
    <>
      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={sortInput}
            onChange={handleSortChange}
          >
            <option value="">Sort By</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        <div className="col-md-4 mb-2">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search products"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
        {displayed.map(product => (
          <div key={product.id} className="col">
            <ProductCard
              product={product}
              onAdd={() => addToCart(product, 1)}
            />
          </div>
        ))}
      </div>
    </>
  )
}
//it gives create Product card by giving it a product object and a function as props.
//props provide us to pass components from parent component to child component.
//which are FilterableProduct list (parent) to ProductCard (Child).  