'use client';
import Image from 'next/image';
import userIcon from '../assets/userIcon.svg';
import burgerMenu from '../assets/BurgerMenu.svg';
import cartIcon from '../assets/cartIcon.svg';
import searchIcon from '../assets/searchIcon.svg';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
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
    {
      name: 'Login',
      href: '/login',
    },
  ];
  const handleMenuOpen = () => setOpenMenu(true);
  const handleMenuClose = () => setOpenMenu(false);

  return (
    <>
      <nav className="bg-white shadow-slate-300 shadow-sm w-full justify-between h-fit py-2 px-6 flex lg:hidden ">
        {/* MOBILE NAVIGATION */}

        <div className="flex items-center">
          <button className="mr-4" onClick={handleMenuOpen}>
            <Image src={burgerMenu} alt="burgerMenu" width={20} height={20} />
          </button>
          {openMenu && (
            <div className="absolute top-0 text-black h-full px-6 pt-10 left-0  bg-slate-100">
              <span className="cursor-pointer" onClick={handleMenuClose}>
                x
              </span>
              <ul className="flex flex-col justify-center text-black space-y-4 items-center">
                {navMenu.map((el, i) => (
                  <li className="cursor-pointer" key={i}>
                    <Link href={el.href}>{el.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <h1 className="text-black font-sans font-extrabold text-3xl ">
            ODECOHUB
          </h1>
        </div>

        <div className="flex  space-x-5 ">
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
          <Image
            className="cursor-pointer"
            src={userIcon}
            alt="profile"
            width={20}
            height={20}
          />
        </div>
      </nav>

      {/* DESKTOP NAV */}
      <nav className=" hidden lg:flex  shadow-slate-300 shadow-sm items-center justify-between bg-white w-full  h-fit py-2 px-6 relative">
        <h1 className="text-black font-sans font-extrabold text-3xl ">
          ODECOHUB
        </h1>
        <ul className="flex text-black space-x-2 items-center">
          {navMenu.map((el, i) => (
            <li key={i}>
              <Link href={el.href}>{el.name}</Link>
            </li>
          ))}
        </ul>
        <div className="relative  max-w-md">
          <input
            type="text"
            placeholder="Search for products..."
            className=" text-black bg-slate-200 w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-slate-300 focus:border-transparent"
          />
          <Image
            src={searchIcon}
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
