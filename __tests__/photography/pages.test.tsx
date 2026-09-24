import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import GoFreek2026TaurangaPage, {
  metadata as goFreekMetadata,
} from '../../src/app/photography/go-freek-2026-tauranga/page';
import PhotographyPage, { metadata as photographyMetadata } from '../../src/app/photography/page';
import PortraitsPage, {
  metadata as portraitsMetadata,
} from '../../src/app/photography/portraits/page';

const requiredEnv = jest.fn();
const getCloudinaryPhotosByFolder = jest.fn();

jest.mock('../../src/app/utils/cloudinary', () => ({
  requiredEnv: (...args: unknown[]) => requiredEnv(...args),
}));

jest.mock('../../src/app/utils/photography', () => ({
  getCloudinaryPhotosByFolder: (...args: unknown[]) => getCloudinaryPhotosByFolder(...args),
}));

jest.mock('../../src/components/PhotographyGallery', () => ({
  __esModule: true,
  default: ({ images, cloudName }: { images: Array<{ id: number }>; cloudName: string }) => (
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

  it('requests the go freek album and renders empty state when no images exist', async () => {
    getCloudinaryPhotosByFolder.mockResolvedValue([]);

    render(await GoFreek2026TaurangaPage());

    expect(getCloudinaryPhotosByFolder).toHaveBeenCalledWith('2026-04-26-go-freek');
    expect(screen.getByText('No photos available yet.')).toBeInTheDocument();
  });

  it('renders the services cross-sell section on every photography page', async () => {
    getCloudinaryPhotosByFolder.mockResolvedValue([]);

    render(await PhotographyPage());
    expect(
      screen.getByRole('heading', { name: /photos are one part of the system/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /websites that show off your work/i })).toHaveAttribute(
      'href',
      '/#services-section'
    );
    expect(
      screen.getByRole('link', { name: /automation that follows up your leads/i })
    ).toHaveAttribute('href', '/#services-section');
    expect(screen.getAllByRole('link', { name: /about/i })[0]).toHaveAttribute('href', '/about');
  });
});

describe('Photography pages metadata', () => {
  it('gives /photography its own canonical and unique title/description', () => {
    expect(photographyMetadata.alternates).toEqual({
      canonical: '/photography',
    });
    expect(photographyMetadata.title).toMatch(/photography/i);
    expect(photographyMetadata.description).toMatch(/mount maunganui|tauranga/i);
  });

  it('gives /photography/portraits its own canonical, distinct from /photography', () => {
    expect(portraitsMetadata.alternates).toEqual({
      canonical: '/photography/portraits',
    });
    expect(portraitsMetadata.title).not.toEqual(photographyMetadata.title);
    expect(portraitsMetadata.description).not.toEqual(photographyMetadata.description);
    expect(portraitsMetadata.title).toMatch(/portrait/i);
    expect(portraitsMetadata.description).toMatch(/mount maunganui|tauranga/i);
  });

  it('gives /photography/go-freek-2026-tauranga its own canonical and keyword-specific copy', () => {
    expect(goFreekMetadata.alternates).toEqual({
      canonical: '/photography/go-freek-2026-tauranga',
    });
    expect(goFreekMetadata.title).toMatch(/go freek/i);
    expect(goFreekMetadata.description).toMatch(/tauranga/i);
  });
});
