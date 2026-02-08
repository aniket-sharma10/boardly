import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider signInFallbackRedirectUrl={"/"} afterSignOutUrl="/">
      <Toaster />
      {children}
    </ClerkProvider>
  );
};

export default PlatformLayout;
