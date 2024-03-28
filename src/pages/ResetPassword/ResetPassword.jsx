import React, { useState } from 'react'
import './ResetPassword.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();


  async function resetPassword(values) {
    setLoader(true);
    await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
      .catch(() => {
        setLoader(false);
      });
    navigate('/login');
  }

  let validationSchema = Yup.object({
    email: Yup.string().required('email is required').email(),
    newPassword: Yup.string().required('password is required').min(8, 'password must be at least 8 characters'),
  })

  let formik = useFormik({
    initialValues: {
      newPassword: '',
    },
    validationSchema,
    onSubmit: resetPassword,
  })
  return (
    <div className="w-75 mx-auto p-5 vh-100">
      <h1>Reset Password :</h1>
      <form className='pt-3' onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" id="email" className="form-control" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.email && formik.touched.email && (<div className="alert alert-danger">{formik.errors.email}</div>)}
        </div>
        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input type="password" name="newPassword" id="newPassword" className="form-control" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.newPassword && formik.touched.newPassword && (<div className="alert alert-danger">{formik.errors.newPassword}</div>)}
        </div>
        <button type="submit" disabled={!formik.isValid} className="btn bg-main text-white d-block ms-auto">{loader ? (<ColorRing visible={true} height="25" width="25" ariaLabel="color-ring-loading" wrapperStyle={{}} wrapperClass="color-ring-wrapper" colors={['#fff', '#fff', '#fff', '#fff', '#fff']} />) : ('Reset Password')}</button>
      </form>
    </div>
  )
}
