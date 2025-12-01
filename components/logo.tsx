import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center hidden md:flex">
        <Image src="/Boardly.svg" alt="logo" width={200} height={200} />
      </div>
    </Link>
  );
};

export default Logo;
