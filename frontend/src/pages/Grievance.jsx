import React, { useState, useEffect } from 'react';

// Load backend API base URL from environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Grievance() {
  const [activeTab, setActiveTab] = useState('submit');
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch grievances from the server
  const fetchGrievances = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/grievances`);
      const data = await response.json();
      if (response.ok) {
        setGrievances(data.data);
      } else {
        setError(data.error || 'Failed to fetch grievances');
      }
    } catch (err) {
      console.error('Error fetching grievances:', err);
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Submit a grievance
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;

    try {
      const response = await fetch(`${API_URL}/api/grievances`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Grievance submitted successfully!');
        setGrievances((prev) => [...prev, data.data]);
        e.target.reset();
      } else {
        alert(data.error || 'Failed to submit grievance');
      }
    } catch (err) {
      console.error('Error submitting grievance:', err);
      alert('Server error. Please try again later.');
    }
  };

  // Fetch grievances when "View Grievances" tab is selected
  useEffect(() => {
    if (activeTab === 'view') {
      fetchGrievances();
    }
  }, [activeTab]);

  // Export grievances to CSV
  const exportGrievancesToCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'ID,Title,Description,Status,Date\n';

    grievances.forEach((grievance) => {
      const id = grievance._id || 'N/A';
      const title = grievance.title || 'N/A';
      const description = grievance.description || 'N/A';
      const status = grievance.status || 'Pending';
      const date = new Date(grievance.createdAt).toLocaleDateString() || 'N/A';
      csvContent += `${id},${title},${description},${status},${date}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'grievance_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1>Grievance Portal</h1>
      <div className="grievance-buttons">
        <button
          className={activeTab === 'submit' ? 'active' : ''}
          onClick={() => setActiveTab('submit')}
        >
          Submit Grievance
        </button>
        <button
          className={activeTab === 'view' ? 'active' : ''}
          onClick={() => setActiveTab('view')}
        >
          View Grievances
        </button>
        <button
          className={activeTab === 'report' ? 'active' : ''}
          onClick={() => {
            setActiveTab('view');
            exportGrievancesToCSV();
          }}
        >
          Grievance Report
        </button>
      </div>

      <div className="grievance-content">
        {activeTab === 'submit' && (
          <div>
            <h2>Submit Your Grievance</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" required />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" required></textarea>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}

        {activeTab === 'view' && (
          <div>
            <h2>Your Grievances</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : grievances.length > 0 ? (
              <ul>
                {grievances.map((grievance) => (
                  <li key={grievance._id}>
                    <strong>{grievance.title}:</strong> {grievance.description} -{' '}
                    <em>Status: {grievance.status || 'Pending'}</em>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No grievances found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Grievance;
