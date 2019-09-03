import axios from 'axios';

const CSRF_COOKIE_NAME = 'csrftoken';
const CSRF_HEADER_NAME = 'X-CSRFToken';

const http = axios.create({
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME,
});


// 
// Auth API
// 

export function login(email, password) {
  return http.post('/auth/login/', { email, password });
}

export function logout() {
  return http.post('/auth/logout/', {});
}

export function createAccount(email, password) {
  return http.post('/registration/', {
    email,
    username: email,
    password1: password,
    password2: password,
  });
}

export function changeAccountPassword(password1, password2) {
  return http.post('/auth/password/change/', { password1, password2 });
}

export function sendAccountPasswordResetEmail(email) {
  return http.post('/auth/password/reset/', { email });
}

// eslint-disable-next-line camelcase
export function resetAccountPassword(uid, token, new_password1, new_password2) {
  return http.post('/auth/password/reset/confirm/', { uid, token, new_password1, new_password2 });
}

export function describeAccount () {
  return http.get('/auth/user/')
    .then(({ data: { username } }) => http.get(`/api/users/`, { params: { username }}))
    .then(({ data: { results: [account] } }) => ({ data: account }))
    .catch(err => {
      if (err && err.response && err.response.status === 401) {
        return { data: {} };
      }
      return Promise.reject(err);
    });
}

export function updateAccountDetails(data) {
  return http.patch('/auth/user/', data);
}

export function verifyAccountEmail(key) {
  return http.post('/registration/verify-email/', { key });
}

// 
// Invitations API
// 

export function readRoot() {
  return http.get('/api');
}

export function readEvents(params = {}) {
  return http.get('/api/events/', { params });
}

export function createEvent(data) {
  return http.post('/api/events/', data);
}

export function createInvitation(data) {
  return http.post('/api/invitations/', data);
}

export function readContacts (params = {}) {
  return http.get('/api/contacts/', { params });
}

export function createContact (data) {
  return http.post('/api/contacts/', data);
}

export function describeInvitation (id) {
  return http.get(`/api/invitations/${id}`);
}

export function updateInvitation(id, data) {
  return http.patch(`/api/invitations/${id}/`, data);
}

export function readEventInvitations (id, params = {}) {
  return http.get(`/api/events/${id}/invitations/`, params);
}
