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

export async function getTotalClicksFromDB(urlIds: number[]) {
  let totalClicks = 0;

  for (const urlId of urlIds) {
    const { count, error } = await supabase
      .from("clicks")
      .select("*", { count: 'exact', head: true }) // use count directly if supported
      .eq("url_id", urlId);

    if (error) {
      console.error(`Error fetching clicks for ${urlId}:`, error);
      continue;
    }

    totalClicks += count || 0; 
  }

  return totalClicks;
}
