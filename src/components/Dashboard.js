import React from "react";
import { useSelector } from "react-redux";
import { userGetBooks } from "../actions/supabase";
import Error from "./Error";
import DashboardTop from "./dashboard-components/DashboardTop";

export default function Dashboard() {
  let signedIn = useSelector((state) => state.user.signedIn);
  let id = useSelector((state) => state.user.id);
  userGetBooks(id);
  return (
    <div>
      Dashboard
      {signedIn ? <DashboardTop /> : <Error />}
    </div>
  );
}
