const Contact = require('../models/ContactUs');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');

// save contact us details
exports.saveContact = async (req, res) => {
    try {
        // get data
        const {firstName, lastName, email, contactNumber, message} = req.body;
        // check user exists in the database or not
        const existingUser = await User.findOne({email});
        const existingContact = await Contact.findOne({email});
        
        // save details
        if (existingUser && existingContact) {
            await Contact.findOneAndUpdate({email: email}, {
                $push: {
                    message: message
                }
            })
        } else if (existingUser && !existingContact) {
            await Contact.create({
                firstName, lastName, email, contactNumber,message, user:existingUser.accountType
            })
        } else if (existingContact && !existingUser) {
            await Contact.findOne({email: email},
                {
                    $push: {
                        message: message
                    }
                }
            )
        } else {
            await Contact.create({
                firstName, lastName, email, contactNumber, message, user: "Visitor"
            })
        }

        // send mail to the user
        let emailResponse = mailSender(email, "Welcome to StudyNotion", `
                <p> Dear <b>${firstName} ${lastName} </b> </p>

                <p>Your message has been sent to our support team they reach to you shortly.</p>

                <b>Regards,</b>
                <p>StudyNotion Support</p>
            `)
        console.log("User email response: ",emailResponse);

        // send mail to the admin
        emailResponse = mailSender(process.env.MAIL_USER, "New Message - StudyNotion", `
                <p>Dear <b>Support Team</b></p>

                <p>You have received a new message from <b>${firstName} ${lastName}</b>.</p>

                <p>${message}</p>
            `)
        console.log("Support Team response: ", emailResponse);

        // return response
        return res.status(200).json({
            success: true,
            message: "Your message has been sent successfully."
        });

    } catch {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}