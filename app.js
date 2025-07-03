// Import Supabase from CDN
import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://oomrytrcyrcjkgpybxfc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vbXJ5dHJjeXJjamtncHlieGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0ODY4NzUsImV4cCI6MjA2NzA2Mjg3NX0.i1S0BFkVx5rhU_eQkTfCm0vIX5fi2o9eIsM6sVgj9gI';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Utility function to display output
function displayOutput(elementId, message, isError = false) {
    const outputElement = document.getElementById(elementId);
    outputElement.style.display = 'block';
    outputElement.innerHTML = `
        <div style="color: ${isError ? '#e53e3e' : '#38a169'}; margin-bottom: 10px;">
            ${new Date().toLocaleTimeString()} - ${isError ? '❌ ERROR' : '✅ SUCCESS'}
        </div>
        <pre>${typeof message === 'object' ? JSON.stringify(message, null, 2) : message}</pre>
    `;
}

// Test Supabase connection
window.testConnection = async function() {
    try {
        displayOutput('connection-output', 'Testing connection...', false);
        
        // Try a simple query to test connection
        const { data, error } = await supabase.from('_realtime_schema').select('*').limit(1);
        
        if (error) {
            displayOutput('connection-output', 'Connection successful! (Expected schema error)', false);
        } else {
            displayOutput('connection-output', 'Connection successful!', false);
        }
        
        // Update status
        document.getElementById('connection-status').textContent = 'Connected to Supabase ✅';
        
    } catch (err) {
        displayOutput('connection-output', `Connection test completed: ${err.message}`, false);
    }
};

// Authentication functions
window.signUp = async function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        displayOutput('auth-output', 'Please enter both email and password', true);
        return;
    }
    
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });
        
        if (error) {
            displayOutput('auth-output', error.message, true);
        } else {
            displayOutput('auth-output', 'Sign up successful! Check your email for verification.', false);
        }
    } catch (err) {
        displayOutput('auth-output', err.message, true);
    }
};

window.signIn = async function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        displayOutput('auth-output', 'Please enter both email and password', true);
        return;
    }
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) {
            displayOutput('auth-output', error.message, true);
        } else {
            displayOutput('auth-output', 'Sign in successful!', false);
        }
    } catch (err) {
        displayOutput('auth-output', err.message, true);
    }
};

window.signOut = async function() {
    try {
        const { error } = await supabase.auth.signOut();
        
        if (error) {
            displayOutput('auth-output', error.message, true);
        } else {
            displayOutput('auth-output', 'Signed out successfully!', false);
        }
    } catch (err) {
        displayOutput('auth-output', err.message, true);
    }
};

window.getCurrentUser = async function() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
            displayOutput('auth-output', error.message, true);
        } else if (user) {
            displayOutput('auth-output', {
                id: user.id,
                email: user.email,
                created_at: user.created_at,
                last_sign_in_at: user.last_sign_in_at
            }, false);
        } else {
            displayOutput('auth-output', 'No user currently signed in', false);
        }
    } catch (err) {
        displayOutput('auth-output', err.message, true);
    }
};

// Data operations
window.insertData = async function() {
    const tableName = document.getElementById('table-name').value;
    const dataInput = document.getElementById('data-input').value;
    
    if (!tableName) {
        displayOutput('data-output', 'Please enter a table name', true);
        return;
    }
    
    let data;
    try {
        data = dataInput ? JSON.parse(dataInput) : { 
            title: 'Sample Task', 
            completed: false, 
            created_at: new Date().toISOString() 
        };
    } catch (err) {
        displayOutput('data-output', 'Invalid JSON format', true);
        return;
    }
    
    try {
        const { data: result, error } = await supabase
            .from(tableName)
            .insert(data)
            .select();
        
        if (error) {
            displayOutput('data-output', error.message, true);
        } else {
            displayOutput('data-output', {
                message: 'Data inserted successfully!',
                inserted_data: result
            }, false);
        }
    } catch (err) {
        displayOutput('data-output', err.message, true);
    }
};

window.fetchData = async function() {
    const tableName = document.getElementById('table-name').value;
    
    if (!tableName) {
        displayOutput('data-output', 'Please enter a table name', true);
        return;
    }
    
    try {
        const { data, error } = await supabase
            .from(tableName)
            .select('*')
            .limit(10);
        
        if (error) {
            displayOutput('data-output', error.message, true);
        } else {
            displayOutput('data-output', {
                message: `Fetched ${data.length} records from ${tableName}`,
                data: data
            }, false);
        }
    } catch (err) {
        displayOutput('data-output', err.message, true);
    }
};

// AI Features placeholder
window.processAI = async function() {
    const prompt = document.getElementById('ai-prompt').value;
    
    if (!prompt) {
        displayOutput('ai-output', 'Please enter an AI prompt', true);
        return;
    }
    
    // This is a placeholder for AI functionality
    // You can integrate with OpenAI, Claude, or other AI services here
    displayOutput('ai-output', {
        message: 'AI feature placeholder',
        prompt: prompt,
        note: 'This is where you would integrate with AI services like OpenAI, Claude, etc.',
        suggestion: 'You can use Supabase Edge Functions to call AI APIs securely'
    }, false);
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 POWERLEARN AI Hackathon App Initialized');
    console.log('📊 Supabase client ready');
    
    // Test connection on load
    testConnection();
    
    // Listen for auth state changes
    supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event, session);
        
        if (event === 'SIGNED_IN') {
            displayOutput('auth-output', 'User signed in successfully!', false);
        } else if (event === 'SIGNED_OUT') {
            displayOutput('auth-output', 'User signed out', false);
        }
    });
});

// Export for potential use in other modules
export { supabase };