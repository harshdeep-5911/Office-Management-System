import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Grievance = () => {
  const [grievances, setGrievances] = useState([]);
  const [filteredGrievances, setFilteredGrievances] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch grievances from the backend
  const fetchGrievances = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/grievances'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch grievances');
      }
      const data = await response.json();

      // Ensure grievances have ID and formatted date
      const processedData = data.map((grievance, index) => ({
        id: grievance.id || index + 1, // Assign ID if missing
        title: grievance.title || 'N/A',
        description: grievance.description || 'N/A',
        status: grievance.status || 'New',
        date: grievance.createdAt
          ? new Date(grievance.createdAt).toLocaleDateString()
          : new Date().toLocaleDateString(), // Format date
      }));

      setGrievances(processedData);
      setFilteredGrievances(processedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter grievances based on search input
  const filterGrievances = () => {
    const searchInput = searchTerm.toLowerCase();
    const filtered = grievances.filter((grievance) =>
      grievance.title.toLowerCase().includes(searchInput) ||
      grievance.description.toLowerCase().includes(searchInput) ||
      grievance.status.toLowerCase().includes(searchInput)
    );
    setFilteredGrievances(filtered);
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  useEffect(() => {
    filterGrievances();
  }, [searchTerm, grievances]);

  // Export table data to CSV
  const exportToCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'ID,Title,Description,Status,Date\n'; // Header row

    filteredGrievances.forEach((grievance) => {
      const id = grievance.id || 'N/A';
      const title = grievance.title || 'N/A';
      const description = grievance.description || 'N/A';
      const status = grievance.status || 'N/A';
      const date = grievance.date || 'N/A';

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

  if (loading) {
    return <div className="loading">Loading grievances...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="container">
      <header>
        <Link to="/">📋 Grievance Management</Link>
      </header>

      <section className="grievance-section">
        <div className="grievance-controls">
          <input
            type="text"
            placeholder="Search by Title, Description, or Status"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn export-btn" onClick={exportToCSV}>
            Export to CSV
          </button>
        </div>
        <table id="grievance-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Date Submitted</th>
            </tr>
          </thead>
          <tbody>
            {filteredGrievances.map((grievance) => (
              <tr key={grievance.id}>
                <td>{grievance.id}</td>
                <td>{grievance.title}</td>
                <td>{grievance.description}</td>
                <td>{grievance.status}</td>
                <td>{grievance.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Grievance;
