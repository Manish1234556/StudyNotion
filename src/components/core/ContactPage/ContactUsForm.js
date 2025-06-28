import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../../services/apiconnector';
import { contactusEndpoint } from '../../../services/apis';
import CountryCode from "../../../data/countrycode.json"
const ContactUsForm = () => {

    const [loading,setLoading] = useState(false);
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors,isSubmitSuccessful },
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("Logging data",data);
        try{
            setLoading(true);
            // const response= await apiConnector("Post",contactusEndpoint.CONTACT_US_API,data);
            const response={status:"OK"};
            console.log("Logging response",response);
            setLoading(false);
        }
        catch(error){
            console.log("Error",error.message);
            setLoading(false);
        }
    }
    useEffect(() => {
        reset({
            email:"",
            firstname:"",
            lastname:"",
            message:"",
            phoneNo:"",
        })
    },[reset,isSubmitSuccessful])
  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col gap-14">
        <div className="flex gap-5 ">
          {/* firstNAME */}
          <div className="flex flex-col">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              className="text-black"
              placeholder="Enter First Name"
              {...register("firstname", { required: true })}
            />
            {errors.firstName && <span>Please Enter Your First Name</span>}
          </div>

          {/* lastNAME */}
          <div className="flex flex-col">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              className="text-black"
              placeholder="Enter Last Name"
              {...register("lastname")}
            />
          </div>
        </div>
        {/* email */}
        <div className="flex flex-col">
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter Email Address"
            className="text-black"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Please Enter Your Email Address</span>}
        </div>

        {/* phone no */}
        <div className="flex flex-col gap-x-10">
          <label htmlFor="phonenumber">Phone Number</label>
          <div className="flex flex-row gap-5">
            {/* dropdown */}
            <div>
              <select
                className=" text-black w-[80px]"
                name="dropdown"
                id="dropdown"
                {...register("countrycode", { required: true })}
              >
                {CountryCode.map((element, index) => {
                  return (
                    <option key={index} value={element.code}>
                      {element.code} -{element.country}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <input
                type="number"
                name="phonenumber"
                id="phonenumber"
                placeholder="12345 6789"
                className="w-[calc(100% - 80px)] text-black"
                {...register("phoneNo", {
                  required: {
                    value: true,
                    message: "Please enter Phone Number",
                  },
                  maxLength: { value: 10, message: "Invalid Phone Number" },
                  minLength: { value: 8, message: "Invalid Phone Number" },
                })}
              />
            </div>
          </div>
          {errors.phoneNo && <span>{errors.phoneNo.message}</span>}
        </div>

        {/* message */}
        <div className="flex flex-col">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="7"
            placeholder="Enter tour Message Here"
            className="text-black"
            {...register("message", { required: true })}
          />
          {errors.message && <span>Please Enter Your Message.</span>}
        </div>

        <button
          type="submit"
          className="rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold text-black"
        >
          Send Message
        </button>
      </div>
    </form>
  );
  
}

export default ContactUsForm
