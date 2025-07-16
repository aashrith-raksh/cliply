import supabase from "@/db/supabase";

export async function getAllUrlsOfCurrentUser(userId: string) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.log(error.message);
    throw new Error("Error while loading URLs");
  } else {
    return data;
  }
}
