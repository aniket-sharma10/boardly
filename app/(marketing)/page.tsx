import Link from "next/link";
import localfont from "next/font/local";
import { Poppins } from "next/font/google";

import { Medal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const headingFont = localfont({
  src: "../../public/fonts/font.woff2",
});

const bodyFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className={cn("flex items-center justify-center flex-col", headingFont.className)}>
        <div className="flex items-center justify-center font-bold text-emerald-700 bg-emerald-100 rounded-full p-4 uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No 1 task management
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Boardly  helps team move
        </h1>
        <div className="text-3xl md:text-6xl text-center bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 py-2 rounded-md pb-4 w-fit mb-6">
          work forward
        </div>
      </div>
      <div className={cn("text-sm md:text-xl text-neutral-600 mt-4 max-w-xs md:max-w-2xl text-center mx-auto", bodyFont.className)}>
        Collaborate, manage projects, and reach new productivity peaks. From
        high rises to the home office, the way your team works in unique -
        accomplish it all with boardly.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/signup">Get Boardly for free</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
