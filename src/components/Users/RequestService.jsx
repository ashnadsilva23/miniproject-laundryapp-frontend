import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from '../Admin/Footer';
import './Modal.css'; // Include modal CSS styles

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Success!</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const RequestService = () => {
  const [services, setServices] = useState([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [expandedServiceId, setExpandedServiceId] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3031/getservices');
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const toggleServiceSelection = (serviceId) => {
    setSelectedServiceIds((prevSelected) => {
      const isSelected = prevSelected.includes(serviceId);
      const updatedSelected = isSelected
        ? prevSelected.filter(id => id !== serviceId)
        : [...prevSelected, serviceId];

      // Reset quantities for the service
      if (!isSelected) {
        setQuantities(prev => ({
          ...prev,
          [serviceId]: {},
        }));
      } else {
        // Remove quantities for unselected service
        const { [serviceId]: _, ...rest } = quantities;
        setQuantities(rest);
      }

      calculateTotalCost(updatedSelected);
      return updatedSelected;
    });
  };

  const incrementQuantity = (serviceId, productId) => {
    setQuantities((prev) => {
      const currentQty = prev[serviceId]?.[productId] || 0;
      const newQty = currentQty + 1;

      // Update quantities
      const updatedQuantities = {
        ...prev,
        [serviceId]: {
          ...prev[serviceId],
          [productId]: newQty,
        },
      };

      calculateTotalCost(selectedServiceIds, updatedQuantities);
      return updatedQuantities;
    });

    setTotalQuantities(prev => prev + 1);
  };

  const decrementQuantity = (serviceId, productId) => {
    setQuantities((prev) => {
      const currentQty = prev[serviceId]?.[productId] || 0;
      const newQty = Math.max(currentQty - 1, 0);

      // Update quantities
      const updatedQuantities = {
        ...prev,
        [serviceId]: {
          ...prev[serviceId],
          [productId]: newQty,
        },
      };

      calculateTotalCost(selectedServiceIds, updatedQuantities);
      return updatedQuantities;
    });

    setTotalQuantities(prev => Math.max(prev - 1, 0));
  };

  const calculateTotalCost = (updatedSelected = selectedServiceIds, updatedQuantities = quantities) => {
    let cost = 0;

    updatedSelected.forEach(serviceId => {
      const service = services.find(s => s._id === serviceId);
      if (service) {
        cost += Number(service.price) || 0; // Add service price
      }

      // Add product prices
      const products = updatedQuantities[serviceId] || {};
      Object.entries(products).forEach(([productId, qty]) => {
        const product = service?.products?.find(p => p._id === productId);
        if (product && qty > 0) {
          cost += (Number(product.productPrice) || 0) * qty; // Add product total
        }
      });
    });

    setTotalCost(cost);
  };

  const handleRequest = async () => {
    const servicesArray = selectedServiceIds.map(serviceId => ({
      serviceId,
      products: Object.entries(quantities[serviceId] || {}).map(([productId, quantity]) => ({
        productId,
        quantity,
      })).filter(prod => prod.quantity > 0),
    }));

    const requestData = {
      userId,
      totalAmount: totalCost,
      numberOfProducts: totalQuantities,
      services: servicesArray,
    };

    try {
      const response = await axios.post('http://localhost:3031/requests', requestData);
      console.log(response.data);
      setSubmissionStatus('Request submitted successfully!');
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error submitting request:', error.response?.data || error.message);
      setSubmissionStatus('Error submitting request. Please try again.');
    }
  };

  const fetchProducts = async (serviceId) => {
    try {
      const response = await axios.get(`http://localhost:3031/getproducts?serviceId=${serviceId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  const toggleProducts = async (serviceId) => {
    if (expandedServiceId === serviceId) {
      setExpandedServiceId(null);
    } else {
      const products = await fetchProducts(serviceId);
      const serviceIndex = services.findIndex(s => s._id === serviceId);
      services[serviceIndex].products = products;
      setExpandedServiceId(serviceId);
    }
  };

  return (
    <div>
      <Header />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} message={submissionStatus} />
      <div className="container mt-5">
        <h3>Available Services</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Select</th>
              <th>Service Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {services.map((service) => (
    <React.Fragment key={service._id}>
      <tr>
        <td>
          <input
            type="checkbox"
            checked={selectedServiceIds.includes(service._id)}
            onChange={() => {
              toggleServiceSelection(service._id);
              toggleProducts(service._id);
            }}
          />
        </td>
        <td>{service.sname}</td>
        <td>{service.description}</td>
        <td>{service.price}</td>
        <td>
          <button className="btn btn-info" onClick={() => toggleProducts(service._id)}>
            {expandedServiceId === service._id ? 'Hide Products' : 'Show Products'}
          </button>
        </td>
      </tr>
      {expandedServiceId === service._id && service.products && (
        <tr>
          <td colSpan="5">
            <table className="table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Add</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {service.products.map((product) => {
                  const quantity = quantities[service._id]?.[product._id] || 0;
                  return (
                    <tr key={product._id}>
                      <td>{product.productname}</td>
                      <td>{product.productPrice}</td>
                      <td>{quantity}</td>
                      <td>
                        <button className="btn btn-secondary" onClick={() => incrementQuantity(service._id, product._id)}>+</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => decrementQuantity(service._id, product._id)} disabled={quantity === 0}>-</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </React.Fragment>
  ))}
  <tr>
    <td colSpan="3" className="text-right"><strong>Total Quantity:</strong></td>
    <td colSpan="2">{totalQuantities}</td>
  </tr>
  <tr>
    <td colSpan="3" className="text-right"><strong>Total Amount:</strong></td>
    <td colSpan="2">{totalCost.toFixed(2)}</td>
  </tr>
</tbody>

        </table>
        <button className="btn btn-primary" onClick={handleRequest} disabled={totalQuantities === 0}>Submit Request</button>
      </div>
      <Footer />
    </div>
  );
};

export default RequestService;
