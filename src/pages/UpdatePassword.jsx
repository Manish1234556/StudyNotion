import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI';
import { setToken } from '../slices/authSlice';
import { Link, useLocation } from 'react-router-dom';
import { AiTwotoneEye } from "react-icons/ai";
import { AiTwotoneEyeInvisible } from "react-icons/ai";



const UpdatePassword = () => {

    const [formData,setFormData] = useState({
        password:"",
        confirmPassword:"",
    })
    const dispatch=useDispatch();
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {loading} = useSelector((state) => state.auth);
    const {password,confirmPassword} = formData; 
    const location = useLocation();

    const handleOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name] : e.target.value,
            }
        ))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token));
    }
  return (
    <div className="text-white">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Choose new Password</h1>
          <p>Almost done. Enter your new password and you are all set.</p>
          <form onSubmit={handleOnSubmit}>
            <label>
              <p>New Password <sup>*</sup></p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Password"
                className="w-full p-6 bg-richblack-600 text-richblack-5"
              />
              <span onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (
                  <AiTwotoneEye fontSize={24} />
                ) : (
                  <AiTwotoneEyeInvisible fontSize={24} />
                )}
              </span>
            </label>

            <label>
              <p>Confirm New Password*</p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="w-full p-6 bg-richblack-600 text-richblack-5"
              />
              <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? (
                  <AiTwotoneEye fontSize={24} />
                ) : (
                  <AiTwotoneEyeInvisible fontSize={24} />
                )}
              </span>
            </label>

            <button type="submit">Reset Password</button>
          </form>

          <div>
            <Link to="/login">
              <p>Back to login </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePassword
