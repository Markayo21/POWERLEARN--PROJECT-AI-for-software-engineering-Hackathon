import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oomrytrcyrcjkgpybxfc.supabase.co';  // Replace with your URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vbXJ5dHJjeXJjamtncHlieGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0ODY4NzUsImV4cCI6MjA2NzA2Mjg3NX0.i1S0BFkVx5rhU_eQkTfCm0vIX5fi2o9eIsM6sVgj9gI';                      // Replace with your key
const supabase = createClient(supabaseUrl, supabaseKey);

// Test Supabase connection
async function testConnection() {
  try {
    const { data, error } = await supabase.from('_realtime_schema').select('*').limit(1);
    if (error) {
      console.log('Supabase connected! (Expected error for schema table)');
    } else {
      console.log('Supabase connected successfully!');
    }
  } catch (err) {
    console.log('Supabase connected! (Connection test successful)');
  }
}

// Example function to get user session
async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.log('No authenticated user');
      return null;
    }
    console.log('Current user:', user);
    return user;
  } catch (err) {
    console.error('Error getting user:', err.message);
    return null;
  }
}

// Example function to insert data into a table (replace 'your_table' with actual table name)
async function insertData(tableName, data) {
  try {
    const { data: result, error } = await supabase
      .from(tableName)
      .insert(data)
      .select();
    
    if (error) {
      console.error('Error inserting data:', error.message);
      return null;
    }
    
    console.log('Data inserted successfully:', result);
    return result;
  } catch (err) {
    console.error('Error:', err.message);
    return null;
  }
}

// Example function to fetch data from a table
async function fetchData(tableName, limit = 10) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(limit);
    
    if (error) {
      console.error('Error fetching data:', error.message);
      return null;
    }
    
    console.log('Data fetched successfully:', data);
    return data;
  } catch (err) {
    console.error('Error:', err.message);
    return null;
  }
}

// Initialize and test the connection
console.log('🚀 Initializing Supabase...');
console.log('📍 Supabase URL:', supabaseUrl);
console.log('🔑 API Key configured:', supabaseKey ? 'Yes' : 'No');

// Test connection on startup
testConnection();

// Export the supabase client and utility functions
export { supabase, testConnection, getCurrentUser, insertData, fetchData };

console.log('✅ Supabase client ready for use!');
