import 'server-only';
import { v2 as cloudinary } from 'cloudinary';

export const requiredEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

let isCloudinaryConfigured = false;

export const getCloudinary = () => {
  if (!isCloudinaryConfigured) {
    cloudinary.config({
      cloud_name: requiredEnv('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME'),
      api_key: requiredEnv('CLOUDINARY_API_KEY'),
      api_secret: requiredEnv('CLOUDINARY_API_SECRET'),
      secure: true,
    });
    isCloudinaryConfigured = true;
  }

  return cloudinary;
};
