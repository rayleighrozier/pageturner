import React from "react";
import { userSignUp, userSignIn, userSignOut } from "../actions/supabase";
import getSampleBook from "../actions/googleBooks";
export default function Home() {
  getSampleBook("the sentence");
  return (
    <div>
      <h1>Home</h1>
      {/* conditional render login or dash */}
    </div>
  );
}
