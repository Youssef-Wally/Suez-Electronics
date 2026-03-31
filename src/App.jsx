import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const products = [
  {
    id: 1,
    name: "Laptop",
    color: "silver",
    size: 2500,
    description: "A high-performance laptop for work and play.",
    price: 10000,
    img: "https://shuttershopegypt.com/wp-content/uploads/2024/08/Microsoft-Surface-Laptop-Go.jpg0_.jpg",
  },
  {
    id: 2,
    name: "Phone",
    description: "A smartphone with the latest features.",
    color: "Orange",
    size: 250,
    price: 5000,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLemlsk8oxkEUalTzQb3yQCcSfgSstLBLnFg&s",
  },
  {
    id: 3,
    name: "Headphones",
    color: "white",
    size: 265,
    description: "Wireless headphones with noise cancellation.",
    price: 800,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp9-ifB4yb_htSg_yK6AahthVxs7r34hZpGQ&s",
  },
  {
    id: 4,
    name: "Keyboard",
    color: "Red",
    size: 320,
    description: "A mechanical keyboard with RGB lighting.",
    price: 600,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaGPwbNSnD51F1S61lTU0G2YXih2ISapEdgA&s",
  },
  {
    id: 5,
    name: "Mouse",
    color: "black",
    size: 125,
    description: "A wireless mouse with high precision.",
    price: 200,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4mvgfoy9F0TiC8qbiUwX1wSPcFDHMSTg7fA&s",
  },
  {
    id: 6,
    name: "Monitor",
    color: "white",
    size: 1250,
    description: "A high-resolution monitor for clear visuals.",
    price: 2500,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUc-2GKOZM3szSm49oGl6JpUJmozQSKbdarg&s",
  },
  {
    id: 7,
    name: "Webcam",
    color: "black",
    size: 320,
    description: "A high-definition webcam for clear video calls.",
    price: 3520,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmgfoKkdBa28jAQ-jAu9LP0MScnyc_XC3u2w&s",
  },
  {
    id: 8,
    name: "Tablet",
    color: "gray",
    size: 1750,
    description: "A portable tablet for entertainment and productivity.",
    price: 2000,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4i0WWkqnttlC7HBPN6vvj_fYbdLRukQr_Lw&s",
  },
];

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(null); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState("home");
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function removeFromCart(indexToRemove) {
    const newCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(newCart);
  }

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0,
  );
  const taxes = subtotal * 0.14;
  const total = subtotal + taxes;

  function addToCart(product) {
    setCart((prevCart) => {
      const isItemInCart = prevCart.find((item) => item.id === product.id);
      if (isItemInCart) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }

  function updateQty(id, delta) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
          : item,
      ),
    );
  }

  return (
    <div className="font-monospace">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top p-3">
        <div className="container">
          <a
            className="navbar-brand fw-bold text-primary fs-3"
            href="#"
            onClick={() => setPage("home")}
          >
            Suez <span className="text-dark">Electronics</span>
          </a>

          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <div className="navbar-nav ms-auto gap-2 text-center mt-3 mt-lg-0">
              <button
                className="nav-link btn border-0 fw-semibold"
                onClick={() => {
                  setPage("home");
                  setIsNavOpen(false);
                }}
              >
                Home
              </button>
              <button
                className="nav-link btn border-0 fw-semibold"
                onClick={() => {
                  setPage("products");
                  setIsNavOpen(false);
                }}
              >
                Products
              </button>
              <button
                className="nav-link btn border-0 fw-semibold"
                onClick={() => {
                  setPage("about");
                  setIsNavOpen(false);
                }}
              >
                About
              </button>

              <button
                className="btn btn-primary rounded-pill px-4 ms-lg-3 position-relative shadow-sm"
                onClick={() => {
                  setPage("cart");
                  setIsNavOpen(false);
                }}
              >
                🛒 Cart
                {cart.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>
              <button className="nav-link btn" onClick={() => setPage("login")}>
                {user ? `Hi, ${user.name}` : "Login"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Page */}
      {page === "login" && (
        <div className="container mt-5 mb-5 animate__animated animate__fadeIn">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="card shadow-lg border-0 rounded-5 p-4 text-start">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-primary">Welcome Back!</h2>
                  <p className="text-muted">
                    Sign in to continue shopping at Suez Electronics
                  </p>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setUser({ name: "Youssef" }); 
                    setPage("products");
                  }}
                >
                  <div className="mb-3">
                    <label className="form-label fw-bold">Email Address</label>
                    <input
                      type="email"
                      className="form-control rounded-pill p-3"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-bold">Password</label>
                    <input
                      type="password"
                      className="form-control rounded-pill p-3"
                      placeholder="********"
                      required
                    />
                  </div>
                  <button className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow">
                    Sign In 🚀
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Page */}
      {page === "checkout" && (
        <div className="container mt-5 mb-5 animate__animated animate__fadeIn text-start">
          <h2 className="fw-bold mb-4 text-center">Checkout 💳</h2>
          <div className="row g-4">
            <div className="col-md-8">
              <div className="card shadow-sm border-0 rounded-4 p-4 text-start">
                <h5 className="mb-4 border-bottom pb-2 fw-bold text-primary">
                  Shipping Information
                </h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      placeholder="Youssef Wally"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control rounded-3"
                      placeholder="010XXXXXXXX"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">
                      Detailed Address (Suez City)
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      placeholder="El-Geish St. - Building..."
                      required
                    />
                  </div>
                </div>

                <h5 className="mt-5 mb-4 border-bottom pb-2 fw-bold text-primary">
                  Payment Method
                </h5>
                <div className="form-check p-3 bg-light rounded-3 border">
                  <input
                    className="form-check-input ms-1"
                    type="radio"
                    name="payment"
                    id="cash"
                    checked
                    readOnly
                  />
                  <label className="form-check-label ms-4" htmlFor="cash">
                    Cash on Delivery (COD)
                  </label>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm border-0 rounded-4 p-4 bg-white border-top border-primary border-5">
                <h5 className="fw-bold mb-3">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Items:</span>
                  <span className="fw-bold">{cart.length}</span>
                </div>
                <div className="d-flex justify-content-between mb-3 border-top pt-2 fs-5 fw-bold text-primary">
                  <span>Total Amount:</span>
                  <span>{total.toFixed(2)} EGP</span>
                </div>
                <button
                  className="btn btn-success w-100 rounded-pill py-3 fw-bold shadow"
                  onClick={() => {
                    alert(
                      "Order Received Successfully! Our Suez Electronics team will contact you within an hour.",
                    );
                    setCart([]);
                    setPage("home");
                  }}
                >
                  Confirm Order ✅
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Home Page */}
      {page === "home" && (
        <div className="animate__animated animate__fadeIn">
          <section className="py-5 text-center bg-light rounded-5 m-3 shadow-sm border overflow-hidden position-relative">
            <div className="container py-5 position-relative z-1 text-start px-md-5">
              <h1 className="display-3 fw-black text-dark mb-3">
                Your Future <span className="text-primary">Starts Here</span>
              </h1>
              <p
                className="lead text-secondary mb-5"
                style={{ maxWidth: "700px" }}
              >
                The biggest collection of laptops, phones, and original accessories in 
                Suez City. Global quality at local prices.
              </p>
              <div className="d-flex gap-3">
                <button
                  onClick={() => setPage("products")}
                  className="btn btn-primary btn-lg px-5 rounded-pill shadow"
                >
                  Shop Now ⚡
                </button>
                <button
                  onClick={() => setPage("about")}
                  className="btn btn-outline-dark btn-lg px-5 rounded-pill"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div
              className="position-absolute top-0 start-0 w-100 h-100 opacity-25"
              style={{
                zIndex: 0,
                backgroundImage:
                  "radial-gradient(#5B5EFF 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            ></div>
          </section>

          <div className="container my-5">
            <div className="row g-4 text-center">
              <div className="col-md-4">
                <div className="p-4 rounded-4 bg-white shadow-sm border h-100">
                  <div className="fs-1 mb-2">🚀</div>
                  <h5 className="fw-bold">Fast Delivery</h5>
                  <p className="text-muted small">
                    Inside Suez City within 24 hours only.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4 rounded-4 bg-white shadow-sm border h-100">
                  <div className="fs-1 mb-2">🛡️</div>
                  <h5 className="fw-bold">Real Warranty</h5>
                  <p className="text-muted small">
                    Replacement and return guarantee against manufacturing defects.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4 rounded-4 bg-white shadow-sm border h-100">
                  <div className="fs-1 mb-2">💳</div>
                  <h5 className="fw-bold ">Cash on Delivery</h5>
                  <p className="text-muted small">
                    No credit card needed.. Pay only when you receive your order.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Details Page */}
      {page === "details" && selectedProduct && (
        <div className="container mt-5 mb-5 text-start">
          <button
            className="btn btn-outline-dark mt-1 rounded-pill px-4 fw-bold mb-4"
            onClick={() => setPage("products")}
          >
            ← Back to Products
          </button>

          <div className="row g-5 bg-white p-4 p-md-5 rounded-5 shadow-sm border">
            <div className="col-md-6 text-center">
              <img
                src={selectedProduct.img}
                className="img-fluid rounded-4"
                alt={selectedProduct.name}
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </div>

            <div className="col-md-6 d-flex flex-column justify-content-center">
              <h1 className="display-5 fw-bold mb-3">{selectedProduct.name}</h1>
              <h2 className="text-primary fw-bold mb-4">
                {selectedProduct.price.toLocaleString()} EGP
              </h2>

              <p className="lead text-secondary mb-4">
                {selectedProduct.description ||
                  "The best choice from Suez Electronics to ensure quality and performance."}
              </p>

              <div className="bg-light p-3 rounded-4 mb-4">
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">✅ 1-Year Authorized Warranty</li>
                  <li className="mb-2">✅ Fast Delivery in Suez</li>
                  <li>✅ Cash on Delivery available</li>
                </ul>
              </div>

              <button
                className="btn btn-primary btn-lg rounded-pill py-3 shadow-sm fw-bold"
                onClick={() => addToCart(selectedProduct)}
              >
                Add to Cart 🛒
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About Page */}
      {page === "about" && (
        <div className="container mt-5 mb-5 animate__animated animate__fadeIn text-start">
          <div className="row align-items-center bg-white p-5 rounded-5 shadow-sm border mb-5">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold text-primary mb-4">
                Suez Electronics
              </h1>
              <p className="lead text-secondary">
                At **Suez Electronics**, we are proud to be the first destination for 
                tech enthusiasts in the heroic city of Suez. Our journey started with a simple vision: 
                to provide the latest global devices at competitive prices and a 
                customer service that suits our audience.
              </p>
              <p className="text-muted">
                Since 2024, we have been striving to develop the e-commerce experience 
                to reach you wherever you are, while ensuring quality and authenticity 
                for every product.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <div className="p-4 bg-light rounded-5 border border-primary border-2 border-dashed">
                <h2 className="text-primary fw-black">100% Original</h2>
                <p className="mb-0">All our products come with authorized agent warranty</p>
              </div>
            </div>
          </div>

          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4">
                <div className="fs-1 mb-3">📍</div>
                <h5 className="fw-bold">Address</h5>
                <p className="text-muted">
                  Suez - El Geish St. - Electronics Tower
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4">
                <div className="fs-1 mb-3">📞</div>
                <h5 className="fw-bold">Call Us</h5>
                <p className="text-primary fw-bold fs-5">0100-XXXX-XXX</p>
                <p className="text-muted">Available from 10 AM to 10 PM</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4">
                <div className="fs-1 mb-3">📧</div>
                <h5 className="fw-bold">Email</h5>
                <p className="text-muted">info@suezelectronics.com</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Page */}
      {page === "products" && (
        <div className="container mt-4 mb-5">
          <h2 className="text-center mb-5 fw-bold">Explore Our Gear</h2>
          <div className="row g-4 text-start">
            {products.map((product) => (
              <div className="col-md-3" key={product.id}>
                <div className="card h-100 p-3 shadow-sm border-0 rounded-4">
                  <img
                    src={product.img}
                    className="card-img-top rounded-4"
                    alt={product.name}
                    style={{
                      cursor: "pointer",
                      height: "180px",
                      objectFit: "contain",
                    }}
                    onClick={() => {
                      setSelectedProduct(product);
                      setPage("details");
                    }}
                  />
                  <div className="card-body text-center d-flex flex-column">
                    <h5
                      className="fw-bold mt-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedProduct(product);
                        setPage("details");
                      }}
                    >
                      {product.name}
                    </h5>
                    <p className="text-primary fw-bold fs-5">
                      {product.price.toLocaleString()} EGP
                    </p>
                    <button
                      className="btn btn-primary w-100 rounded-pill mt-auto shadow-sm"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart 🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cart Page */}
      {page === "cart" && (
        <div className="container mt-5 mb-5 text-start animate__animated animate__fadeIn">
          <div className="row">
            <div className="col-lg-7">
              <h4 className="mb-4 fw-bold">
                Shopping Cart ({cart.length} items)
              </h4>

              {cart.length === 0 ? (
                <div className="alert alert-info text-center py-5 border-0 rounded-4">
                  <p className="mb-0 fs-5">Your cart is empty 😢</p>
                  <button
                    className="btn mt-3 rounded-pill px-4 btn-primary"
                    onClick={() => setPage("products")}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="card border-0 shadow-sm mb-3 p-3 rounded-4"
                    >
                      <div className="row g-3 align-items-center">
                        <div className="col-md-2">
                          <img
                            src={item.img}
                            alt={item.name}
                            style={{
                              width: "100%",
                              height: "100px",
                              objectFit: "contain",
                              borderRadius: "8px",
                            }}
                          />
                        </div>

                        <div className="col-md-6">
                          <h6 className="mb-1 fw-bold">{item.name}</h6>
                          <small className="text-muted d-block">
                            Color: {item.color} | Size: {item.size}
                          </small>
                          <p className="mb-0 fw-bold text-primary mt-1">
                            {item.price.toLocaleString()} EGP
                          </p>
                        </div>

                        <div className="col-md-4 d-flex justify-content-between align-items-center">
                          <div className="input-group input-group-sm" style={{ width: "110px" }}>
                            <button className="btn btn-outline-secondary" onClick={() => updateQty(item.id, -1)}>−</button>
                            <span className="form-control text-center">{item.quantity || 1}</span>
                            <button className="btn btn-outline-secondary" onClick={() => updateQty(item.id, 1)}>+</button>
                          </div>
                          <button className="btn text-danger border-0" onClick={() => removeFromCart(index)}>
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {cart.length > 0 && (
              <div className="col-lg-5">
                <div className="card border-0 shadow-sm p-4 rounded-4">
                  <div className="mb-4">
                    <label className="form-label fw-bold">Have a promo code?</label>
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Enter code" />
                      <button className="btn btn-primary">Apply</button>
                    </div>
                  </div>

                  <div className="border-top pt-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal</span>
                      <span>{subtotal.toLocaleString()} EGP</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Shipping</span>
                      <span className="text-success fw-bold">Free</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
                      <span>Taxes (14%)</span>
                      <span>{taxes.toLocaleString()} EGP</span>
                    </div>
                    <div className="d-flex justify-content-between mb-4 fs-5 fw-bold text-primary">
                      <span>Total</span>
                      <span>{total.toLocaleString()} EGP</span>
                    </div>
                    <button className="btn btn-primary w-100 py-3 rounded-pill fw-bold" onClick={() => setPage("checkout")}>
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
