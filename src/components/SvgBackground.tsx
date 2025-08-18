export default function SVGBackground() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 -z-10 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:stroke-white/10"
    >
      <defs>
        <pattern
          x="50%"
          y={-64}
          id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
          width={200}
          height={200}
          patternUnits="userSpaceOnUse"
        >
          <path d="M100 200V.5M.5 .5H200" fill="none" />
        </pattern>
      </defs>
      <svg
        x="50%"
        y={-64}
        className="overflow-visible fill-gray-50 dark:fill-gray-800/40"
      >
        <path
          d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
          strokeWidth={0}
        />
      </svg>
      <rect
        fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
        width="100%"
        height="100%"
        strokeWidth={0}
      />
    </svg>
  );
}
