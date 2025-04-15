import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../../services/apiconnector";
import { contactusEndpoint } from "../../../services/api";
import countrycode from '../../../data/countrycode.json'

const {
  CONTACT_US_API
} = contactusEndpoint

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const submitcontactForm = async (data) => {

        console.log("Login data", data);

        try {
          setLoading(true);
          const response = await apiConnector("POST", CONTACT_US_API, data);
          
          console.log("Contact us data: ", response);
          setLoading(false);
        } catch (error) {
          console.log("Error:", error.message);
          setLoading(false);
        }
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: "",
            });
        }
    }, [reset, isSubmitSuccessful]);

    return (
        <form onSubmit={handleSubmit(submitcontactForm)}>
            <div className="flex flex-col gap-6">
                <div className="flex gap-5 items-start lg:flex-row">
                    {/* firstName */}
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="firstName">First Name*</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            className="form-style"
                            placeholder="Enter first name"
                            {...register("firstName", { required: true })}
                        />
                        {errors.firstName && <span className=" text-pink-400">Enter First Name</span>}
                    </div>
                    {/* lastName */}
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            className="form-style"
                            placeholder="Enter last name"
                            {...register("lastName")}
                        />
                    </div>
                </div>

                {/* email */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email Address*</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-style"
                        placeholder="Enter email address"
                        {...register("email", { required: true })}
                    />

                    {errors.email && <span className="text-pink-400">Please enter email</span>}
                </div>

                {/* Phone number */}
                <div className="w-full flex flex-col gap-2">

                  <label htmlFor="phonenumber">Phone Number*</label>
                  <div className="w-full flex flex-row gap-5 items-center">
                      
                  {/* dropdown */}
                    <select 
                    className="form-style"
                    name="dropdown" id="dropdown"
                    {...register('contrycode', {required: true})}
                    >
                      {
                        countrycode.map((element, index) => {
                          return (
                            <option key={index} value={element.code}>
                              {element.code} - {element.country}
                            </option>
                          )
                        })
                      }
                    </select>

                    <input type="number" 
                        name="phonenumber"
                        id="phonenumber"
                        placeholder="12345 567898765"
                        className="form-style"
                        {...register('phoneNo',
                          {
                            required: {value: true, message: "Enter Phone number"},
                            maxLength: {value: 10, message: "Invalid phone number"},
                            minLength: {value: 8, message:"Invalid phone number"}
                          }
                        )}
                    />

                      
                  </div>
                  {
                      errors.phoneNo && (
                        <span className="text-pink-400">{errors.phoneNo.message}</span>
                      )
                    }

                </div>

                {/* message */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="message">Message*</label>
                    <textarea
                        name="message"
                        id="message"
                        rows="7"
                        cols="30"
                        className="form-style"
                        placeholder="Enter your message here"
                        {...register("message", { required: true })}
                    >
                    </textarea>
                      {errors.message && (
                          <span className="text-pink-400">Please enter your message</span>
                      )}
                </div>

                <button type="submit"
                className="rounded-md bg-yellow-50 text-center px-6  py-2 text-richblack-800 transition-all duration-200 hover:scale-95 select-none"
                >Send Message</button>
            </div>
        </form>
    );
};

export default ContactUsForm;
