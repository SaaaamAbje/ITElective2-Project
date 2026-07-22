import { fetchSampleUsers, fetchSampleUsersPromise } from './api.js';

console.log("Server starting....");


fetchSampleUsers().then((users) => {
    console.log('Async/Await Fetch Result:', users);
});


fetchSampleUsersPromise().then((users) => {
    console.log('Promise Chaining Fetch Result:', users);
});