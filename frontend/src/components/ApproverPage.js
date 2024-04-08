import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApproverPage = ({ username }) => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/submissions');
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/submissions/${id}`, { is_approved: true });
      // Update state or refetch submissions
    } catch (error) {
      console.error('Error approving submission:', error);
    }
  };

  return (
    <div>
      <h2>Approver Page</h2>
      <p>Welcome, {username}!</p>
      <table>
        <thead>
          <tr>
            <th>Submission</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(submission => (
            <tr key={submission.id}>
              <td>{submission.data}</td>
              <td>
                <button onClick={() => handleApprove(submission.id)}>Approve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproverPage;
