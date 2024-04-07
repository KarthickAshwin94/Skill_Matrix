const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const router = express.Router();
const nodemailer = require('nodemailer');


// PostgreSQL connection pool
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'my_database',
  password: 'admin123',
  port: 5400,
});
app.use(cors());
app.use(bodyParser.json());// used for parsing incoming request in JSON format



// Endpoint for user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
   console.log(username, password);
  try {
    const result = await pool.query(`SELECT * FROM accounts WHERE username = $1;`, [username]);
    if (result.rowCount === 1) {
      const user = result.rows[0]; 
      console.log("response",user)
      const passwordMatch = await bcrypt.compare(password, user.password);
      //console.log(passwordMatch);
       if (passwordMatch) {
        console.log("Entered if statement in passwordMaytch")
        const tokenSecret = process.env.JWT_SECRET || 'default_secret_key';

        const token = jwt.sign({ username: user.username, user_type: user.user_type }, tokenSecret, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login Successful', token , user_type: user.user_type});
        
       } else {
        res.status(401).json({ message: 'Invalid username or password' });
       }
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
});


//forgot password page which is the page where the user enters his email id and gets the reset link for password
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
      // Generate a random token (you can use crypto or any library for this)
      const token = generateRandomToken();

      // Send the reset password email with the token included in the URL
      await transporter.sendMail({
          from: 'karthickashwin423@gmail.com',
          to: email,
          subject: 'Reset Your Password',
          html: `<p>To reset your password, click on the following link:</p><p><a href="http://localhost:3000/resetpassword/${token}">Reset Password</a></p>`
      });

      // Respond with success message
      res.status(200).json({ message: 'Reset password email sent. Please check your email.' });
  } catch (error) {
      console.error('Failed to send reset password email:', error);
      res.status(500).json({ message: 'Failed to send reset password email. Please try again later.' });
  }
});

// Define your email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'karthickashwin423@gmail.com', // Your email address
        pass: 'uxgp zcte moyn rsjf' // Your email password
    }
});

// Define the route to handle forgot password requests 
// This is the link which the user receives when the user opted for forgot password


// Helper function to generate random token (example)
function generateRandomToken() {
    return Math.random().toString(36).substr(2, 10);
}

// Export the router
module.exports = router;


app.post('/createUser', async (req, res) => {
    const { newUsername, newEmail, newPassword } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 is the salt rounds

        // Insert new user into the database with hashed password
        const result = await pool.query(`INSERT INTO accounts (username, email, password, user_type) VALUES ($1, $2, $3, $4);`, [newUsername, newEmail, hashedPassword, 'user']);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


function validateToken(token) {
  // Example: Check if the token is not expired
  const tokenExpirationDate = (token);
  const currentDate = new Date();
  return tokenExpirationDate > currentDate;
}


// Assuming you have already defined your express app instance and imported necessary modules


// POST endpoint for resetting password
app.post('/reset-password', async (req, res) => {
  const { email, token, newPassword } = req.body;
  try {
    // Validate the token (assuming validateToken is a synchronous function)
   
    const isValidToken = validateToken(token);
    console.log(req.body);
    console.log(isValidToken);
    if (!isValidToken) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Assuming salt rounds as 10

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Respond with success message
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.post(`/make-approver/:username`, async (req, res) => {
  const { username } = req.params;

  try {
    // Execute a raw SQL query to update the is_approver column
    await pool.query('UPDATE accounts SET is_approver = $1 WHERE username = $2', [true, username]);
    
    console.log('User is now an approver:', username);
  
    return res.status(200).json({ message: 'User is now an approver' });
  } catch (error) {
    console.error('Error making user an approver:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



//api to insert skills for each user in skills table
app.post('/add-skill', async (req, res) => {
  try {
    console.log(req.body)
    const { technologyName, proficiency, project, isApproved } = req.body;
    const username = 'arjun'

    // Check if any required field is missing


    if (!username && !technologyName && !proficiency && !isApproved) {
      console.log("in this")
      return res.status(400).json({ message: 'All fields are required' });
    }
    else
    {
          // Insert skill data into the skills table
    const query = `
    INSERT INTO skills (username, technology, proficiency, projects_worked, is_approved)
    VALUES ($1, $2, $3, $4, $5)`;
  await pool.query(query, [username, technologyName, proficiency, project, isApproved]);

  res.status(201).json({ message: 'Skill added successfully' });
    }

  } catch (error) {
    console.error('Error adding skill:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


