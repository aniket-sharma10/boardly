import { OrganizationProfile } from "@clerk/nextjs";

const SettingsPage = () => {
  return (
    <div className="w-full">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: { width: "100%", boxShadow: "none" },
            card: {
              width: "100%",
              boxShadow: "none",
              border: "1px solid #e5e5e5",
            },
          },
        }}
      />
    </div>
  );
};

export default SettingsPage;
