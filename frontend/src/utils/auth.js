import jwtDecode from 'jwt-decode';
export function isAuthenticated() {
  return !!localStorage.getItem('token');
}
export function getRole() {
  try { return jwtDecode(localStorage.getItem('token')).role; }
  catch { return null; }
}
