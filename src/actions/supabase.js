import { createClient } from "@supabase/supabase-js";
let supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
let supabaseUrl = "https://utbqrujgqijtxciqhlfc.supabase.co";
const supabase = createClient(supabaseUrl, supabaseKey);

const userSignUp = async (email, password) => {
  const { user, session, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    return error;
  }
  return user;
};

const userSignIn = async (email, password) => {
  const { user, session, error } = await supabase.auth.signIn({
    email: email,
    password: password,
  });
  if (error) {
    return error;
  }
  return user;
};

const userSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return error;
  }
};

export {
  supabase,
  supabaseUrl,
  supabaseKey,
  userSignUp,
  userSignIn,
  userSignOut,
};
