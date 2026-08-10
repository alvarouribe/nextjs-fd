import 'server-only';
import { v2 as cloudinary } from 'cloudinary';

import { requiredEnv } from './required-env';

// Re-exported so existing server modules can keep importing it from here.
export { requiredEnv };

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
