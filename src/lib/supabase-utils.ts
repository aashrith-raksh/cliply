import supabase from "@/db/supabase";
import type { signUpType } from "..";

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  else return data;
}

export async function signUpNewUser({
  email,
  password,
  name,
  file,
}: signUpType) {

  let fileName = "public/" + name.split(" ").join("-");
  fileName = fileName + Math.random();
  const { error: storageError } = await supabase.storage
    .from("profile-pics")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (storageError) throw new Error(storageError.message);

  const { data:{publicUrl} } = supabase
  .storage
  .from('profile-pics')
  .getPublicUrl(fileName)

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data:{
        name,
        profile_pic:publicUrl
      }
    },
  });

  if (error) throw new Error(error.message);
  else return data;
}
