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
    // بنقرأ الداتا فوراً أول ما الأبلكيشن يقوم
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(null); // عشان نخزن اسم المستخدم بعد ما يدخل

  const [selectedProduct, setSelectedProduct] = useState(null);

  function removeFromCart(indexToRemove) {
    const newCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(newCart);
  }

  const [page, setPage] = useState("home");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0,
  );
  const taxes = subtotal * 0.14;
  const total = subtotal + taxes;

  function addToCart(product) {
    setCart((prevCart) => {
      // 1. بنشوف هل المنتج ده موجود فعلاً في الكارت؟
      const isItemInCart = prevCart.find((item) => item.id === product.id);

      if (isItemInCart) {
        // 2. لو موجود، بنلف على الكارت ونزود الكمية للمنتج ده بس
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        );
      }
      // 3. لو مش موجود، بنضيفه ونحط له كمية 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }
  const [isNavOpen, setIsNavOpen] = useState(false);

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
    <div>
      {/*  Navbar */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top p-3">
        <div className="container">
          <a
            className="navbar-brand fw-bold text-primary fs-3"
            href="#"
            onClick={() => setPage("home")}
          >
            Suez <span className="text-dark">Electronics</span>
          </a>

          {/* زرار الـ Hamburger للموبايل */}
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* المنيو - بتفتح وبتقفل بناءً على الـ state */}
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
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {page === "login" && (
        <div className="container mt-5 mb-5 animate__animated animate__fadeIn">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="card shadow-lg border-0 rounded-5 p-4">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-primary">Welcome Back!</h2>
                  <p className="text-muted">
                    سجل دخولك لمتابعة الشراء في Suez Electronics
                  </p>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setUser({ name: "Youssef Wally" }); // تجريبي
                    setPage("products");
                  }}
                >
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      className="form-control rounded-pill p-3"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-bold">كلمة المرور</label>
                    <input
                      type="password"
                      className="form-control rounded-pill p-3"
                      placeholder="********"
                      required
                    />
                  </div>
                  <button className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow">
                    تسجيل الدخول 🚀
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {page === "checkout" && (
        <div className="container mt-5 mb-5 animate__animated animate__fadeIn">
          <h2 className="fw-bold mb-4 text-center">إتمام عملية الشراء 💳</h2>
          <div className="row g-4">
            {/* فورم البيانات */}
            <div className="col-md-8">
              <div className="card shadow-sm border-0 rounded-4 p-4">
                <h5 className="mb-4 border-bottom pb-2 fw-bold">
                  بيانات الشحن
                </h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">الاسم بالكامل</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      placeholder="يوسف وائل"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">رقم الهاتف</label>
                    <input
                      type="tel"
                      className="form-control rounded-3"
                      placeholder="010XXXXXXXX"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">
                      العنوان بالتفصيل (السويس)
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      placeholder="شارع الجيش - برج..."
                      required
                    />
                  </div>
                </div>

                <h5 className="mt-5 mb-4 border-bottom pb-2 fw-bold">
                  طريقة الدفع
                </h5>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment"
                    id="cash"
                    checked
                    readOnly
                  />
                  <label className="form-check-input-label" htmlFor="cash">
                    الدفع عند الاستلام (Cash on Delivery)
                  </label>
                </div>
              </div>
            </div>

            {/* ملخص الطلب */}
            <div className="col-md-4">
              <div className="card shadow-sm border-0 rounded-4 p-4 bg-light">
                <h5 className="fw-bold mb-3">ملخص الطلب</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>عدد المنتجات:</span>
                  <span className="fw-bold">{cart.length}</span>
                </div>
                <div className="d-flex justify-content-between mb-3 border-top pt-2 fs-5 fw-bold text-primary">
                  <span>الإجمالي الإجمالي:</span>
                  <span>{total.toFixed(2)} EGP</span>
                </div>
                <button
                  className="btn btn-success w-100 rounded-pill py-3 fw-bold"
                  onClick={() => {
                    alert(
                      "تم استلام طلبك بنجاح! فريق السويس إلكترونيكس هيكلمك في خلال ساعة.",
                    );
                    setCart([]);
                    setPage("home");
                  }}
                >
                  تأكيد الطلب ✅
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {page === "home" && (
        <div className="animate__animated animate__fadeIn">
          {/* Hero Section */}
          <section className="py-5 text-center bg-light rounded-5 m-3 shadow-sm border overflow-hidden position-relative">
            <div className="container py-5 position-relative z-1">
              <h1 className="display-3 fw-black text-dark mb-3">
                مستقبلك التكنولوجي{" "}
                <span className="text-primary">يبدأ هنا</span>
              </h1>
              <p
                className="lead text-secondary mb-5 mx-auto"
                style={{ maxWidth: "700px" }}
              >
                أكبر تشكيلة من اللابتوبات، الموبايلات، والإكسسوارات الأصلية في
                السويس. جودة عالمية.. بأسعار محلية.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button
                  onClick={() => setPage("products")}
                  className="btn btn-primary btn-lg px-5 rounded-pill shadow"
                >
                  تسوق الآن ⚡
                </button>
                <button
                  onClick={() => setPage("about")}
                  className="btn btn-outline-dark btn-lg px-5 rounded-pill"
                >
                  تعرف علينا
                </button>
              </div>
            </div>
            {/* شكل جمالي في الخلفية */}
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

          {/* Features Section */}
          <div className="container my-5">
            <div className="row g-4 text-center">
              <div className="col-md-4">
                <div className="p-4 rounded-4 bg-white shadow-sm border h-100">
                  <div className="fs-1 mb-2">🚀</div>
                  <h5 className="fw-bold">توصيل سريع</h5>
                  <p className="text-muted small">
                    داخل السويس خلال 24 ساعة فقط
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4 rounded-4 bg-white shadow-sm border h-100">
                  <div className="fs-1 mb-2">🛡️</div>
                  <h5 className="fw-bold">ضمان حقيقي</h5>
                  <p className="text-muted small">
                    ضمان استبدال واسترجاع ضد عيوب الصناعة
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4 rounded-4 bg-white shadow-sm border h-100">
                  <div className="fs-1 mb-2">💳</div>
                  <h5 className="fw-bold ">دفع عند الاستلام</h5>
                  <p className="text-muted small">
                    لا تحتاج لفيزا.. ادفع لما تستلم وتطمن
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔵 صفحة تفاصيل المنتج */}
      {page === "details" && selectedProduct && (
        <div className="container mt-5 mb-5">
          {/* زرار الرجوع - ركز هنا القوس اتصلح */}
          <button
            className="btn  btn-outline-dark mt-1 rounded-pill px-4 fw-bold"
            onClick={() => setPage("products")}
          >
            ← رجوع للمنتجات
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

            <div
              className="col-md-6 d-flex flex-column justify-content-center text-end"
              dir="rtl"
            >
              <h1 className="display-5 fw-bold mb-3">{selectedProduct.name}</h1>
              <h2 className="text-primary fw-bold mb-4">
                {selectedProduct.price} EGP
              </h2>

              <p className="lead text-secondary mb-4">
                {selectedProduct.description ||
                  "أفضل اختيار من Suez Electronics لضمان الجودة والأداء."}
              </p>

              <div className="bg-light p-3 rounded-4 mb-4 text-start">
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">✅ ضمان لمدة عام كامل</li>
                  <li className="mb-2">✅ شحن سريع في السويس</li>
                  <li>✅ الدفع عند الاستلام</li>
                </ul>
              </div>

              <button
                className="btn btn-primary btn-lg rounded-pill py-3 shadow-sm fw-bold"
                onClick={() => addToCart(selectedProduct)}
              >
                إضافة إلى العربة 🛒
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 🔵 صفحة About Us */}
      {page === "about" && (
        <div className="container mt-5 mb-5 animate__animated animate__fadeIn">
          {/* الجزء العلوي - الهوية */}
          <div className="row align-items-center bg-white p-5 rounded-5 shadow-sm border mb-5">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold text-primary mb-4">
                Suez Electronics{" "}
              </h1>
              <p className="lead text-secondary">
                نحن في **Suez Electronics**، فخورون بأننا الوجهة الأولى لعشاق
                التكنولوجيا في مدينة السويس الباسلة. بدأت رحلتنا برؤية بسيطة:
                توفير أحدث الأجهزة العالمية بأسعار تنافسية وخدمة ما بعد البيع
                تليق بجمهورنا.
              </p>
              <p className="text-muted">
                منذ عام 2024، ونحن نسعى لتطوير تجربة التسوق الإلكتروني لنصل
                إليكم أينما كنتم، مع ضمان الجودة والأصالة لكل منتج.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <div className="p-4 bg-light rounded-5 border-dashed border-2">
                <h2 className="text-primary fw-black">100% Original</h2>
                <p className="mb-0">جميع منتجاتنا بضمان الوكيل المعتمد</p>
              </div>
            </div>
          </div>

          {/* الجزء السفلي - التواصل */}
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4 hover-top">
                <div className="fs-1 mb-3">📍</div>
                <h5 className="fw-bold">العنوان</h5>
                <p className="text-muted">
                  السويس - شارع الجيش - برج الإلكترونيات
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4 hover-top">
                <div className="fs-1 mb-3">📞</div>
                <h5 className="fw-bold">اتصل بنا</h5>
                <p className="text-primary fw-bold fs-5">0100-XXXX-XXX</p>
                <p className="text-muted">متاحين من 10 صباحاً لـ 10 مساءً</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4 hover-top">
                <div className="fs-1 mb-3">📧</div>
                <h5 className="fw-bold">البريد الإلكتروني</h5>
                <p className="text-muted">info@suezelectronics.com</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔵 صفحة المنتجات */}
      {/* --- صفحة المنتجات --- */}
      {page === "products" && (
        <div className="container mt-4 mb-5">
          <h2 className="text-center mb-4 fw-bold">Our Products</h2>
          <div className="row g-4">
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
                      {product.price} EGP
                    </p>
                    <button
                      className="btn btn-primary w-100 rounded-pill mt-auto"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart 🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}{" "}
          </div>
        </div>
      )}

      {/* 🔵 صفحة الكارت */}
      {page === "cart" && (
        <div className="container mt-5 mb-5">
          <div className="row">
            {/* Cart Items */}
            <div className="col-lg-7">
              <h4 className="mb-4 fw-bold">
                Shopping Cart ({cart.length} items)
              </h4>

              {cart.length === 0 ? (
                <div className="alert alert-info text-center py-5">
                  <p className="mb-0">Your cart is empty</p>
                  <button
                    className="btn mt-3"
                    onClick={() => setPage("products")}
                    style={{ backgroundColor: "#5B5EFF", color: "white" }}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="card border-0 shadow-sm mb-3 p-3"
                    >
                      <div className="row g-3 align-items-center">
                        {/* Product Image */}
                        <div className="col-md-2">
                          <img
                            src={item.img}
                            alt={item.name}
                            style={{
                              width: "100%",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        </div>

                        {/* Product Info */}
                        <div className="col-md-6">
                          <h6 className="mb-1 fw-bold">{item.name}</h6>
                          <small className="text-muted d-block">
                            Color: {item.color}
                          </small>
                          <small className="text-muted d-block mb-2">
                            Size: {item.size}
                          </small>
                          <p
                            className="mb-0 fw-bold"
                            style={{ color: "#5B5EFF" }}
                          >
                            ${item.price}
                          </p>
                        </div>

                        {/* Quantity and Remove */}
                        <div className="col-md-4 d-flex justify-content-between align-items-center">
                          <div
                            className="input-group"
                            style={{ width: "120px" }}
                          >
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => updateQty(item.id, -1)}
                            >
                              −
                            </button>

                            <input
                              type="text"
                              className="form-control form-control-sm text-center"
                              value={item.quantity || 1}
                              readOnly
                            />

                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => updateQty(item.id, 1)}
                            >
                              +
                            </button>
                          </div>

                          <button
                            className="btn btn-sm text-danger"
                            onClick={() => removeFromCart(index)}
                            style={{ fontSize: "18px" }}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Order Summary */}
            {cart.length > 0 && (
              <div className="col-lg-5">
                <div className="card border-0 shadow-sm p-4">
                  {/* Promo Code */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">
                      Have a promo code?
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter code here"
                      />
                      <button
                        className="btn"
                        style={{ backgroundColor: "#5B5EFF", color: "white" }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="border-top pt-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Shipping</span>
                      <span>$0.00</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Taxes</span>
                      <span>${taxes.toFixed(2)}</span>
                    </div>

                    <div
                      className="border-top pt-3 d-flex justify-content-between mb-4"
                      style={{ fontSize: "18px", fontWeight: "bold" }}
                    >
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    {/* Checkout Buttons */}
                    <button
                      className="btn w-100 mb-3"
                      style={{
                        backgroundColor: "#5B5EFF",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                      onClick={() => setPage("checkout")}
                    >
                      Proceed to checkout
                    </button>
                    <button
                      className="btn btn-outline-secondary w-100"
                      onClick={() => setPage("products")}
                    >
                      Continue shopping
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
