import config from "@/lib/config";
import { ratelimithelper } from "@/lib/ratelimit";
import ImageKit from "imagekit";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export async function GET() {
  const success = await ratelimithelper();

  if (!success) {
    redirect("/too-fast");
  }
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
