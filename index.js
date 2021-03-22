const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
require('dotenv').config();
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact');
});

app.post('/send', (req, res) => {
  const output = `
    <h3>Details From The Form</h3>
    
      <p> Name: ${req.body.utmSource}
      Email: ${req.body.emailAddress}</p>
   
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
  service: 'gmail',
    auth: {
        user: 'jsnodejs9@gmail.com', // generated ethereal user
        pass: '!!developingnodejs#'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer" <jsnodejs9@gmail.com>', // sender address
      to: 'robustnumber1@gmail.com', // list of receivers
      subject: 'Using Nodejs', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
  });

app.listen(3000, () => console.log('Server started...'));