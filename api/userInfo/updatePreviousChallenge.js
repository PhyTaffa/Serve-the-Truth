const connection = require('../../database');

//Updates the value of currSteps to the one given. Not adds it to the one stored.
module.exports = async (req, res) => {
  if (req.method === 'PUT') {
    const { userId, challengeId, numbOfSteps: stepsNum, isStarted } = req.query;

    // Validate input parameters
    if (!userId) {
      return res.status(400).json({ error: 'User ID is missing' });
    }
    if (!challengeId) {
      return res.status(400).json({ error: 'Challenge ID is missing' });
    }
    if (!stepsNum) {
      return res.status(400).json({ error: 'Number of steps is missing' });
    }
    if (!isStarted) {
      return res.status(400).json({ error: 'Challenge start status is missing' });
    }

    try {
      // Update the challenge steps in the database
      const [results] = await connection.promise().execute(
        'UPDATE UserInfo_Challenge SET uc_isStarted = ?, uc_currSteps = ? WHERE uc_ui_id = ? AND uc_sc_id = ?',
        [isStarted, stepsNum, userId, challengeId]
      );

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'No matching challenge or user found for the update.' });
      }

      console.log('Update of active challenge steps successful');
      res.status(200).json({
        message: `Successfully updated challenge ${challengeId} with ${stepsNum} steps for user ${userId}`,
      });
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Internal server error ' + err });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
