const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service : 'Gmail',
    
    auth: {
      user: 'buylend2022@gmail.com',
      pass: 'buylend123',    
    }
    
});

const sendMail = (to,otp) =>{
    var mailOptions={
        to,
        subject: "OTP for registration: ",
        html: `OTP for account verification is <h2 style='font-weight:bold;'>${otp}</h1>`
      };
      const promise = new Promise((resolve,reject)=>{
        transporter.sendMail(mailOptions, (error, info) => {
          if(error){
            resolve(false)
          }else{
            resolve(true)
          }
      });
    });
    return promise;
}

module.exports = {sendMail};