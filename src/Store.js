import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import './Stylesheets/Store.css';
import boxingGlovesImg from './Media/boxing-gloves.jpg';
import shinGuardsImg from './Media/shin-guards.webp';
import handWrapsImg from './Media/hand-wraps.webp';

const WORKER = 'https://worker-consolidated.maxli5004.workers.dev';

const PRODUCTS = [
  {
    id: 'boxing-gloves',
    name: 'Boxing Gloves',
    price: 130,
    description: 'Professional-grade training gloves',
    image: boxingGlovesImg,
  },
  {
    id: 'gi',
    name: 'Gi',
    price: 120,
    description: 'BJJ training gi',
    sizes: ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'],
  },
  {
    id: 'hand-wraps',
    name: 'Hand Wraps',
    price: 20,
    description: 'Cotton hand wraps, 180"',
    image: handWrapsImg,
  },
  {
    id: 'shin-guards',
    name: 'Shin Guards',
    price: 70,
    description: 'Muay Thai shin guards',
    image: shinGuardsImg,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'rash-guard',
    name: 'Rash Guard',
    price: 40,
    description: 'BJJ rash guard',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
];

function cartKey(id, size) {
  return `${id}__${size || 'one-size'}`;
}

function parseKey(key) {
  const [id, size] = key.split('__');
  return { id, size: size === 'one-size' ? null : size };
}

export default function Store() {
  const [cart, setCart] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [sizeError, setSizeError] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cartEntries = Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([key, qty]) => {
      const { id, size } = parseKey(key);
      const product = PRODUCTS.find(p => p.id === id);
      return { key, id, size, product, qty };
    });

  const cartTotal = cartEntries.reduce((sum, { product, qty }) => sum + product.price * qty, 0);
  const cartCount = cartEntries.reduce((sum, { qty }) => sum + qty, 0);

  function setQty(key, qty) {
    setCart(prev => ({ ...prev, [key]: Math.max(0, qty) }));
  }

  function handleAddToCart(product) {
    if (product.sizes) {
      const size = selectedSizes[product.id];
      if (!size) {
        setSizeError(prev => ({ ...prev, [product.id]: true }));
        return;
      }
      setSizeError(prev => ({ ...prev, [product.id]: false }));
      const key = cartKey(product.id, size);
      setCart(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
    } else {
      const key = cartKey(product.id, null);
      setCart(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
    }
  }

  function handleSelectSize(productId, size) {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
    setSizeError(prev => ({ ...prev, [productId]: false }));
  }

  async function handleCheckout() {
    if (cartEntries.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const items = cartEntries.map(({ id, size, qty }) => ({
        id,
        size: size || null,
        quantity: qty,
      }));
      const res = await fetch(`${WORKER}/store-purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Shop | Maple Jiu-Jitsu Academy — Maple, ON</title>
        <meta name="description" content="Shop gear at Maple Jiu-Jitsu Academy. BJJ gis, boxing gloves, hand wraps and more." />
        <link rel="canonical" href="https://maplebjj.com/store" />
      </Helmet>
      <Navbar />
      <div className="store-page">
        <header className="store-hero">
          <p className="store-kicker">Maple Jiu-Jitsu</p>
          <h1 className="store-title">Shop</h1>
        </header>

        <div className="store-layout">
          <div className="store-grid">
            {PRODUCTS.map(product => {
              const selectedSize = selectedSizes[product.id];
              const key = cartKey(product.id, selectedSize || null);
              const qty = product.sizes
                ? (selectedSize ? cart[key] || 0 : 0)
                : cart[cartKey(product.id, null)] || 0;

              return (
                <div key={product.id} className="store-card">
                  {product.image
                    ? <img src={product.image} alt={product.name} className="store-card-img" />
                    : <div className="store-img-placeholder"><span>{product.name}</span></div>
                  }
                  <div className="store-card-body">
                    <h2 className="store-card-name">{product.name}</h2>
                    <p className="store-card-desc">{product.description}</p>
                    <p className="store-card-price">${product.price.toFixed(2)} <span className="store-card-hst">+ HST</span></p>

                    <div className="store-size-area">
                      {product.sizes && (
                        <div className="store-size-row">
                          {product.sizes.map(size => (
                            <button
                              key={size}
                              className={`store-size-btn${selectedSize === size ? ' selected' : ''}${sizeError[product.id] ? ' error' : ''}`}
                              onClick={() => handleSelectSize(product.id, size)}
                            >
                              {size}
                            </button>
                          ))}
                          <p className="store-size-error" style={{ visibility: sizeError[product.id] ? 'visible' : 'hidden' }}>Please select a size</p>
                        </div>
                      )}
                    </div>

                    <div className="store-qty-row">
                      <button
                        className="store-qty-btn"
                        onClick={() => setQty(key, qty - 1)}
                        disabled={qty === 0}
                        aria-label="Decrease quantity"
                      >−</button>
                      <span className="store-qty-val">{qty}</span>
                      <button
                        className="store-qty-btn"
                        onClick={() => handleAddToCart(product)}
                        aria-label="Increase quantity"
                      >+</button>
                    </div>

                    <button
                      className="store-add-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed bottom cart bar */}
      <div className={`store-cart-bar${cartCount > 0 ? ' store-cart-bar--visible' : ''}`}>
        <div className="store-cart-bar-info">
          <span className="store-cart-bar-count">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
          <span className="store-cart-bar-sep">·</span>
          <span className="store-cart-bar-total">${cartTotal.toFixed(2)}</span>
          <span className="store-cart-bar-tax">+ HST</span>
        </div>
        {error && <p className="store-cart-bar-error">{error}</p>}
        <button
          className="store-cart-bar-btn"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Redirecting…' : 'Checkout →'}
        </button>
      </div>
    </>
  );
}
