import React from "react";
import SignInNav from "./SignInNav";

export default function SignUp() {
  return (
    <div>
      <p>SignUp</p>
      <div>
        <p>First Name</p>
        <input type="text" name="firstName" />
      </div>
      <div>
        <p>Last Name</p>
        <input type="text" name="lastName" />
      </div>
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
