// sendgrid  //

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail =(name,email)=>{ sgMail.send({
    to: email,
    from: 'naufalahmadfauz@gmail.com',
    subject:'Welcome to Task Manager App',
    text:`Hello,${name} . Welcome to my Task Manager App,I hope you enjoy using my app.`
})}

const sendCancelationEmail = (name,email)=>{sgMail.send({
    to: email,
    from: 'naufalahmadfauz@gmail.com',
    subject:`Goodbye,${name}`,
    text:`I'm Truly sorry for any inconvenience for Task Manager App,i hope that i see you again next time.`
})}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail,
}