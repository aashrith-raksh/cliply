import supabase from "@/db/supabase";

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  else return data;
}

export async function signUpNewUser(email:string, password:string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // options: {
    //   emailRedirectTo: "/home",
    // },
  });

  if (error) throw error;
  else return data;
}
