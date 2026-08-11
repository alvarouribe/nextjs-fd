import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';

import Reveal from '@/components/motion/Reveal';

type Callback = IntersectionObserverCallback;

function mockMatchMedia(matches: boolean) {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}

describe('Reveal', () => {
  let capturedCallback: Callback | null;
  let observeMock: jest.Mock;
  let unobserveMock: jest.Mock;
  let observerCtor: jest.Mock;

  beforeEach(() => {
    capturedCallback = null;
    observeMock = jest.fn();
    unobserveMock = jest.fn();
    observerCtor = jest.fn().mockImplementation((callback: Callback) => {
      capturedCallback = callback;
      return {
        observe: observeMock,
        unobserve: unobserveMock,
        disconnect: jest.fn(),
        takeRecords: () => [],
      };
    });
    window.IntersectionObserver =
      observerCtor as unknown as typeof IntersectionObserver;
    mockMatchMedia(false);
  });

  it('renders children', () => {
    render(<Reveal>Hello</Reveal>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('has reveal but not is-visible before intersection', () => {
    render(<Reveal>content</Reveal>);
    const node = screen.getByText('content');
    expect(node).toHaveClass('reveal');
    expect(node).not.toHaveClass('is-visible');
  });

  it('gains is-visible when the observer callback fires with isIntersecting: true', () => {
    render(<Reveal>content</Reveal>);
    const node = screen.getByText('content');
    act(() => {
      capturedCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(node).toHaveClass('is-visible');
  });

  it('sets --reveal-index / --reveal-step inline', () => {
    render(
      <Reveal index={2} step={200}>
        content
      </Reveal>
    );
    const node = screen.getByText('content');
    expect(node.style.getPropertyValue('--reveal-index')).toBe('2');
    expect(node.style.getPropertyValue('--reveal-step')).toBe('200ms');
  });

  it('calls unobserve after the first reveal', () => {
    render(<Reveal>content</Reveal>);
    act(() => {
      capturedCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(unobserveMock).toHaveBeenCalledTimes(1);
  });

  it('is visible immediately and builds no observer when reduced motion is preferred', () => {
    mockMatchMedia(true);
    render(<Reveal>content</Reveal>);
    const node = screen.getByText('content');
    expect(node).toHaveClass('is-visible');
    expect(observerCtor).not.toHaveBeenCalled();
  });
});
