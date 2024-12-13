// api/stepChallengeAll.js
const connection = require('../../database');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    connection.execute('SELECT * FROM Step_Challenge;', (err, results) => {
      if (err) {
        console.error('Error fetching challenges:', err);
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'No challenges found' });
      }
      res.status(200).json(results);
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};