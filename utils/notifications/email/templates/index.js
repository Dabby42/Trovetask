export const botEmailTemplate = ({name, message}) => (
  `<html>
    <head></head>
    <body>
      <h4>Hi ${name}</h4>
      
      <p> ${message}</p>
      <br>
      <br>

      <p>Dochase Team</p>
    </body>
  </html>`
);

export const resetPasswordTemplate = ({name, token}) => (
  `<html>
    <head></head>
    <body>
      <h4>Hi ${name}</h4>
      <p>Please click the link below to reset your password</p>
      <p><a href="${process.env.CLIENT_URL}/resetpassword/${token}">Reset Password</a></p>
      <p>Or copy the link here <a href="${process.env.CLIENT_URL}/resetpassword/${token}">${process.env.CLIENT_URL}/resetpassword/${token}</a></p>
    </body>
  </html>`
);
