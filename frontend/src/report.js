// src/report/Report.js
import React, { useState, useEffect } from 'react';
import './report.css';
import { Link } from 'react-router-dom';

const Report = () => {
  const [patientRecords, setPatientRecords] = useState([]); // Store patient records fetched from backend
  const [filteredRecords, setFilteredRecords] = useState([]); // Store filtered records
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering

  // Fetch patient records from backend API
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch('/api/patient-reports'); // Replace with your backend API endpoint
        const data = await response.json();
        setPatientRecords(data);
        setFilteredRecords(data);
      } catch (error) {
        console.error('Error fetching patient records:', error);
      }
    };

    fetchRecords();
  }, []);

  // Filter records based on search input
  useEffect(() => {
    const searchInput = searchTerm.toLowerCase();
    const filtered = patientRecords.filter(record =>
      record.name.toLowerCase().includes(searchInput) ||
      record.reason.toLowerCase().includes(searchInput)
    );
    setFilteredRecords(filtered);
  }, [searchTerm, patientRecords]);

  // Export table data to CSV
  const exportToCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'ID,Name,Age,Reason,Date\n'; // Header row

    filteredRecords.forEach(record => {
      csvContent += `${record.id},${record.name},${record.age},${record.reason},${record.date}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'patient_reports.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <header>
        <Link to='/landing'>📊 Patient Reports</Link>
      </header>

      <section className="report-section">
        <div className="report-controls">
          <input
            type="text"
            placeholder="Search by Name or Reason"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn export-btn" onClick={exportToCSV}>Export to CSV</button>
        </div>
        <table id="report-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Medical Reason</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{record.name}</td>
                <td>{record.age}</td>
                <td>{record.reason}</td>
                <td>{record.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Report;
