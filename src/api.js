const API_URL = 'https://jsonplaceholder.typicode.com/users';


const formatUsers = (users) => 
  users.map(({ id, name, email }) => ({ id, name, email }));

// 1. fetchSampleUsers -- uses async/await with try/catch/finally
export async function fetchSampleUsers() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return formatUsers(data);
  } catch (error) {
    console.error('Error fetching users:', error.message || error);
    return [];
  } finally {
    console.log('fetchSampleUsers process completed.');
  }
}


export function fetchSampleUsersPromise() {
  return fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => formatUsers(data))
    .catch((error) => {
      console.error('Error fetching users (Promise):', error.message || error);
      return [];
    });
}