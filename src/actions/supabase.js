import { createClient } from "@supabase/supabase-js";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
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

const userGetBooks = async (id) => {
  let { data: reader, error } = await supabase
    .from("readers")
    .select("*")
    .match({ userid: id });
  let books = reader[0].books;
  return books;
};

const userUpdateBooks = async (id, updatedBooks) => {
  console.log(
    "userUpdate books triggered, this is what is sending up to supabase:",
    updatedBooks
  );
  let { data: reader, error } = await supabase
    .from("readers")
    .update({ books: updatedBooks })
    .match({ userid: id });
};

export { userSignUp, userSignIn, userSignOut, userGetBooks, userUpdateBooks };
