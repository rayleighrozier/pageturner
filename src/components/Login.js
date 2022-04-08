import React from "react";

export default function Login() {
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
    </div>
  );
}
