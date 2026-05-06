import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import PhotographyPage from '../../src/app/photography/page';
import PortraitsPage from '../../src/app/photography/portraits/page';

const requiredEnv = jest.fn();
const getCloudinaryPhotosByFolder = jest.fn();

jest.mock('../../src/app/utils/cloudinary', () => ({
  requiredEnv: (...args: unknown[]) => requiredEnv(...args),
}));

jest.mock('../../src/app/utils/photography', () => ({
  getCloudinaryPhotosByFolder: (...args: unknown[]) =>
    getCloudinaryPhotosByFolder(...args),
}));

jest.mock('../../src/components/PhotographyGallery', () => ({
  __esModule: true,
  default: ({
    images,
    cloudName,
  }: {
    images: Array<{ id: number }>;
    cloudName: string;
  }) => (
    <div data-testid="gallery">
      gallery:{cloudName}:{images.length}
    </div>
  ),
}));

describe('Photography server pages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    requiredEnv.mockReturnValue('demo-cloud');
  });

  it('renders empty state for /photography when no images are returned', async () => {
    getCloudinaryPhotosByFolder.mockResolvedValue([]);

    render(await PhotographyPage());

    expect(screen.getByText('No photos available yet.')).toBeInTheDocument();
    expect(screen.queryByTestId('gallery')).not.toBeInTheDocument();
    expect(getCloudinaryPhotosByFolder).toHaveBeenCalledWith();
  });

  it('renders gallery for /photography when images are available', async () => {
    getCloudinaryPhotosByFolder.mockResolvedValue([
      { id: 1, publicId: 'a', format: 'jpg', width: 100, height: 100 },
    ]);

    render(await PhotographyPage());

    expect(screen.getByText('gallery:demo-cloud:1')).toBeInTheDocument();
  });

  it('requests the portraits folder and renders empty state when no portraits exist', async () => {
    getCloudinaryPhotosByFolder.mockResolvedValue([]);

    render(await PortraitsPage());

    expect(getCloudinaryPhotosByFolder).toHaveBeenCalledWith('portraits');
    expect(screen.getByText('No photos available yet.')).toBeInTheDocument();
  });

  it('renders gallery for /photography/portraits when portraits are available', async () => {
    getCloudinaryPhotosByFolder.mockResolvedValue([
      { id: 2, publicId: 'p1', format: 'jpg', width: 100, height: 100 },
      { id: 3, publicId: 'p2', format: 'jpg', width: 100, height: 100 },
    ]);

    render(await PortraitsPage());

    expect(screen.getByText('gallery:demo-cloud:2')).toBeInTheDocument();
  });
});
