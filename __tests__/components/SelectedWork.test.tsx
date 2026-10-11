import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import SelectedWork from '../../src/components/SelectedWork';

const mockProjects = jest.fn();
const trackSelectContent = jest.fn();

jest.mock('../../src/app/utils/site-content', () => ({
  __esModule: true,
  get selectedWork() {
    return mockProjects();
  },
}));

jest.mock('../../src/app/utils/analytics', () => ({
  trackSelectContent: (...args: unknown[]) => trackSelectContent(...args),
}));

const projects = [
  {
    name: 'BOP Gutter CleaNZ',
    url: 'https://www.bopguttercleanz.co.nz/',
    category: 'Trades & services',
    description: 'A lead-generating site for a gutter specialist.',
    tags: ['Web design', 'Development'],
    imageSrc: '/images/work/bop-gutter-cleanz.webp',
  },
  {
    name: 'Pacific Share',
    url: 'https://www.pacificshare.org/',
    category: 'Nonprofit',
    description: 'A storytelling site for a Pacific nonprofit.',
    tags: ['Brand', 'Web design'],
    imageSrc: '/images/work/pacific-share.webp',
  },
];

describe('SelectedWork', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when there are no projects', () => {
    mockProjects.mockReturnValue([]);

    const { container } = render(<SelectedWork />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders the heading and a card per project', () => {
    mockProjects.mockReturnValue(projects);

    render(<SelectedWork />);

    expect(document.getElementById('selected-work-section')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /websites we've built/i })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(2);

    expect(screen.getByRole('heading', { name: /^BOP Gutter CleaNZ/ })).toBeInTheDocument();
    expect(screen.getByText('A storytelling site for a Pacific nonprofit.')).toBeInTheDocument();
    expect(screen.getByText('Nonprofit')).toBeInTheDocument();
    expect(screen.getAllByText('Web design')).toHaveLength(2);
    expect(screen.getByAltText(/BOP Gutter CleaNZ website homepage/i)).toBeInTheDocument();
    expect(screen.getByText('bopguttercleanz.co.nz')).toBeInTheDocument();
  });

  it('links each card to the live site in a new tab', () => {
    mockProjects.mockReturnValue(projects);

    render(<SelectedWork />);

    const link = screen.getByRole('link', { name: /pacific share \(opens in a new tab\)/i });
    expect(link).toHaveAttribute('href', 'https://www.pacificshare.org/');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('tracks clicks through to a project', () => {
    mockProjects.mockReturnValue(projects);

    render(<SelectedWork />);

    fireEvent.click(screen.getByRole('link', { name: /bop gutter cleanz/i }));

    expect(trackSelectContent).toHaveBeenCalledWith({
      source: 'selected_work',
      destination: 'https://www.bopguttercleanz.co.nz/',
      label: 'BOP Gutter CleaNZ',
    });
  });
});
