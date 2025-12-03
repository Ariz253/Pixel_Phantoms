document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const feedbackMsg = document.getElementById('form-feedback');
    const submitBtn = document.querySelector('.btn-login');

    const originalBtnText = submitBtn.innerHTML;

    function showError(id, message) {
        const errorElement = document.getElementById(id);
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    function hideError(id) {
        const errorElement = document.getElementById(id);
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    function validateField(input, errorId, message) {
        if (input.value.trim() === '') {
            showError(errorId, message);
            return false;
        }
        hideError(errorId);
        return true;
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const isUsernameValid = validateField(usernameInput, 'username-error', 'Codename is required');
        const isPasswordValid = validateField(passwordInput, 'password-error', 'Passkey is required');

        if (!isUsernameValid || !isPasswordValid) {
            feedbackMsg.textContent = '❌ Input validation failed.';
            feedbackMsg.className = 'feedback-message error show';
            return;
        }

        // --- Simulated Login Process ---
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ACCESSING...';
        feedbackMsg.classList.remove('show');

        // Simulate network delay
        setTimeout(() => {
            const username = usernameInput.value.toLowerCase().trim();
            const password = passwordInput.value.trim();

            // Simple mock authentication logic: Use 'neo_one' / 'matrix' for success
            if (username === 'neo_one' && password === 'matrix') {
                feedbackMsg.innerHTML = '✅ ACCESS GRANTED. Redirecting to Command Center...';
                feedbackMsg.className = 'feedback-message success show';
                
                // Simulate redirect after success
                setTimeout(() => {
                    // Redirect to the existing leaderboard page
                    window.location.href = 'pages/leaderboard.html'; 
                }, 1500);

            } else {
                feedbackMsg.innerHTML = '❌ AUTH_FAIL: Invalid Codename or Passkey. Retrying uplink...';
                feedbackMsg.className = 'feedback-message error show';
                usernameInput.value = '';
                passwordInput.value = '';
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                // Hide feedback after timeout
                setTimeout(() => {
                    feedbackMsg.classList.remove('show');
                }, 5000);
            }
        }, 2000); 
    });
});