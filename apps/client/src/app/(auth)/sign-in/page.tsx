// import { getCurrentUser } from "@/actions/user/action";
// import { redirect } from "next/navigation";

import SignInForm from "@/components/forms/sign-in-form";

export default async function SignInPage() {
  // const user = await getCurrentUser();

  // if (user) {
  //   redirect("/");
  // }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-24 lg:px-3 sm:px-10 transition-all duration-200 ease-in mt-28 mb-14 sm:mt-32 sm:mb-16">
      <SignInForm />
    </div>
  );
}
