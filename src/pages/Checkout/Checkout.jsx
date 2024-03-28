import React, { useContext, useState } from 'react'
import './Checkout.module.css'
import { useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext'
import * as Yup from 'yup'
import { ColorRing } from 'react-loader-spinner'

export default function Checkout() {
  const { userPayment } = useContext(CartContext);
  const [loader, setLoader] = useState(false);



  async function checkoutPayment(values) {
    try {
      setLoader(true);
      const { data } = await userPayment(values);
      window.open(data.session.url, '_blank'); 
      setLoader(false); 
      return data;
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  }
  


  let validationSchema = Yup.object({
    phone: Yup.string().required('Phone number is required').matches(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s.]{0,1}[0-9]{3}[-\s.]{0,1}[0-9]{4}$/, 'Invalid phone number'),
    city: Yup.string().nullable().required('City is required'),
  });

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema,
    onSubmit: checkoutPayment,
  });

  return (
    <div className="w-75 mx-auto p-5 vh-100">
      <h1>Checkout :</h1>
      <form className='pt-3' onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="number" name="phone" id="password" className="form-control" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.phone && formik.touched.phone && (<div className="alert alert-danger">{formik.errors.phone}</div>)}
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <input type="text" name="city" id="password" className="form-control" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="" />
          {formik.errors.city && formik.touched.city && (<div className="alert alert-danger">{formik.errors.city}</div>)}
        </div>
        <div className="mb-3">
          <label className="form-label">Details</label>
          <textarea type="text" name="details" id="details" className="form-control" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        </div>
        <button type="submit" disabled={!formik.isValid} className="btn bg-main text-white d-block ms-auto">
          {loader ? (<ColorRing visible={true} height="25" width="25" ariaLabel="color-ring-loading" wrapperStyle={{}} wrapperClass="color-ring-wrapper" colors={['#fff', '#fff', '#fff', '#fff', '#fff']} />) : ('Pay')}
        </button>
      </form>
    </div>
  );
}
