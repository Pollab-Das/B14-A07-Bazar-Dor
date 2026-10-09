import { Suspense } from "react";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-500">লোড হচ্ছে...</div>}>
      <SignInForm />
    </Suspense>
  );
}