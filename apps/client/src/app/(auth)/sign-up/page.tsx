import { getCurrentUserAction } from "@/actions/user.action";
import SignUpForm from "@/components/forms/sign-up-form";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const user = await getCurrentUserAction();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-3 sm:px-2 mt-28 mb-14 sm:mt-32 sm:mb-16">
      <SignUpForm />
    </div>
  );
}
