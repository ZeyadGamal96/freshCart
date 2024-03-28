import React from "react";
import payment from '../../assets/images/payment-logos.png';
import stores from '../../assets/images/stores.png';

export default function Footer() {
  return (
    <div className="bg-main-light text-dark py-5 ">
      <div className="container">
        <div className="row border-bottom">
          <div className="col-md-12">
            <h3 className="h2">Get the FreshCart app</h3>
            <p>We will send you a link, open it on your phone to download the app</p>
            <form className="d-flex align-items-center justify-content-center mb-4">
              <input type="email" placeholder="Email" className="form-control me-2" style={{ flex: '1' }} />
              <button type="submit" className="btn bg-main text-white" style={{ minWidth: '150px' }}>Share App Link</button>
            </form>
          </div>
        </div>
        <div className="row border-bottom mb-5">
          <div className="col-md-6 ps-5 my-4 d-flex align-items-center">
            <p className="me-3 mb-0">Payment Partners</p>
            <img src={payment} alt="payment" style={{ width: '200px' }} className="ms-2" />
          </div>
          <div className=" col-md-6 my-4 d-flex align-items-center">
            <p className="me-3 mb-0">Get deliveries with FreshCart</p>
            <img src={stores} alt="stores" style={{ width: '200px' }} className="ms-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
