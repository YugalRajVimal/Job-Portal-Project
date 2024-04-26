import nodemailer from "nodemailer";

export const sendMail = async (receiverEmail) =>{
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.MAILER_USER,
            pass:process.env.MAILER_PASS
        },
    });

    //Configure email content
    const mailOptions = {
        from:process.env.MAILER_USER,
        to:receiverEmail,
        sucject:"Job Application Received",
        text:"Dear User Thank you for applying to a job at Easily. We have received your application and are currently reviewing it If your qualifications match our requirements, we will contact you for the next steps of the selection process Thank you for your interest in joining our team Best regards The Easily Team"
    }

    //Sending Email
    try {
        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.log("Email sent failed",error);
    }
}