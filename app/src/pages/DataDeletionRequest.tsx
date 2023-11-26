import React from 'react';

const DataDeletionRequest: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  };

  const headingStyle: React.CSSProperties = {
    textAlign: 'center',
    fontSize: '1.5rem',
    marginBottom: '20px',
  };

  const listItemStyle: React.CSSProperties = {
    marginBottom: '15px',
  };

  const emailLinkStyle: React.CSSProperties = {
    textDecoration: 'underline',
    color: 'blue',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Data Deletion Request</h2>
      <p>
        If you wish to delete your data associated with your account on Educado, please contact us at{' '}
        <a href="mailto:app.educado@gmail.com" style={emailLinkStyle}>
          app.educado@gmail.com
        </a>.
      </p>
      <p>
        To ensure a prompt response to your request, kindly provide us with the following details:
      </p>
      <ul>
        <li style={listItemStyle}>
          <strong>Steps to Request Deletion:</strong> You can delete your account and all data related to your account
          on the Educado App. Simply navigate to your profile page within the app and click on the “delete account”
          button. If you encounter difficulties accessing the app, please send an email to{' '}
          <a href="mailto:app.educado@gmail.com" style={emailLinkStyle}>
            app.educado@gmail.com
          </a>
          specifying your request for data deletion, and we will help you.
        </li>
        <li style={listItemStyle}>
          <strong>Types of Data Deleted:</strong> Upon deletion, all personal identifiable information such as your
          email, name, and password will be permanently removed from our systems. Additionally, information related to
          your course subscriptions, including your progress, will be deleted.
        </li>
        <li style={listItemStyle}>
          <strong>Retention Period:</strong> We commit to immediate deletion of personal identifiable information and
          course completion data upon your request.
        </li>
      </ul>
      <p>
        We take user privacy seriously and aim to process all data deletion requests efficiently. For any further
        inquiries or assistance, please don't hesitate to contact us via
        <a href="mailto:app.educado@gmail.com" style={emailLinkStyle}>
          app.educado@gmail.com
        </a>.
      </p>
    </div>
  );
};

export default DataDeletionRequest;