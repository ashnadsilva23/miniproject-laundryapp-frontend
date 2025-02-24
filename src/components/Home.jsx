import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="App">
      {/* Header */}
      <header>
        <nav>
          <div className="logo">LaundryPro</div>
          <ul className="nav-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to LaundryPro</h1>
          <p>Efficient, fast, and reliable laundry services.</p>
          <a href="#services" className="cta-btn">Explore Services</a>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <h2>Services We Offer</h2>
        <div className="service-list">
          <div className="service-item">
            <h3>Wash & Fold</h3>
            <p>Professional washing and folding of all types of garments.</p>
          </div>
          <div className="service-item">
            <h3>Dry Cleaning</h3>
            <p>Top-notch dry cleaning for your delicate fabrics and formal wear.</p>
          </div>
          <div className="service-item">
            <h3>Ironing Service</h3>
            <p>Expert ironing to ensure your clothes are wrinkle-free and ready to wear.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <h2>Contact Us</h2>
        <div className="contact-info">
          <p><strong>Phone:</strong> +123 456 7890</p>
          <p><strong>Email:</strong> contact@laundrypro.com</p>
          <p><strong>Address:</strong> 123 Laundry St, Clean City, Washland</p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 LaundryPro. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
