import { contactDetails } from '@/app/utils/site-content';

export default function ContactDetails() {
  const { email, phone, suburb } = contactDetails;

  return (
    <div className="text-sm text-gray-600 dark:text-gray-400">
      <p>{suburb}</p>
      {email && (
        <p className="mt-1">
          <a
            href={`mailto:${email}`}
            className="font-semibold text-green-600 hover:text-green-500 dark:text-green-400"
          >
            {email}
          </a>
        </p>
      )}
      {phone && (
        <p className="mt-1">
          <a
            href={`tel:${phone}`}
            className="font-semibold text-green-600 hover:text-green-500 dark:text-green-400"
          >
            {phone}
          </a>
        </p>
      )}
    </div>
  );
}
