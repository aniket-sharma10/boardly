import { OrgControl } from "./_components/orgControl";

const OrgnanizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrgnanizationLayout;
