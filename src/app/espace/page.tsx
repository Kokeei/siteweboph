import type { Metadata } from "next";
import { AccountSpace } from "@/components/forms/AccountSpace";
import { FormPageLayout } from "@/components/content/FormPageLayout";

export const metadata: Metadata = { title: "Mon espace", robots: { index: false, follow: false } };

export default function EspacePage() {
  return (
    <FormPageLayout title="Mon espace" crumbs={[{ label: "Mon espace" }]}>
      <AccountSpace />
    </FormPageLayout>
  );
}
