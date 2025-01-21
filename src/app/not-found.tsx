import Image from 'next/image'
import { AppConstants } from './utils/app-constants'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <span className="sr-only">{AppConstants['companyName']}</span>
      <Image
        alt="FlyingDolly Logo"
        src="/fd-logo-glow.svg"
        width={120}
        height={40}
        className="w-auto h-20"
      />
      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
      <p>Could not find the resource</p>
    </div>
  );
}