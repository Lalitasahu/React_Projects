import React, { useState } from 'react';

function CreateUser() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [dateJoined, setDateJoined] = useState(new Date().toISOString().slice(0, 10));
  const [address, setAddress] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('is_superuser', isSuperuser);
    formData.append('is_active', isActive);
    formData.append('date_joined', dateJoined);
    formData.append('address', address);
    formData.append('phone_no', phoneNo);
    formData.append('password', password);

    if (profilePic) {
      formData.append('profile_pic', profilePic);
    }

    try {
      const response = await fetch('http://localhost:8000/api/users/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`User ${data.username} created successfully!`);
        // Clear form fields
        setUsername('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setIsSuperuser(false);
        setIsActive(true);
        setDateJoined(new Date().toISOString().slice(0, 10));
        setAddress('');
        setPhoneNo('');
        setProfilePic(null);
        setPassword('');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.toString()}`);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>First Name: </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div>
          <label>Last Name: </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Address: </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div>
          <label>Phone No: </label>
          <input
            type="text"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </div>

        <div>
          <label>Profile Picture: </label>
          <input
            type="file"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>

        <div>
          <label>Is Superuser: </label>
          <input
            type="checkbox"
            checked={isSuperuser}
            onChange={(e) => setIsSuperuser(e.target.checked)}
          />
        </div>

        <div>
          <label>Is Active: </label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </div>

        <div>
          <label>Date Joined: </label>
          <input
            type="date"
            value={dateJoined}
            onChange={(e) => setDateJoined(e.target.value)}
          />
        </div>

        <button type="submit">Create User</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateUser;
