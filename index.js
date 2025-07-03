import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oomrytrcyrcjkgpybxfc.supabase.co';  // Replace with your URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vbXJ5dHJjeXJjamtncHlieGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0ODY4NzUsImV4cCI6MjA2NzA2Mjg3NX0.i1S0BFkVx5rhU_eQkTfCm0vIX5fi2o9eIsM6sVgj9gI';                      // Replace with your key
const supabase = createClient(supabaseUrl, supabaseKey);
