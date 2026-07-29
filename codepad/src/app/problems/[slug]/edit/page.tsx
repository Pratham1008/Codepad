import { redirect } from "next/navigation";
import { getUserProfile } from "@/app/(app)/settings/actions";
import { getProblemBySlug } from "../../actions";
import { ProblemEditorClient } from "../../ProblemEditorClient";

export default async function EditProblemPage({ params }: { params: { slug: string } }) {
  const profile = await getUserProfile();
  if (!profile || profile.error || profile.role !== "ROLE_ADMIN") {
    redirect("/problems");
  }

  const problem = await getProblemBySlug(params.slug);
  if (!problem || problem.error) {
    redirect("/problems");
  }

  return <ProblemEditorClient initialData={problem} />;
}
