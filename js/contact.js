document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const feedbackMsg = document.getElementById('form-feedback');
    const submitBtn = document.querySelector('.btn-submit');
    const originalBtnText = submitBtn.innerHTML;

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop page reload

            // 1. UI Loading State
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            feedbackMsg.className = 'feedback-message'; // Reset classes

            // 2. Simulate API Call (Wait 1.5 seconds)
            setTimeout(() => {
                // 3. Success State
                feedbackMsg.textContent = "✅ Message Sent Successfully! We'll get back to you soon.";
                feedbackMsg.classList.add('success');
                
                // Reset Form
                contactForm.reset();
                
                // Reset Button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;

                // Hide message after 5 seconds
                setTimeout(() => {
                    feedbackMsg.style.opacity = '0';
                    setTimeout(() => {
                        feedbackMsg.className = 'feedback-message';
                        feedbackMsg.style.opacity = '1'; // Reset for next time
                    }, 300);
                }, 5000);

            }, 1500);
        });
    }
});