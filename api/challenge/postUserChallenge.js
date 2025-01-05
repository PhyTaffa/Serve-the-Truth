const connection = require('../../database');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { userId } = req.query;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ error: 'User ID is missing' });
    }

    try {
      const [userExists] = await connection.promise().execute(
        'SELECT COUNT(*) AS count FROM UserInfo WHERE ui_id = ?',
        [userId]
      );
      
      if (userExists[0].count === 0) {
        return res.status(400).json({ error: 'User does not exist' });
      }
      // Check the number of challenges completed by the user
      const [challengeCount] = await connection.promise().execute(
        'SELECT COUNT(*) AS count FROM UserInfo_Challenge WHERE uc_ui_id = ?',
        [userId]
      );

      const existingCount = challengeCount[0].count;

      if (existingCount >= 7) {
        // If the user already has 7 or more challenges, fetch and return them
        const [challenges] = await connection.promise().execute(
          `SELECT * 
          FROM UserInfo_Challenge 
          INNER JOIN Step_Challenge ON sc_id = uc_sc_id
          WHERE uc_ui_id = ?`,
          [userId]
        );

        return res.status(200).json({ challenges: challenges });
      }

      // If fewer than 7 challenges exist, create all 7 challenges
      await connection.promise().execute(
        `INSERT INTO UserInfo_Challenge (uc_ui_id, uc_sc_id, uc_currSteps, uc_startTime, uc_isStarted)
         VALUES 
         (?, 1, 0, 0, 1),
         (?, 2, 0, 0, 0),
         (?, 3, 0, 0, 0),
         (?, 4, 0, 0, 0),
         (?, 5, 0, 0, 0),
         (?, 6, 0, 0, 0),
         (?, 7, 0, 0, 0)`,
        Array(7).fill(userId)
      );

      // Fetch and return all challenges for the user
      const [updatedChallenges] = await connection.promise().execute(
        `SELECT * 
        FROM UserInfo_Challenge 
        INNER JOIN Step_Challenge ON sc_id = uc_sc_id
        WHERE uc_ui_id = ?`,
        [userId]
      );

      res.status(200).json({ challenges: updatedChallenges });
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
