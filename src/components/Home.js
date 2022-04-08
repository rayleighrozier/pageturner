import React from "react";
import { userSignIn, userSignOut, userSignUp } from "../actions/supabase";

export default function Home() {
  console.log(userSignUp("test@test.com", "123456"));
  return (
    <div>
      <h1>Home</h1>
      {/* conditional render login or dash */}
    </div>
  );
}
