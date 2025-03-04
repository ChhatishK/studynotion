import React from 'react'
import ContactUsForm from '../contactus/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto text-richblack-300'>

        <h1 className='text-4xl font-semibold text-center text-richblack-5'>Get In Touch</h1>
        <p className='text-base font-medium text-center mt-3 mb-10'>We’d love to here for you, Please fill out this form.</p>

        <ContactUsForm />
        
    </div>
  )
}

export default ContactFormSection