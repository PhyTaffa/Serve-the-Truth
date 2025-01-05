const connection = require('../../database');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { uniqueId } = req.query;

    // Check if uniqueId is provided
    if (!uniqueId) {
      return res.status(400).json({ error: 'User unique id is missing' });
    }

    try {
      // Check if the user already exists
      const [userCheck] = await connection.promise().execute(
        'SELECT * FROM UserInfo WHERE ui_uniqueId = ? LIMIT 1',
        [uniqueId]
      );

      if (userCheck.length > 0) {
        // User already exists
        return res.status(409).json({ message: 'User already exists with the given Id' });
      }

      // Insert the new user if not already exists
      const [results] = await connection.promise().execute(
        'INSERT INTO UserInfo (ui_name, ui_pfp, ui_activeChallRef, ui_uniqueId) VALUES (?, 1, 1, ?)',
        ['Amogus', uniqueId]
      );

      // Check if rows were affected
      if (results.affectedRows > 0) {
        res.status(200).json({ message: 'New User created!' });
      } else {
        res.status(400).json({ error: 'Failed to create new user' });
      }
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Database error: ' + err });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
