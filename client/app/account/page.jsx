'use client';
import { useState } from 'react';
import './account.css';
import { useUpdateAccount } from '../hooks/useUpdateAccount';

export default function Account() {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { updateAccount, isPending } = useUpdateAccount();

  const handleSubmitUser = e => {
    e.preventDefault();

    const formData = new FormData();
    if (name) formData.append('name', name);
    if (email) formData.append('email', email);
    if (userName) formData.append('userName', userName);
    if (photo) formData.append('photo', photo);

    updateAccount(formData, 'form');
    console.log(formData, 'form');
  };

  return (
    <div className=" px-5 lg:px-16 flex justify-between pt-4 lg:pt-16">
      <nav className="hidden lg:block">gh</nav>
      <form className="flex flex-1 flex-col px-5" onSubmit={handleSubmitUser}>
        <h3 className="text-primary font-semibold mb-3">Edit your Profile</h3>

        <div className="account--div">
          <label>
            Name
            <input
              type="text"
              placeholder="John Doe"
              className="account--input"
              value={name}
              name="name"
              onChange={e => setName(e.target.value)}
            />
          </label>
        </div>

        <div className="account--div">
          <label>
            Username
            <input
              type="text"
              placeholder="Johnny"
              className="account--input"
              value={userName}
              name="userName"
              onChange={e => setUserName(e.target.value)}
            />
          </label>
        </div>
        <div className="account--div">
          <label>
            Email
            <input
              type="email"
              placeholder="john@example.com"
              className="account--input"
              value={email}
              name="email"
              onChange={e => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="account--div">
          <input
            type="file"
            accept="image/*"
            name="photo"
            onChange={e => setPhoto(e.target.files[0])}
          />
        </div>

        <button className=" w-fit px-3 btn--primary">Update Details</button>
      </form>
    </div>
  );
}
