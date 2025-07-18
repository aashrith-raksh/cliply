import supabase from "@/db/supabase";
import type { UploadUrlData } from "@/index";

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
      .select("*", { count: "exact", head: true }) // use count directly if supported
      .eq("url_id", urlId);

    if (error) {
      console.error(`Error fetching clicks for ${urlId}:`, error);
      continue;
    }

    totalClicks += count || 0;
  }

  return totalClicks;
}

export async function deleteUrl(id: number) {
  try {
    const response = await supabase.from("urls").delete().eq("id", id);
    return response;
  } catch (error) {
    console.log((error as Error).message);
    throw new Error("Error while loading URLs");
  }
}

export async function uploadQrToStorage(file: File, customUrl?: string) {
  if (!file) throw new Error("No file provided");

  const fileName = `qr-${customUrl ?? Date.now()}`;

  const { error } = await supabase.storage.from("qrs").upload(fileName, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    console.log(error.message);
    throw new Error("Error while uploading QR");
  }

  const { data } = supabase.storage.from("qrs").getPublicUrl(fileName);
  return data.publicUrl;
}

export async function insertUrl(
  { longUrl, customUrl, title, userId }: UploadUrlData,
  qrFile: File
) {
  const shortUrl = Math.random().toString(36).substring(2, 6);
  const qrPublicUrl = await uploadQrToStorage(qrFile, customUrl);
  try {
    const response = await supabase.from("urls").insert({
      title,
      original_url: longUrl,
      custom_url:customUrl,
      user_id: userId,
      short_url: shortUrl,
      qr: qrPublicUrl,
    });
    return response;
  } catch (error) {
    console.log((error as Error).message);
    throw new Error("Error while loading URLs");
  }
}
