// allows setting and checking cookies for email limit
export const setEmailLimitCookie = (minutes = 60) => {
  const date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000); // Set cookie expiration
  document.cookie =
    'emailLimit=active; expires=' + date.toUTCString() + '; path=/';
};
// checks if the email limit cookie is set, true means the email was recently sent.
// false means no recent email sent.
export const checkEmailLimitCookie = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith('emailLimit=')) {
      return true;
    }
  }
  return false;
};
