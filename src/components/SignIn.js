import React from "react";
import SignInNav from "./SignInNav";

export default function SignIn() {
  return (
    <div>
      <p>Login</p>
      <div>
        <p>Email</p>
        <input type="text" name="email" />
      </div>
      <div>
        <p>Password</p>
        <input type="text" name="password" />
      </div>
      <button>Submit</button>
      <SignInNav />
    </div>
  );
}
