import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "sm" | "lg";
}
const Logo = ({ variant = "lg" }: LogoProps) => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center hidden md:flex">
        <Image
          src="/Boardly.svg"
          alt="logo"
          width={variant === "sm" ? 115 : 200}
          height={variant === "sm" ? 115 : 200}
        />
      </div>
    </Link>
  );
};

export default Logo;
