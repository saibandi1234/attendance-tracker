import React, { useState, useEffect } from 'react';

const LeaveRequestForm = () => {
  const [formData, setFormData] = useState({
    emp_id: '',
    start_date: '',
    end_date: '',
    reason: ''
  });

  useEffect(() => {
    const emp_id = localStorage.getItem('username');
    if (emp_id) {
      setFormData(prev => ({ ...prev, emp_id }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { emp_id, start_date, end_date, reason } = formData;

    if (!emp_id || !start_date || !end_date || !reason) {
      alert('❌ Failed: Missing required fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/leave_requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        alert('✅ Leave request submitted successfully');
        setFormData({ emp_id, start_date: '', end_date: '', reason: '' });
      } else {
        alert(`❌ Failed: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert
