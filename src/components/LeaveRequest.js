import React from 'react';
import LeaveRequestForm from './LeaveRequestForm';
import LeaveStatusTable from './LeaveStatusTable';

const LeaveRequest = () => {
  return (
    <div>
      <h3>Submit Leave Request</h3>
      <LeaveRequestForm />
      <h4>Your Leave Requests</h4>
      <LeaveStatusTable />
    </div>
  );
};

export default LeaveRequest;
