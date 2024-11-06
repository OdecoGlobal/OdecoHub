'use client';
import { useAuthContext } from '../hooks/useAuthContext';
import Image from 'next/image';
import userIcon from '../assets/userIcon.svg';
import burgerMenu from '../assets/BurgerMenu.svg';
import cartIcon from '../assets/cartIcon.svg';
import searchIcon from '../assets/searchIcon.svg';
import Link from 'next/link';
import { useState } from 'react';
import useLogout from '../hooks/useLogout';

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  console.log(user);
  const navMenu = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Contact',
      href: '/contact',
    },
    {
      name: 'About',
      href: '/about',
    },
  ];
  const handleMenuOpen = () => setOpenMenu(true);
  const handleMenuClose = () => setOpenMenu(false);

  return (
    <>
      {/* MOBILE NAVIGATION */}
      <nav className="bg-white shadow-slate-300 shadow-sm w-full justify-between h-fit py-2 px-6 flex lg:hidden ">
        <div
          className={`${
            openMenu ? 'fixed' : 'hidden'
          } inset-0 bg-black bg-opacity-50 z-10`}
          onClick={handleMenuClose}
        />
        <div className="flex items-center">
          <button className="mr-4" onClick={handleMenuOpen}>
            <Image src={burgerMenu} alt="burgerMenu" width={20} height={20} />
          </button>

          <>
            <div
              className={`fixed  top-0 left-0 h-full bg-slate-100  text-black w-64 z-20 transition-transform duration-300 transform  ${
                openMenu ? 'translate-x-0' : '-translate-x-64'
              }`}
            >
              <div
                className="flex justify-end pr-4 pt-4 cursor-pointer"
                onClick={handleMenuClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="flex flex-col justify-center text-black space-y-4 items-start px-6 pt-10">
                {navMenu.map((el, i) => (
                  <Link
                    key={i}
                    className="hover:text-primary cursor-pointer"
                    href={el.href}
                  >
                    {el.name}
                  </Link>
                ))}
                {!user && (
                  <Link
                    className="hover:text-primary cursor-pointer"
                    href="/login"
                  >
                    Login
                  </Link>
                )}

                {user && (
                  <button
                    className="w-fit px-5 btn--primary"
                    disabled={isPending}
                    onClick={logout}
                  >
                    {isPending ? 'Logging out...' : 'Logout'}
                  </button>
                )}
              </div>
            </div>
          </>

          <h1 className="text-black font-sans font-extrabold text-3xl ">
            ODECOHUB
          </h1>
        </div>

        <div className="flex  items-center space-x-5 ">
          <Image
            className="cursor-pointer"
            src={searchIcon}
            width={20}
            height={20}
            alt="searchIcon"
          />

          <Image
            className="cursor-pointer"
            src={cartIcon}
            alt="add to cart"
            width={20}
            height={20}
          />
          {user && (
            <Image
              alt="profile-image"
              src={user.photo}
              width={20}
              height={20}
              className="cursor-pointer w-7 h-7 rounded-full"
            />
          )}
          {!user && (
            <Image
              className="cursor-pointer"
              src={userIcon}
              alt="profile"
              width={20}
              height={20}
            />
          )}
        </div>
      </nav>

      {/* DESKTOP NAV */}
      <nav className=" hidden lg:flex  shadow-slate-300 shadow-sm items-center justify-between bg-white w-full  h-fit py-2 px-6 relative">
        <h1 className="text-black font-sans font-extrabold text-3xl ">
          ODECOHUB
        </h1>
        <div className="flex text-black space-x-2 items-center">
          {navMenu.map((el, i) => (
            <Link
              key={i}
              className="hover:text-primary cursor-pointer"
              href={el.href}
            >
              {el.name}
            </Link>
          ))}
          {!user && (
            <Link className="hover:text-primary cursor-pointer" href="/login">
              Login
            </Link>
          )}
          {user && (
            <button
              className=" w-fit px-5 btn--primary"
              disabled={isPending}
              onClick={logout}
            >
              {isPending ? 'Logging out...' : 'Logout'}
            </button>
          )}
        </div>

        <div className="relative  max-w-md">
          <input
            type="text"
            placeholder="Search for products..."
            className=" text-black bg-slate-200 w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-slate-300 focus:border-transparent"
          />
          <Image
            src={searchIcon}
            alt="search"
            width={20}
            height={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 "
          />
        </div>

        <div className="flex  space-x-5 ">
          <Image src={cartIcon} alt="add to cart" width={20} height={20} />
          <Image src={userIcon} alt="profile" width={20} height={20} />
        </div>
      </nav>
    </>
  );
}
