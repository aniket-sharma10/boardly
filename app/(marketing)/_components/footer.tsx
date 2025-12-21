import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full px-4 py-2 border-t bg-slate-100">
      <div className="md:max-w-screen-2xl mx-auto flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <Logo variant="sm" />
        </div>
        <div className="gap-4 flex flex-1 justify-between md:flex-none">
          <Button size={"sm"} variant={"ghost"}>
            Privacy Policy
          </Button>

          <Button size={"sm"} variant={"ghost"}>
            Terms of Service{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};
