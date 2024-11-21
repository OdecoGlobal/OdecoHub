'use client';
import { useState } from 'react';
import './account.css';
import { useUpdateAccount } from '../hooks/useUpdateAccount';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Account() {
  const {user} = useAuthContext()

  const [name, setName] = useState(user.name);
  const [userName, setUserName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [photo, setPhoto] = useState(null);
  const [passwordCurrent, setCurrentPassword] = useState('');
  const [password, setNewPassword] = useState('');
  const [passwordConfirm, setConfirmNewPassword] = useState('');
  const { updateAccount, isPending } = useUpdateAccount();
  console.log(user);
  

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
  const handleSubmitPassword = async e => {
    e.preventDefault();

    await updateAccount(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    console.log({ passwordCurrent, password, passwordConfirm }, 'password');
  };

  return (
    <div className=" px-5 lg:px-16 mx-auto lg:flex justify-between pt-4 py-6  lg:pt-16">
      <nav className="hidden lg:block">gh</nav>
      <div className="space-y-6  items-center flex-1">
        <form className="flex   flex-col px-5" onSubmit={handleSubmitUser}>
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

          <button
            disabled={isPending}
            className=" w-fit px-3 btn--primary self-end"
          >
            {isPending ? 'Updating...' : 'Update Details'}
          </button>
        </form>
        <form className="flex  flex-col px-5" onSubmit={handleSubmitPassword}>
          <h3 className="text-primary font-semibold mb-3">
            Update Your Password
          </h3>

          <div className="account--div">
            <label>
              Current Password
              <input
                type="password"
                placeholder="********"
                className="account--input"
                value={passwordCurrent}
                name="currentPassword"
                onChange={e => setCurrentPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="account--div">
            <label>
              New Password
              <input
                type="password"
                placeholder="********"
                className="account--input"
                value={password}
                name="currentPassword"
                onChange={e => setNewPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="account--div">
            <label>
              Confirm New Password
              <input
                type="password"
                placeholder="********"
                className="account--input"
                value={passwordConfirm}
                name="confirmNewPassword"
                onChange={e => setConfirmNewPassword(e.target.value)}
              />
            </label>
          </div>
          <button
            disabled={isPending}
            className=" w-fit px-3 btn--primary self-end"
          >
            {isPending ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
