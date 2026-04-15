export const renderPasswordResetEmail = (resetLink: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Poppins:wght@400;600&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #F4F7FF; -webkit-font-smoothing: antialiased;">
  <div style="font-family: 'Poppins', 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #E0E7FF;">
    
    <div style="padding: 30px; text-align: center;">
       <h1 style="font-family: 'Fredoka One', 'Comic Sans MS', cursive; color: #95B1EE; margin: 0; font-size: 32px;">TickTask</h1>
    </div>

    <div style="padding: 0 40px 40px 40px; text-align: center;">
      <h2 style="font-family: 'Fredoka One', 'Arial Black', sans-serif; color: #3C4045; font-size: 24px; margin-bottom: 15px; font-weight: normal;">
        Forgot your password?
      </h2>
      
      <p style="color: #3C4045; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
        No worries! It happens to the best of us. <br>
        Click the button below to set up a new one.
      </p>

      <div style="margin-bottom: 30px;">
        <a href="${resetLink}" 
           style="background-color: #95B1EE; color: #ffffff; padding: 16px 35px; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; display: inline-block;">
           Reset Password
        </a>
      </div>

      <div style="padding: 15px; background-color: #FFFDF5; border-radius: 12px; border: 1px solid #E7F1A8;">
        <p style="font-size: 13px; color: #3C4045; margin: 0;">
          <strong>Note:</strong> This link expires in 15 minutes. <br>
          If you didn't ask for this, you can safely ignore this email.
        </p>
      </div>
    </div>

    <div style="padding: 25px; background-color: #F9FAFB; text-align: center; border-top: 1px solid #EEEEEE;">
      <p style="font-size: 11px; color: #A7A7A7; margin: 0 0 10px 0; line-height: 1.4;">
        If the button above doesn't work, copy and paste this link:<br>
        <span style="color: #95B1EE; word-break: break-all;">${resetLink}</span>
      </p>
      <p style="font-family: 'Fredoka One', cursive; font-size: 14px; color: #95B1EE; margin: 0;">
        TickTask
      </p>
    </div>
  </div>
</body>
</html>
`;
