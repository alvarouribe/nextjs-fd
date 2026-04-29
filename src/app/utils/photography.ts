import 'server-only';
import { unstable_cache } from 'next/cache';
import { getCloudinary, requiredEnv } from '@/app/utils/cloudinary';

export type PhotographyImage = {
  id: number;
  publicId: string;
  format: string;
  width: number;
  height: number;
};

type CloudinaryResource = {
  public_id: string;
  format: string;
  width: number;
  height: number;
};

type CloudinarySearchResult = {
  resources: CloudinaryResource[];
};

const fetchPhotographyImagesUncached = async (): Promise<PhotographyImage[]> => {
  const folder = requiredEnv('CLOUDINARY_FOLDER');
  const cloudinary = getCloudinary();

  const result = (await cloudinary.search
    .expression(`folder:${folder}/*`)
    .sort_by('public_id', 'desc')
    .max_results(400)
    .execute()) as CloudinarySearchResult;

  return result.resources.map((resource, index) => ({
    id: index,
    publicId: resource.public_id,
    format: resource.format,
    width: resource.width,
    height: resource.height,
  }));
};

const getCachedPhotographyImages = unstable_cache(
  fetchPhotographyImagesUncached,
  ['photography-images'],
  { revalidate: 3600 }
);

export const getPhotographyImages = async (): Promise<PhotographyImage[]> =>
  getCachedPhotographyImages();
