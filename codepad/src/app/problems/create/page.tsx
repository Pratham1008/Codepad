import { redirect } from "next/navigation";
import { getUserProfile } from "@/app/(app)/settings/actions";
import { ProblemEditorClient } from "../ProblemEditorClient";

export default async function CreateProblemPage() {
  const profile = await getUserProfile();
  if (!profile || profile.error || profile.role !== "ROLE_ADMIN") {
    redirect("/problems");
  }

  return <ProblemEditorClient initialData={null} />;
}
