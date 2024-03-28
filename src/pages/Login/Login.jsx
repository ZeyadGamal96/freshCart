import React, { useState } from 'react'
import './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'
import { UserContext } from '../../Context/UserContext'
import { useContext } from 'react'

export default function Login() {
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const { setUserToken } = useContext(UserContext);
  const navigate = useNavigate();

  async function submitLoginForm(values) {
    setLoader(true);
    setError(null); 
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .catch((error) => {
        setError(error.response.data.message);
        setLoader(false);
      });
    if (data && data.message === "success") {
      localStorage.setItem('userToken', data.token);
      setUserToken(data.token);
      navigate("/");
    }
  }


  let validationSchema = Yup.object({
    email: Yup.string().required('email is required').email(),
    password: Yup.string().required('password is required').min(8, 'password must be at least 8 characters'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: submitLoginForm,
  })

  return <>
    <div className="w-75 mx-auto p-5 min-vh-100">
      <h1>Login :</h1>
      {error && (<div className='alert alert-danger'>{error}</div>)}
      <form className='pt-3' onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" id="email" className="form-control" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.email && formik.touched.email && (<div className="alert alert-danger">{formik.errors.email}</div>)}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" id="password" className="form-control" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.password && formik.touched.password && (<div className="alert alert-danger">{formik.errors.password}</div>)}
        </div>
        <div className='d-flex justify-content-between'>
          <Link to="/forgotpassword" className="forgotPassword">Forgot your password?</Link>
          <button type="submit" disabled={!formik.isValid} className="btn bg-main text-white">{loader ? (<ColorRing visible={true} height="25" width="25" ariaLabel="color-ring-loading" wrapperStyle={{}} wrapperClass="color-ring-wrapper" colors={['#fff', '#fff', '#fff', '#fff', '#fff']} />) : ('Login')}</button>
        </div>
      </form>
    </div>
  </>
}
