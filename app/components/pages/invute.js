// pages/api/invite.js
export default function handler(req, res) {
    const { token } = req.query;
  
    // Save the token to your database or perform any tracking logic
    console.log(`Invite token: ${token}`);
  
    // Redirect the user to the homepage or a specific page
    res.redirect("/");
  }