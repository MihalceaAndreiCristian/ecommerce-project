export function getAuthToken(): string | undefined {
  return document.cookie.split('; ').find(row => row.startsWith('Authorization='))?.split('=')[1];
}
