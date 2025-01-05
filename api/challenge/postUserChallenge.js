const connection = require('../../database');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { uniqueId } = req.query;

    // Check if uniqueId is provided
    if (!uniqueId) {
      return res.status(400).json({ error: 'Unique ID is missing' });
    }

    try {
      // Check if the uniqueId exists and fetch the corresponding userId
      const [userCheck] = await connection.promise().execute(
        `SELECT ui_id FROM UserInfo WHERE ui_uniqueId = ? LIMIT 1`,
        [uniqueId]
      );

      if (userCheck.length === 0) {
        return res.status(404).json({ error: 'User not found in the database' });
      }

      const userId = userCheck[0].ui_id;

      // Insert step challenges into the database
      const [results] = await connection.promise().execute(
        `INSERT INTO UserInfo_Challenge (uc_ui_id, uc_sc_id, uc_currSteps, uc_startTime, uc_isStarted)
         VALUES 
         (?, 1, 0, 0, 1),
         (?, 2, 0, 0, 0),
         (?, 3, 0, 0, 0),
         (?, 4, 0, 0, 0),
         (?, 5, 0, 0, 0),
         (?, 6, 0, 0, 0),
         (?, 7, 0, 0, 0)`,
        Array(7).fill(userId) // Fill an array with userId for each placeholder
      );

      // Check if rows were affected
      if (results.affectedRows > 0) {
        res.status(200).json({ message: 'Step challenges inserted successfully' });
      } else {
        res.status(400).json({ error: 'No rows were inserted' });
      }
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
