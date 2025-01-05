const connection = require('../../database');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Execute the query using promise-based connection
    const [results] = await connection.promise().execute('SELECT * FROM Step_Challenge');

    // Check if no results are found
    if (results.length === 0) {
      return res.status(404).json({ message: 'No challenges found' });
    }

    // Return the results if found
    res.status(200).json(results);
  } catch (err) {
    // Log the error and return a generic internal server error
    console.error('Error fetching challenges:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
