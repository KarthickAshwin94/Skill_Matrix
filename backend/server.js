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
  console.log(req.body);
  const { username, password,is_approver } = req.body;
  console.log(req.body);
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

/*
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
*/

// Define your email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'karthickashwin423@gmail.com', // Your email address
        pass: 'uxgp zcte moyn rsjf' // Your email password
    }
});

// server.js or app.js

app.use(bodyParser.json());
// Function to generate random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Function to store OTP in the database with expiration timestamp
async function storeOTP(email) {
  try {
    // Generate OTP
    const otp = generateOTP();
    console.log(otp);

    // Calculate expiration time (e.g., 10 minutes from now)
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 10); // Set expiration time to 10 minutes from now

    const query = 'INSERT INTO otps (email, otp_code, expires_at) VALUES ($1, $2, $3)';
    await pool.query(query, [email, otp, expirationTime]);
    console.log('OTP stored successfully in the database');

    return otp; // Return the generated OTP
  } catch (error) {
    console.error('Error storing OTP:', error);
    throw error; // Throw error for handling at higher levels
  }
}


// Endpoint for sending OTP
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = await storeOTP(email);
  const resetPasswordLink = `http://localhost:3000/reset-password`; // Change the URL as needed

  // Store the OTP in the database or memory for verification later

  // Send OTP and reset password link to the user's email
  const mailOptions = {
    from: 'karthickashwin423@gmail.com',
    to: email,
    subject: 'Password Reset OTP',
    html: `
      <p>Your OTP for password reset is: ${otp}.</p>
      <p>Click the following link to reset your password:</p>
      <a href="${resetPasswordLink}">Reset Password</a>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending OTP:', error);
      res.status(500).json({ message: 'Failed to send OTP' });
    } else {
      console.log('OTP sent:', info.response);
      res.status(200).json({ message: 'OTP sent successfully' });
    }
  });
});




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
//-------------------------------------------------------

//----------------------------------------------------------
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
    console.log("Hello There !");
    console.log(req.body)

    const { technologyName, proficiency, project, isApproved,username } = req.body;
    
    // Check if any required field is missing
    
    if (!username && !technologyName && !proficiency && !isApproved) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
          // Insert skill data into the skills table
    const query = `
    INSERT INTO skills (username, technology, proficiency, projects_worked,is_approved)
    VALUES ($1, $2, $3, $4,$5)`;
  await pool.query(query, [username, technologyName, proficiency, project, isApproved]);

  res.status(201).json({ message: 'Skill added successfully' });
    

  } catch (error) {
    console.error('Error adding skill:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());
// POST endpoint for adding a new certification
app.post('/add-certification', async (req, res) => {
  try {
    const { username, courseName, institutionName, fromDate, toDate, score, isApproved } = req.body;

    // Check if any required field is missing
    if (!username || !courseName || !institutionName || !fromDate || !toDate || !score) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Parse date strings into Date objects
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);

    // Handle checkbox value for isApproved
    const isApprovedValue = isApproved === 'true'; // Convert string to boolean

    // Insert certification data into the certifications table
    const query = `
      INSERT INTO certifications (username, course_name, institution_name, from_date, to_date, score, is_approved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    await pool.query(query, [username, courseName, institutionName, fromDateObj, toDateObj, score, isApprovedValue]);

    res.status(201).json({ message: 'Certification added successfully' });
  } catch (error) {
    console.error('Error adding certification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



/*
// Define the route for adding a new project
app.post('/add-project', async (req, res) => {
  try {
   
    const { projectName, roleAssigned, fromDate, toDate, totalDays, username } = req.body;
    // Check if any required field is missing
    if (!username || !projectName || !roleAssigned || !fromDate || !toDate || !totalDays) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Insert project data into the projects table
    const query = `
      INSERT INTO projects (username, project_name, role_assigned, from_date, to_date, total_days, is_approved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    await pool.query(query, [username, projectName, roleAssigned, fromDate, toDate, totalDays, false]);

    res.status(201).json({ message: 'Project added successfully' });
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
*/

// Define the route for adding a new project
app.post('/add-project', async (req, res) => {
  try {
    const { username, projectName, roleAssigned, fromDate, toDate, totalDays } = req.body;
    // Check if any required field is missing
    if (!username || !projectName || !roleAssigned || !fromDate || !toDate || !totalDays) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Insert project data into the projects table
    const query = `
      INSERT INTO projects (username, project_name, role_assigned, from_date, to_date, total_days, is_approved)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    await pool.query(query, [username, projectName, roleAssigned, fromDate, toDate, totalDays, false]);

    res.status(201).json({ message: 'Project added successfully' });
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
















// POST endpoint for resetting password
app.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;
console.log(email,otp,newPassword);
  try {
    // Validate the OTP
    const isValidOTP = await validateOTP(email, otp); // Function to validate OTP
    if (!isValidOTP) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Update the user's password
    await updateUserPasswordInDatabase(email, newPassword);

    // Respond with success message
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Attach the router to the '/api' endpoint
app.use('/api', router);




// Function to update user's password in the database

// Function to update user's password in the database
async function updateUserPasswordInDatabase(email, newPassword) {
  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const query = 'UPDATE accounts SET password = $1 WHERE email = $2';
    await pool.query(query, [hashedPassword, email]);
    console.log('User password updated successfully');
  } catch (error) {
    console.error('Error updating user password:', error);
    throw error; // Throw error for handling at higher levels
  }
}


// Function to validate OTP
async function validateOTP(email, otp) {
  try {
    // Retrieve the stored OTP for the given email from the database
    const query = 'SELECT * FROM otps WHERE email = $1 AND otp_code = $2 AND expires_at > NOW()';
    const result = await pool.query(query, [email, otp]);

    // If a matching OTP record is found and it's not expired
    if (result.rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error validating OTP:', error);
    throw error;
  }
}






















const port=5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


