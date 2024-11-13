'use client';
import { useAuthContext } from '../../hooks/useAuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useLogout from '../../hooks/useLogout';
import { usePathname } from 'next/navigation';

import './navbar.css';

// Assets
import userIcon from '../../assets/userIcon.svg';
import userIconDrop from '../../assets/userIconDrop.svg';
import burgerMenu from '../../assets/BurgerMenu.svg';
import cartIcon from '../../assets/cartIcon.svg';
import searchIcon from '../..//assets/searchIcon.svg';
import loginIcon from '../../assets/loginIcon.svg';
import logoutIcon from '../../assets/logoutIcon.svg';
import orderIcon from '../../assets/orderIcon.svg';
import reviewIcon from '../../assets/reviewStar.svg';

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { logout, isPending } = useLogout();
  const [drop, setDrop] = useState(false);
  const { user } = useAuthContext();
  const pathname = usePathname();

  // console.log(user);
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
    <nav className="bg-white shadow-slate-400 shadow-sm w-full  h-fit py-5 lg:py-2 px-2 lg:px-6 flex overflow-x-clip items-center  relative">
      <div
        className={`${
          openMenu ? 'fixed' : 'hidden'
        } lg:hidden inset-0 bg-black bg-opacity-50 z-10`}
        onClick={handleMenuClose}
      />
      <Image
        onClick={handleMenuOpen}
        className="lg:hidden mr-2"
        src={burgerMenu}
        alt="burgerMenu"
        width={20}
        height={20}
      />

      <div
        className={`fixed lg:hidden top-0 left-0 h-full bg-slate-100  text-black w-64 z-20 transition-transform duration-300 transform  ${
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
          {navMenu.map((el, i) => {
            const isActive = pathname === el.href;

            return (
              <Link
                key={i}
                className={`hover:text-primary cursor-pointer ${
                  isActive ? 'border-b-2 border-b-primary text-primary' : ''
                }`}
                href={el.href}
                onClick={() => setOpenMenu(false)}
              >
                {el.name}
              </Link>
            );
          })}
        </div>
      </div>

      <h1 className="text-black font-sans font-extrabold text-xl lg:text-3xl ">
        ODECOHUB
      </h1>

      {/* DESKTOP NAV */}

      <div className="hidden lg:flex ml-auto text-black space-x-5 items-center">
        {navMenu.map((el, i) => {
          const isActive = pathname === el.href;
          return (
            <Link
              key={i}
              className={`hover:text-primary cursor-pointer ${
                isActive ? 'border-b-2 border-b-primary text-primary' : ''
              }`}
              href={el.href}
            >
              {el.name}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center ml-auto space-x-5 ">
        <div className=" hidden lg:block relative mr-3 max-w-md">
          <input
            type="text"
            placeholder="Search for products..."
            className="text-black bg-slate-200 w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-slate-300 focus:border-transparent"
          />
          <Image
            src={searchIcon}
            alt="search"
            width={20}
            height={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 "
          />
        </div>
        <Image
          className="cursor-pointer lg:hidden"
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
        <div className="relative w-fit" onClick={() => setDrop(!drop)}>
          {drop && (
            <div className="absolute text-slate-100  w-56 h-52 top-9 right-0  bg-[url('../app/assets/backdrop.png')]">
              <div className="flex flex-col h-full w-full justify-evenly px-2">
                <div className="nav--drop ">
                  <Image
                    src={userIconDrop}
                    width={25}
                    height={25}
                    alt="User Icon"
                  />
                  <Link href="/account">Manage My Account</Link>
                </div>
                <div className="nav--drop ">
                  <Image
                    src={orderIcon}
                    width={25}
                    height={25}
                    alt="Order Icon"
                  />
                  <Link href="/orders">My Orders</Link>
                </div>
                <div className="nav--drop">
                  <Image
                    src={reviewIcon}
                    width={25}
                    height={25}
                    alt="Review Icon"
                  />
                  <Link href="/user-reviews">My Reviews</Link>{' '}
                </div>
                {user && (
                  <div className="nav--drop">
                    <Image
                      src={logoutIcon}
                      width={25}
                      height={25}
                      alt="Logout Icon"
                    />
                    <button onClick={logout}>Logout</button>
                  </div>
                )}
                {!user && (
                  <div className="nav--drop">
                    <Image
                      src={loginIcon}
                      width={25}
                      height={25}
                      alt="Login Icon"
                    />
                    <Link href="/login">Login</Link>
                  </div>
                )}
              </div>
            </div>
          )}
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
      </div>
    </nav>
  );
}
