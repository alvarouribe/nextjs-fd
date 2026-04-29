import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import PhotographyGallery from '../../src/components/PhotographyGallery';

const mockImages = [
  { id: 0, publicId: 'portfolio/sample-one', format: 'jpg', width: 1200, height: 800 },
  { id: 1, publicId: 'portfolio/sample-two', format: 'jpg', width: 800, height: 1200 },
];

const cloudName = 'testcloud';

describe('PhotographyGallery', () => {
  it('renders all images in the grid', () => {
    render(<PhotographyGallery images={mockImages} cloudName={cloudName} />);
    const imgs = screen.getAllByRole('img');
    expect(imgs).toHaveLength(2);
  });

  it('does not show a modal by default', () => {
    render(<PhotographyGallery images={mockImages} cloudName={cloudName} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens the modal when an image is clicked', () => {
    render(<PhotographyGallery images={mockImages} cloudName={cloudName} />);
    const firstImage = screen.getAllByRole('img')[0];
    fireEvent.click(firstImage.closest('button')!);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('shows the high-res image in the modal', () => {
    render(<PhotographyGallery images={mockImages} cloudName={cloudName} />);
    fireEvent.click(screen.getAllByRole('img')[0].closest('button')!);
    const dialog = screen.getByRole('dialog');
    const modalImg = dialog.querySelector('img');
    expect(modalImg?.src).toContain('w_2560');
    expect(modalImg?.src).toContain('sample-one');
  });

  it('closes the modal when the close button is clicked', () => {
    render(<PhotographyGallery images={mockImages} cloudName={cloudName} />);
    fireEvent.click(screen.getAllByRole('img')[0].closest('button')!);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the modal when the backdrop is clicked', () => {
    render(<PhotographyGallery images={mockImages} cloudName={cloudName} />);
    fireEvent.click(screen.getAllByRole('img')[0].closest('button')!);
    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the modal on Escape key press', () => {
    render(<PhotographyGallery images={mockImages} cloudName={cloudName} />);
    fireEvent.click(screen.getAllByRole('img')[0].closest('button')!);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not close the modal when clicking the image inside the dialog', () => {
    render(<PhotographyGallery images={mockImages} cloudName={cloudName} />);
    fireEvent.click(screen.getAllByRole('img')[0].closest('button')!);
    const dialog = screen.getByRole('dialog');
    const modalImg = dialog.querySelector('img')!;
    fireEvent.click(modalImg);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  describe('navigation arrows', () => {
    it('shows the next button when not on the last image', () => {
      render(<PhotographyGallery images={mockImages} cloudName={cloudName} />);
      fireEvent.click(screen.getAllByRole('img')[0].closest('button')!);
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });

    it('shows the previous button when not on the first image', () => {
      render(<PhotographyGallery images={mockImages} cloudName={cloudName} />);
      fireEvent.click(screen.getAllByRole('img')[1].closest('button')!);
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    });

    it('hides the previous button on the first image', () => {
      render(<PhotographyGallery images={mockImages} cloudName={cloudName} />);
      fireEvent.click(screen.getAllByRole('img')[0].closest('button')!);
      expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument();
    });

    it('hides the next button on the last image', () => {
      render(<PhotographyGallery images={mockImages} cloudName={cloudName} />);
      fireEvent.click(screen.getAllByRole('img')[1].closest('button')!);
      expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
    });

    it('navigates to the next image when the next button is clicked', () => {
      render(<PhotographyGallery images={mockImages} cloudName={cloudName} />);
      fireEvent.click(screen.getAllByRole('img')[0].closest('button')!);
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      const dialog = screen.getByRole('dialog');
      expect(dialog.querySelector('img')?.src).toContain('sample-two');
    });

    it('navigates to the previous image when the previous button is clicked', () => {
      render(<PhotographyGallery images={mockImages} cloudName={cloudName} />);
      fireEvent.click(screen.getAllByRole('img')[1].closest('button')!);
      fireEvent.click(screen.getByRole('button', { name: /previous/i }));
      const dialog = screen.getByRole('dialog');
      expect(dialog.querySelector('img')?.src).toContain('sample-one');
    });

    it('navigates to the next image with ArrowRight key', () => {
      render(<PhotographyGallery images={mockImages} cloudName={cloudName} />);
      fireEvent.click(screen.getAllByRole('img')[0].closest('button')!);
      fireEvent.keyDown(document, { key: 'ArrowRight' });
      const dialog = screen.getByRole('dialog');
      expect(dialog.querySelector('img')?.src).toContain('sample-two');
    });

    it('navigates to the previous image with ArrowLeft key', () => {
      render(<PhotographyGallery images={mockImages} cloudName={cloudName} />);
      fireEvent.click(screen.getAllByRole('img')[1].closest('button')!);
      fireEvent.keyDown(document, { key: 'ArrowLeft' });
      const dialog = screen.getByRole('dialog');
      expect(dialog.querySelector('img')?.src).toContain('sample-one');
    });
  });

  describe('loading indicator', () => {
    it('shows a loading spinner immediately after opening the modal', () => {
      render(<PhotographyGallery images={mockImages} cloudName={cloudName} />);
      fireEvent.click(screen.getAllByRole('img')[0].closest('button')!);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('hides the spinner once the modal image has loaded', async () => {
      render(<PhotographyGallery images={mockImages} cloudName={cloudName} />);
      fireEvent.click(screen.getAllByRole('img')[0].closest('button')!);
      const dialog = screen.getByRole('dialog');
      const modalImg = dialog.querySelector('img')!;
      fireEvent.load(modalImg);
      await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
    });

    it('shows the spinner again when navigating to the next image', async () => {
      render(<PhotographyGallery images={mockImages} cloudName={cloudName} />);
      fireEvent.click(screen.getAllByRole('img')[0].closest('button')!);
      const dialog = screen.getByRole('dialog');
      fireEvent.load(dialog.querySelector('img')!);
      await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });
});
