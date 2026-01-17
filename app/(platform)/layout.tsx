import { ClerkProvider } from "@clerk/nextjs";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider signInFallbackRedirectUrl={"/"} afterSignOutUrl="/">
      {children}
    </ClerkProvider>
  );
};

export default PlatformLayout;
