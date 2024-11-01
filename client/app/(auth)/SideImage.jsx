import Image from 'next/image';
import loginImage from '../assets/loginImage.png';

export default function SideImage() {
  return (
    <Image
      className="hidden lg:block w-5/12"
      src={loginImage}
      alt="Login Image"
      width={805}
      height={706}
    />
  );
}
