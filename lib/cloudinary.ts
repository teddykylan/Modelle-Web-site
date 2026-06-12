import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const cloudKey = process.env.CLOUDINARY_API_KEY?.trim();
const cloudSecret = process.env.CLOUDINARY_API_SECRET?.trim();

export const isCloudinaryConfigured = Boolean(
  cloudName && cloudKey && cloudSecret && cloudName.toLowerCase() !== "root"
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: cloudKey,
    api_secret: cloudSecret,
    secure: true,
  });
}

export function ensureCloudinaryConfigured() {
  if (!isCloudinaryConfigured) {
    throw new Error(
      "Cloudinary n'est pas configuré ou les identifiants sont invalides. Vérifiez CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY et CLOUDINARY_API_SECRET."
    );
  }
}

export { cloudinary };

export async function uploadImage(
  file: Buffer,
  folder = "templatehub/images"
): Promise<{ url: string; publicId: string }> {
  ensureCloudinaryConfigured();

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder, resource_type: "image" },
        (error, result) => {
          if (error || !result) {
            reject(
              error ?? new Error(
                "Upload Cloudinary échoué. Vérifiez votre configuration Cloudinary."
              )
            );
          } else {
            resolve({ url: result.secure_url, publicId: result.public_id });
          }
        }
      )
      .end(file);
  });
}

export async function uploadZip(
  file: Buffer,
  fileName: string,
  folder = "templatehub/files"
): Promise<{ url: string; publicId: string; size: number }> {
  ensureCloudinaryConfigured();

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "raw",
          public_id: fileName.replace(/\.[^/.]+$/, ""),
        },
        (error, result) => {
          if (error || !result) {
            reject(
              error ?? new Error(
                "Upload Cloudinary échoué. Vérifiez votre configuration Cloudinary."
              )
            );
          } else {
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
              size: result.bytes,
            });
          }
        }
      )
      .end(file);
  });
}

export function getSignedDownloadUrl(publicId: string, expiresInSeconds = 3600) {
  const timestamp = Math.round(Date.now() / 1000) + expiresInSeconds;
  const url = cloudinary.url(publicId, {
    resource_type: "raw",
    type: "authenticated",
    sign_url: true,
    expires_at: timestamp,
  });
  return url;
}

export function extractPublicIdFromUrl(url: string): string | null {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/);
  return match?.[1] ?? null;
}
