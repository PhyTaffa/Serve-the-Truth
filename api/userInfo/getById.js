const connection = require('../../database');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId } = req.query; // Access query parameter from req.query

  // Check if userId is provided
  if (!userId) {
    return res.status(400).json({ error: 'User id is missing' });
  }

  try {
    // Query the database to fetch user information using promise-based connection
    const [results] = await connection.promise().execute('SELECT * FROM UserInfo WHERE ui_id = ?', [userId]);

    // Check if no user was found
    if (results.length === 0) {
      return res.status(404).json({ message: 'No user found with that ID' });
    }

    // Return the first user found
    res.status(200).json(results[0]);
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
