document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('agentContactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            
            // Validate name (only letters and spaces)
            const nameRegex = /^[A-Za-z\s]+$/;
            if (!nameRegex.test(name)) {
                alert('Please enter a valid name (letters and spaces only)');
                e.preventDefault();
                document.getElementById('name').focus();
                return;
            }
            
            // Validate phone (exactly 11 digits)
            const phoneRegex = /^\d{11}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number (exactly 11 digits)');
                e.preventDefault();
                document.getElementById('phone').focus();
                return;
            }
            
            // If we get here, the form is valid
            // You can add additional processing here if needed
        });
    }
});