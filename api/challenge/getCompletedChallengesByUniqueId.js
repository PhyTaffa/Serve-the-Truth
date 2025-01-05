const connection = require('../../database');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const { uiUniqueId } = req.query;

    // Check if uiUniqueId is provided
    if (!uiUniqueId) {
      return res.status(400).json({ error: 'UI Unique ID is missing' });
    }

    try {
      // Query the database to fetch the user based on uiUniqueId
      const [userResults] = await connection.promise().execute(
        `SELECT ui_id, ui_uniqueId
         FROM UserInfo
         WHERE ui_uniqueId = ?`,
        [uiUniqueId]
      );

      if (userResults.length === 0) {
        return res.status(404).json({ message: 'User not found with the given UI Unique ID' });
      }

      const userId = userResults[0].ui_id;

      // Query the challenges for the user
      const [challengeResults] = await connection.promise().execute(
        `SELECT uc_id, sc_stepsToReach, uc_currSteps, uc_startTime
         FROM UserInfo_Challenge
         INNER JOIN Step_Challenge ON uc_sc_id = sc_id
         WHERE uc_ui_id = ?`,
        [userId]
      );

      if (challengeResults.length === 0) {
        return res.status(404).json({ message: 'No challenges found for the specified user' });
      }

      // Map the challenges to check the condition for each
      const challengeStatus = challengeResults.map(challenge => {
        return {
          challengeMet: challenge.uc_currSteps >= challenge.sc_stepsToReach
        };
      });

      // Return the challenges with status
      res.status(200).json(challengeStatus);
      
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Internal server error' + err });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
