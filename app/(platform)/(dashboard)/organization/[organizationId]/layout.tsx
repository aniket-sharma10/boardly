import { startCase } from "lodash";
import { OrgControl } from "./_components/orgControl";
import { auth } from "@clerk/nextjs/server";

export async function generateMetadata() {
  const { orgSlug } = await auth();
  const cleanedSlug = orgSlug?.replace(/-\d+$/, "") ?? "Organization";
  return {
    title: startCase(cleanedSlug),
  };
}

const OrgnanizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrgnanizationLayout;
