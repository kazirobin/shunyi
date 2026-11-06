import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
const apiKey = process.env.CLOUDINARY_API_KEY!;
const apiSecret = process.env.CLOUDINARY_API_SECRET!;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error("Cloudinary credentials not configured. Check .env.local");
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

export const cloudinaryFolders = {
  products: "shunyi-garments/products",
  workers: "shunyi-garments/workers",
  workerDocuments: "shunyi-garments/worker-documents",
  rfq: "shunyi-garments/rfq",
  certificates: "shunyi-garments/certificates",
  website: "shunyi-garments/website",
} as const;

export type CloudinaryFolder = (typeof cloudinaryFolders)[keyof typeof cloudinaryFolders];

export interface UploadResult {
  public_id: string;
  secure_url: string;
  resource_type: "image" | "video" | "raw";
  width?: number;
  height?: number;
  format?: string;
  bytes: number;
}

export async function uploadToCloudinary(
  file: Buffer | string,
  folder: CloudinaryFolder,
  options?: {
    public_id?: string;
    resource_type?: "image" | "video" | "raw" | "auto";
    transformation?: Record<string, unknown>;
    tags?: string[];
    context?: Record<string, string>;
  }
): Promise<UploadResult> {
  const uploadOptions = {
    folder,
    resource_type: options?.resource_type || "auto",
    public_id: options?.public_id,
    transformation: options?.transformation,
    tags: options?.tags,
    context: options?.context,
    use_filename: true,
    unique_filename: true,
    overwrite: false,
  };

  if (Buffer.isBuffer(file)) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) reject(error);
          else resolve(result as UploadResult);
        }
      );
      uploadStream.end(file);
    });
  }

  return cloudinary.uploader.upload(file, uploadOptions) as Promise<UploadResult>;
}

export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "video" | "raw" = "image"
): Promise<{ result: string }> {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

export async function getSignedUploadParams(
  folder: CloudinaryFolder,
  resourceType: "image" | "video" | "raw" = "image"
): Promise<{ signature: string; timestamp: number; api_key: string }> {
  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = {
    folder,
    resource_type: resourceType,
    timestamp,
    use_filename: true,
    unique_filename: true,
  };

  const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

  return {
    signature,
    timestamp,
    api_key: apiKey,
  };
}

export { cloudinary };
export default cloudinary;