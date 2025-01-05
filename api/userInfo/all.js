const connection = require('../../database');

module.exports = async (req, res) => {
  try {
    // Execute the query using promise-based connection
    const [results] = await connection.promise().execute('SELECT * FROM UserInfo');

    // Check if no results are found
    if (results.length === 0) {
      return res.status(404).json({ message: 'No users exist in the database.' });
    }

    // Return the results if found
    res.status(200).json(results);
  } catch (err) {
    // Log the error and return a generic internal server error
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
