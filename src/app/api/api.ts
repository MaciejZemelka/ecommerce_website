import store from '../store/store';
import { newAccessToken } from '../store/slices/authSlice';

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const accessToken = store.getState().auth.accessToken;

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    try {
        await store.dispatch(newAccessToken);
    } catch (error) {
        alert(error);
    }
    
    const newGivenAccessToken = store.getState().auth.accessToken;

    headers.Authorization = `Bearer ${newGivenAccessToken}`;
    try {
        response = await fetch(url, { ...options, headers });
    } catch (error) {
        alert(error);
    }
    
  }

  return response;
};
