// client/src/components/Dashboard.js

import React, { useEffect, useState } from 'react';

// Import components
import CredentialsList from './CredentialsList';
import AddCredentialsForm from './AddCredentialsForm';
import UpdateCredentialsForm from './UpdateCredentialsForm';
import AssignUsersForm from './AssignUsersForm';

// Import styles
import '../styles/dashboard.css';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [showCredentials, setShowCredentials] = useState(false);
  const [showAddCredentialsForm, setShowAddCredentialsForm] = useState(false);
  const [showUpdateCredentialsForm, setShowUpdateCredentialsForm] = useState(false);
  const [showAssignUsersForm, setShowAssignUsersForm] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [credentials, setCredentials] = useState([]);
  const [users, setUsers] = useState([]);

  // Hide or show functions when others are opened/closed - so only one is visible at the time.
  const toggleCredentials = () => {
    setShowCredentials(!showCredentials);
    setShowAddCredentialsForm(false);
    setShowUpdateCredentialsForm(false);
    setShowAssignUsersForm(false);
  };

  const toggleAddCredentialsForm = () => {
    setShowAddCredentialsForm(!showAddCredentialsForm);
    setShowCredentials(false);
    setShowUpdateCredentialsForm(false);
    setShowAssignUsersForm(false);
  };

  const toggleUpdateCredentialsForm = () => {
    setShowUpdateCredentialsForm(!showUpdateCredentialsForm);
    setShowCredentials(false);
    setShowAddCredentialsForm(false);
    setShowAssignUsersForm(false);
  };

  const toggleAssignUsersForm = () => {
    setShowAssignUsersForm(!showAssignUsersForm);
    setShowCredentials(false);
    setShowAddCredentialsForm(false);
    setShowUpdateCredentialsForm(false);
  }

  // Fetch data from the database
  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch('/user-data', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Fetch credentials
    const fetchCredentials = async () => {
      try {
        const credentialsResponse = await fetch('/credentials', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (credentialsResponse.ok) {
          const credentialsData = await credentialsResponse.json();
          setCredentials(credentialsData);
        } else {
          console.error('Failed to fetch credentials');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Fetch users
    const fetchUsers = async () => {
      try {
        const usersResponse = await fetch('/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setUsers(usersData);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
    fetchCredentials();
    fetchUsers();
  }, []);


  // Render the dashboard
  return (
    <div className="credential-dashboard">
      <h1>Credential Dashboard</h1>
      {userData && (
        <div>
          <p>Welcome to your dashboard, {userData.username}!</p>
        </div>
      )}

        {/* Navigation bar with options based on user role */}
      <div className="navigation-bar">
        <button onClick={toggleCredentials}>Show Credentials</button>
        <button onClick={toggleAddCredentialsForm}>Add Credentials</button>

        {/* only visible for admin and management users */}
        {userData && (userData.role === 'admin' || userData.role === 'management') && (
          <button onClick={toggleUpdateCredentialsForm}>Update Credentials</button>
        )}
        {/* only visible for admin users */}
        {userData && userData.role === 'admin' && (
          <button onClick={toggleAssignUsersForm}>Assign Users</button>
        )}

      </div>

      {/* Render components based on conditions and pass on info to other components so they can use the data (like user and credential data) */}
      {showCredentials && <CredentialsList />}

      {showAddCredentialsForm && 
      <AddCredentialsForm 
        userOU={userData.ou} 
        userDivision={userData.division} 
        userRole={userData.role} />}

      {showUpdateCredentialsForm && (
        <UpdateCredentialsForm
          credentials={credentials}
          userRole={userData.role}
          userOU={userData.ou}
          userDivision={userData.division}
          selectedCredentialId={selectedCredential}/>)}

      {showAssignUsersForm && (
      <AssignUsersForm 
        users={users} />)}

      <div>


      </div>
    </div>
  );

}
export default Dashboard;
