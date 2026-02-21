import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <Logo variant="sm" />
        </div>
        <div className="gap-4 flex flex-1 justify-between md:flex-none">
          <Button size={"sm"} variant={"outline"} asChild className="">
            <Link href="/signin">Login</Link>
          </Button>

          <Button size={"sm"} asChild className="">
            <Link href="/signup">Get Boardly for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
