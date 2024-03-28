import React, { useState } from 'react'
import './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'

export default function Register() {
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  let navigate = useNavigate();

  async function submitRegisterForm(values) {
    setLoader(true);
    setError(null); 
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
    .catch((error) => {
      setError(error.response.data.message);
      setLoader(false);
    });
    if (data.message === "success") {
      navigate("/login");
      setLoader(false);
    }
  }

  let validationSchema = Yup.object({
    name: Yup.string().required('name is required').min(3),
    email: Yup.string().required('email is required').email(),
    password: Yup.string().required('password is required').min(8, 'password must be at least 8 characters'),
    rePassword: Yup.string().required('repassword is required').oneOf([Yup.ref('password')], 'repassword does not match password'),
    phone: Yup.string().required('phone number is required').matches(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s.]{0,1}[0-9]{3}[-\s.]{0,1}[0-9]{4}$/, 'invalid phone number'),
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: submitRegisterForm,
  })

  return <>
    <div className="w-75 mx-auto p-5 min-vh-100">
      <h1>Register Now :</h1>
      {error && (<div className='alert alert-danger'>{error}</div>)}
      <form className='pt-3' onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" id="name" className="form-control" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="" />
          {formik.errors.name && formik.touched.name && (<div className="alert alert-danger">{formik.errors.name}</div>)}
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" id="email" className="form-control" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="" />
          {formik.errors.email && formik.touched.email && (<div className="alert alert-danger">{formik.errors.email}</div>)}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" id="password" className="form-control" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="" />
          {formik.errors.password && formik.touched.password && (<div className="alert alert-danger">{formik.errors.password}</div>)}
        </div>
        <div className="mb-3">
          <label className="form-label">Repassword</label>
          <input type="password" name="rePassword" id="rePassword" className="form-control" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="" />
          {formik.errors.rePassword && formik.touched.rePassword && (<div className="alert alert-danger">{formik.errors.rePassword}</div>)}
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="number" name="phone" id="phone" className="form-control" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="" />
          {formik.errors.phone && formik.touched.phone && (<div className="alert alert-danger">{formik.errors.phone}</div>)}
        </div>
        <button type="submit" disabled={!formik.isValid} className="btn bg-main text-white d-block ms-auto">{loader ? (<ColorRing visible={true} height="25" width="25" ariaLabel="color-ring-loading" wrapperStyle={{}} wrapperClass="color-ring-wrapper" colors={['#fff', '#fff', '#fff', '#fff', '#fff']} />) : ('Register')}</button>
      </form>
    </div>
  </>
}
