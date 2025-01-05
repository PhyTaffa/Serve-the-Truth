const connection = require('../../database');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const { userId } = req.query;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ error: 'User ID is missing' });
    }

    try {
      // Use the connection pool to execute the query directly
      const [results] = await connection.promise().execute(
        `SELECT uc_id, ui_id, sc_id, sc_title, sc_description, sc_assets, sc_skin, sc_difficulty, 
                sc_stepsToReach, sc_timeLimit, uc_currSteps, uc_startTime, uc_isStarted
         FROM UserInfo_Challenge 
         INNER JOIN UserInfo ON ui_id = uc_ui_id 
         INNER JOIN Step_Challenge ON uc_sc_id = sc_id
         WHERE uc_ui_id = ?`,
        [userId]
      );

      if (results.length === 0) {
        console.log('No step challenges exist for the specified user');
        return res.status(404).json({ message: 'No step challenges exist for the specified user' });
      }

      console.log('Step challenges for the specified user found');
      res.status(200).json(results);
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Internal server error ' + err });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
