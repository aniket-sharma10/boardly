import { OrgControl } from "./_components/org-control";

const OrgnanizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrgnanizationLayout;
