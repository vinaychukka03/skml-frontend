import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateInvoice = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    addBankDetails: false,
  });

  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [itemForm, setItemForm] = useState({
    description: "",
    quantity: "",
    unitPrice: "",
    subtotal: "",
  });

  /* ---------------- Item Logic ---------------- */

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...itemForm, [name]: value };

    if (
      (name === "quantity" || name === "unitPrice") &&
      updated.quantity &&
      updated.unitPrice
    ) {
      updated.subtotal = updated.quantity * updated.unitPrice;
    }

    if (name === "subtotal") {
      updated.quantity = "";
      updated.unitPrice = "";
    }

    setItemForm(updated);
  };

  const addItem = () => {
    if (!itemForm.description || !itemForm.subtotal) {
      toast.error("Description and Subtotal are required");
      return;
    }

    setItems([...items, itemForm]);
    setItemForm({ description: "", quantity: "", unitPrice: "", subtotal: "" });
    setShowModal(false);
    toast.success("Item added");
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
    toast.info("Item removed");
  };

  /* ---------------- Submit Invoice ---------------- */

  const resetForm = () => {
    setCustomer({
      customerName: "",
      customerPhone: "",
      customerAddress: "",
      addBankDetails: false,
    });
    setItems([]);
  };

  const submitInvoice = async () => {
    // Customer validations
    if (!customer.customerName.trim()) {
      toast.error("Customer name is required");
      return;
    }

    if (!customer.customerAddress.trim()) {
      toast.error("Customer address is required");
      return;
    }

    if (!/^\d{10}$/.test(customer.customerPhone)) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    if (items.length === 0) {
      toast.error("At least one item is required");
      return;
    }

    const payload = {
      ...customer,
      items,
    };

    try {
      setLoading(true);

      await axios.post(
        "https://skmlbackend.onrender.com/invoices",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Invoice submitted successfully");
      resetForm();
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again");
        localStorage.removeItem("token")
        navigate("/admin");
      }
      console.error(error);
      toast.error("Failed to submit invoice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container my-4 d-flex justify-content-center" >
        <div className="invoice-card" style={{ backgroundColor: 'beige', padding: '20px', border: '2px solid beige', borderRadius: '10px' }}>
          <h3 className="text-center mb-4">Create Invoice</h3>

          {/* Customer Fields */}
          <Form.Control
            className="mb-3"
            placeholder="Customer Name *"
            value={customer.customerName}
            onChange={(e) =>
              setCustomer({ ...customer, customerName: e.target.value })
            }
          />

          <Form.Control
            className="mb-3"
            placeholder="Customer Phone (10 digits)"
            value={customer.customerPhone}
            maxLength={10}
            onChange={(e) => {
              const onlyDigits = e.target.value.replace(/\D/g, "");
              setCustomer({ ...customer, customerPhone: onlyDigits });
            }}
          />

          <Form.Control
            as="textarea"
            rows={2}
            className="mb-3"
            placeholder="Customer Address *"
            value={customer.customerAddress}
            onChange={(e) =>
              setCustomer({ ...customer, customerAddress: e.target.value })
            }
          />

          {/* Add Bank Details */}
          <div className="d-flex align-items-center mb-3">
            <span className="me-2">Add Bank Details</span>
            <Form.Check
              type="checkbox"
              className="mt-0"
              checked={customer.addBankDetails}
              onChange={(e) =>
                setCustomer({ ...customer, addBankDetails: e.target.checked })
              }
            />
          </div>

          {/* Table */}
          <div className="table-responsive" style={{ maxHeight: "250px" }}>
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Subtotal</th>
                  <th>❌</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No items added
                    </td>
                  </tr>
                )}

                {items.map((it, i) => (
                  <tr key={i}>
                    <td>{it.description}</td>
                    <td>{it.quantity}</td>
                    <td>{it.unitPrice}</td>
                    <td>{it.subtotal}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteItem(i)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between gap-2 mt-3">
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Add Item
            </button>

            <button
              className="btn btn-success d-flex align-items-center"
              onClick={submitInvoice}
              disabled={loading}
            >
              {loading && (
                <Spinner animation="border" size="sm" className="me-2" />
              )}
              Submit Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            className="mb-2"
            placeholder="Description"
            name="description"
            value={itemForm.description}
            onChange={handleItemChange}
          />
          <Form.Control
            className="mb-2"
            placeholder="Quantity"
            name="quantity"
            value={itemForm.quantity}
            onChange={handleItemChange}
          />
          <Form.Control
            className="mb-2"
            placeholder="Unit Price"
            name="unitPrice"
            value={itemForm.unitPrice}
            onChange={handleItemChange}
          />
          <Form.Control
            className="mb-2"
            placeholder="Subtotal"
            name="subtotal"
            value={itemForm.subtotal}
            onChange={handleItemChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addItem}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Responsive Width Styles */}
      <style>
        {`
          .invoice-card {
            width: 50vw;
          }

          @media (max-width: 768px) {
            .invoice-card {
              width: 80vw;
            }
          }
        `}
      </style>
    </>
  );
};

export default CreateInvoice;
