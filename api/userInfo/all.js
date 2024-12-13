const connection = require('../../database');

module.exports = async (req, res) => {
  try {
    connection.execute('SELECT * FROM UserInfo;', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'No users exist in the database.' });
      }
      res.status(200).json(results);
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};