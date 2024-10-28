import Image from 'next/image';
import userIcon from '../assets/userIcon.svg';
import burgerMenu from '../assets/BurgerMenu.svg';
import cartIcon from '../assets/cartIcon.svg';
import searchIcon from '../assets/searchIcon.svg';

export default function Navbar() {
  return (
    <nav className="bg-white w-full justify-between h-fit py-2 px-6 flex md:hidden">
      <div className="flex justify-center items-center space-x-4">
        <Image src={burgerMenu} alt="burgerMenu" width={20} height={20} />
        <h1 className="text-black font-sans font-extrabold text-3xl ">
          ODECOHUB
        </h1>
      </div>

      <div className="flex border-2 space-x-3 border-black">
        <Image src={searchIcon} width={20} height={20} alt="searchIcon" />
        <Image src={cartIcon} alt="add to cart" width={20} height={20} />
        <Image src={userIcon} alt="profile" width={20} height={20} />
      </div>
    </nav>
  );
}
