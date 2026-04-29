import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

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
});
