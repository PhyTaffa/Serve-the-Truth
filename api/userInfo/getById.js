// api/getUserById.js
const connection = require('../../database');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const { userId } = req.query; // Access query parameter from req.query

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ error: 'User id is missing' });
    }

    // Query the database to fetch user information
    connection.execute('SELECT * FROM UserInfo WHERE ui_id = ?', [userId], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }

      // Return the first user found
      console.error('userId:', req.params);
      res.status(200).json(results[0]);
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};