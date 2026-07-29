import { fetchSampleUsers, fetchSampleUsersPromise } from './api.js';
import { createTask } from './utils.js';

async function main() {
  console.log('--- Testing API Functions ---');

  
  try {
    const usersAsync = await fetchSampleUsers();
    console.log('fetchSampleUsers Result:', usersAsync);
  } catch (error) {
    console.error('Error running fetchSampleUsers:', error);
  }

  
  try {
    const usersPromise = await fetchSampleUsersPromise();
    console.log('fetchSampleUsersPromise Result:', usersPromise);
  } catch (error) {
    console.error('Error running fetchSampleUsersPromise:', error);
  }

  console.log('\n--- Testing Task Creation ---');

  
  try {
    const sampleTaskData = {
      title: 'Complete Graded Task 4',
      dueDate: '2026-07-29'
    };
    
    const newTask = createTask(sampleTaskData);
    console.log('Created Task Successfully:', newTask);
  } catch (error) {
    console.error('Failed to create task:', error.name, error.message);
  }
}

main();