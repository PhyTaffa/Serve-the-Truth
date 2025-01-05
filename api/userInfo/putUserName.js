const connection = require('../../database');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { username, userId } = req.query; // Expecting the data in the request body

    // Check if both username and uniqueId are provided
    if (!username) {
      return res.status(400).json({ error: 'Username are required' });
    }
    if (!userId) {
        return res.status(400).json({ error: 'userId are required' });
      }

    try {
        // User exists, update user data
        const [updateResults] = await connection.promise().execute(
          'UPDATE UserInfo SET ui_name = ? WHERE ui_id = ?',
          [username, userId]
        );

        if (updateResults.affectedRows > 0) {
          return res.status(200).json({ message: 'User updated successfully' });
        } else {
          return res.status(400).json({ error: 'Failed to update user' });
        }

    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Database error: ' + err });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
