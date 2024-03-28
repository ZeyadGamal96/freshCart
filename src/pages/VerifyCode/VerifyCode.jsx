import React, { useState } from 'react'
import './VerifyCode.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'

export default function VerifyCode() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  async function sendVerification(values) {
    setLoader(true);
    const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
    .catch(() => {
      formik.setErrors({ resetCode: ('Reset code is invalid or has expired') });
      setLoader(false);
    });
    if (data.status === "Success") {
      navigate('/resetpassword')
    }
  }

  let validationSchema = Yup.object({
    resetCode: Yup.string().required('code is required')
  })

  let formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema,
    onSubmit: sendVerification,
  })

  return (
    <div className="w-75 mx-auto p-5 vh-100">
      <h1>Verification :</h1>
      <form className='pt-3' onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Reset Code</label>
          <input type="text" name="resetCode" id="resetCode" className="form-control" value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.resetCode && formik.touched.resetCode && (<div className="alert alert-danger">{formik.errors.resetCode}</div>)}
        </div>
        <button type="submit" disabled={!formik.isValid} className="btn bg-main text-white d-block ms-auto">{loader ? (<ColorRing visible={true} height="25" width="25" ariaLabel="color-ring-loading" wrapperStyle={{}} wrapperClass="color-ring-wrapper" colors={['#fff', '#fff', '#fff', '#fff', '#fff']} />) : ('Verify')}</button>
      </form>
    </div>
  )
}
