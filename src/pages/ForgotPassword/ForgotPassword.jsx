import React, { useState } from 'react'
import './ForgotPassword.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  async function sendCode(values) {
    setLoader(true);
    const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
      .catch(() => {
        setLoader(false);
      });
    if (data.statusMsg === 'success') {
      navigate("/verifyCode");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().required('email is required').email(),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: sendCode,
  })

  return (
    <div className="w-75 mx-auto p-5 vh-100">
      <h1>Forgotten Password :</h1>
      <form className='pt-3' onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" id="email" className="form-control" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.email && formik.touched.email && (<div className="alert alert-danger">{formik.errors.email}</div>)}
        </div>
        <button type="submit" disabled={!formik.isValid} className="btn bg-main text-white d-block ms-auto">{loader ? (<ColorRing visible={true} height="25" width="25" ariaLabel="color-ring-loading" wrapperStyle={{}} wrapperClass="color-ring-wrapper" colors={['#fff', '#fff', '#fff', '#fff', '#fff']} />) : ('Send Code')}</button>
      </form>
    </div>
  )
}
