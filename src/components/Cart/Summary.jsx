import React from "react";

const Summary = ({ cartItems = [] }) => {

  const SHIPPING = 50;
  const SAVINGS = 100;

  const subTotal = cartItems.reduce((sum, item) => {
    return (
      sum +
      Number(item.product?.selling_price || 0) *
        Number(item.quantity || 1)
    );
  }, 0);

  const total = subTotal - SAVINGS + SHIPPING;

  return (
    <div className="summary mb-3">
      <div className="summary-header">
        <h5>Order Summary</h5>
        <h5>Sub Total</h5>
      </div>
      <hr />

      <div className="summary-body">
        {cartItems.map((item) => (
          <div className="summary-products" key={item.id}>
            <div className="summary-list mb-2">
              <div className="d-flex align-items-start column-gap-2">
                <img
                  src={item.product?.images?.[0]}
                  height="75"
                  alt=""
                  
                  className="rounde-2 object-fit-cover"
                />
                <div className="summary-product">
                  <h5>
                    {item.product?.product_name} × {item.quantity}
                  </h5>
                  <h6 className="mb-1"><span className="text-dark">Color</span> :{item.product?.color}</h6>
                </div>
              </div>
                <div className="summary-price">
              <h6>
                ₹ {item.product?.selling_price * item.quantity}
              </h6>
                 </div>
            </div>
            <hr />
          </div>
        ))}
      </div>

      <div className="summary-footer">
     <div className="subtotal">
           <h5 className="mb-2">SubTotal</h5>
          <h6 className="mb-2">₹ {subTotal.toFixed(2)}</h6>
        </div>
    <div className="savings">
          <h5 className="mb-0">Savings</h5>
          <h6 className="mb-0">- ₹ {SAVINGS}</h6>
        </div>
        <hr />
        <div className="shipping">
          <h5 className="mb-0">Shipping</h5>
          <h6 className="mb-0">- ₹ {SHIPPING}</h6>
        </div>
        <hr />
        <div className="total">
          <h5 className="mb-0">Total</h5>
          <h6 className="mb-0">₹ {total.toFixed(2)}</h6>
        </div>
      </div>
    </div>
  );
};

export default Summary;
