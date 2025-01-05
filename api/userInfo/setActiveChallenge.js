const connection = require('../../database');

module.exports = async (req, res) => {
  if (req.method === 'PUT') {
    const { userId, challengeId } = req.query;

    // Validate input parameters
    if (!userId) {
      return res.status(400).json({ error: 'User ID is missing' });
    }
    if (!challengeId) {
      return res.status(400).json({ error: 'Challenge ID is missing' });
    }

    try {
      // Update the active challenge reference in the database
      const [results] = await connection.promise().execute(
        'UPDATE UserInfo SET ui_activeChallRef = ? WHERE ui_id = ?',
        [challengeId, userId]
      );

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'No matching user or challenge found for the update.' });
      }

      console.log('Update of active challenge successful');
      res.status(200).json({
        message: `Successfully updated active challenge to ${challengeId} for user ${userId}`,
      });
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Internal server error' + err });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
