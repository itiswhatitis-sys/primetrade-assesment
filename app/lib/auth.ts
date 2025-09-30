// lib/auth.ts
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function registerUser({ name, email, password }: {name:string, email:string, password:string}) {
  const res = await fetch(`${API_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
    credentials: 'include'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Register failed');
  return data;
}

export async function loginUser({ email, password }: {email:string, password:string}) {
  const res = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include' // important so cookie is saved
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  // data.accessToken returned; refresh token is in httpOnly cookie
  localStorage.setItem('accessToken', data.accessToken);
  return data;
}

/** wrapper that will attempt refresh on 401 */
export async function authFetch(path: string, options: RequestInit = {}) {
  const API = API_URL;
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  options.headers = {
    ...(options.headers || {}),
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
  options.credentials = 'include'; // include cookies for refresh endpoint
  let res = await fetch(`${API}${path}`, options);
  if (res.status === 401) {
    // try refresh
    const r = await fetch(`${API}/api/auth/refresh_token`, {
      method: 'POST',
      credentials: 'include'
    });
    if (r.ok) {
      const d = await r.json();
      localStorage.setItem('accessToken', d.accessToken);
      options.headers = {
        ...(options.headers || {}),
        Authorization: `Bearer ${d.accessToken}`
      };
      res = await fetch(`${API}${path}`, options);
    } else {
      // refresh failed
      throw new Error('Unauthorized');
    }
  }
  return res;
}
