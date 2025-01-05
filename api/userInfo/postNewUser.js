const connection = require('../../database');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
      const { uniqueId } = req.query; // Access query parameter from req.query
  
      // Check if userId is provided
      if (!uniqueId) {
        return res.status(400).json({ error: 'User unique id is missing' });
      }
  
      // Query the database to fetch user information
      connection.execute('INSERT INTO UserInfo (ui_name, ui_pfp, ui_activeChallRef, ui_uniqueId) VALUES ("Amogus", 1, 1, ?);',
        [uniqueId], (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
  
        if (results.length === 0) {
          return res.status(200).json("New User created!");
        }
  
        // Return the first user found
        //console.error('userId:', req.params);
        
        res.status(409).json({ message: 'User already exist with said Id' });
      });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  };