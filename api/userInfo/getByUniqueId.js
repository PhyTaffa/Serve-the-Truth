const connection = require('../../database');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const { uniqueId } = req.query; // Access query parameter from req.query

    // Check if uniqueId is provided
    if (!uniqueId) {
      return res.status(400).json({ error: 'User unique id is missing' });
    }

    try {
      // Query the database to fetch user information
      const [results] = await connection.promise().execute(
        'SELECT * FROM UserInfo WHERE ui_uniqueId = ?',
        [uniqueId]
      );

      if (results.length === 0) {
        // If user is not found, insert a new user
        const [insertResult] = await connection.promise().execute(
          'INSERT INTO UserInfo (ui_name, ui_pfp, ui_activeChallRef, ui_uniqueId) VALUES (?, 1, 1, ?)',
          ['Amogus', uniqueId] // You can customize values as needed
        );

        if (insertResult.affectedRows > 0) {
          // Return a message saying that the user was created
          res.status(201).json({ message: 'New User created!', userId: insertResult.insertId });
        } else {
          // Handle error if insert failed
          res.status(500).json({ error: 'Failed to create new user' });
        }
      } else {
        // Return the first user found if already exists
        res.status(200).json(results[0]);
      }
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
