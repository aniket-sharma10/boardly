import { Plus } from "lucide-react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "./mobileSidebar";
import { FormPopover } from "@/components/form/formPopover";

export const Navbar = () => {
  return (
    <nav className="fixed px-4 pl-0 z-50 top-0 w-full h-14 border-b shadow-sm bg-white flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-4 pl-3">
        <div className="hidden sm:flex w-fit">
          <Logo variant="sm" />
        </div>
        <FormPopover align="start" sideOffset={15} side="bottom">
          <Button
            size={"sm"}
            variant={"primary"}
            className="rounded-sm md:ml-[-15px] hidden md:block h-auto py-1.5 px-2"
          >
            Create
          </Button>
        </FormPopover>
        <FormPopover align="start" sideOffset={15} side="bottom">
          <Button
            size={"sm"}
            variant={"primary"}
            className="rounded-sm md:hidden block ml-2"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>

      <div className="flex items-center ml-auto gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={"/organization/:id"}
          afterSelectOrganizationUrl={"/organization/:id"}
          afterLeaveOrganizationUrl={"/selectOrg"}
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};
