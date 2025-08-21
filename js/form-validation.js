// Comprehensive Form Validation System
document.addEventListener('DOMContentLoaded', function() {
    // Initialize validation for all forms
    initializeUploadPropertyValidation();
    initializeContactFormValidation();
    initializeLoginFormValidation();
    initializeSignupFormValidation();
    initializeGeneralContactFormValidation();
    initializeForgotPasswordFormValidation();
    initializeResetPasswordFormValidation();
    
    // Hide all error messages by default
    hideAllErrorMessages();
});

// Hide all error messages by default
function hideAllErrorMessages() {
    const allErrorMessages = document.querySelectorAll('.invalid-feedback');
    allErrorMessages.forEach(error => {
        error.style.display = 'none';
    });
}

// Upload Property Form Validation
function initializeUploadPropertyValidation() {
    const form = document.getElementById('propertyUploadForm');
    if (!form) return;

    const validationRules = {
        propertyTitle: {
            validate: (value) => {
                if (!value.trim()) return 'Please enter a title (10-100 characters)';
                if (value.trim().length < 10) return 'Title must be at least 10 characters';
                if (value.trim().length > 100) return 'Title must not exceed 100 characters';
                return null;
            }
        },
        price: {
            validate: (value) => {
                if (!value) return 'Please enter a price';
                if (value < 10000) return 'Price must be at least 10,000 PKR';
                if (value > 500000000) return 'Price must not exceed 500,000,000 PKR';
                if (value.toString().length < 5) return 'Price must be at least 5 digits';
                return null;
            }
        },
        propertyType: {
            validate: (value) => {
                if (!value) return 'Please select a property type';
                return null;
            }
        },
        area: {
            validate: (value) => {
                if (!value) return 'Please enter an area';
                if (value < 1) return 'Please enter a valid area (minimum 1 Marla)';
                return null;
            }
        },
        unit: {
            validate: (value) => {
                if (!value) return 'Please select a unit';
                return null;
            }
        },
        city: {
            validate: (value) => {
                if (!value) return 'Please select a city';
                return null;
            }
        },
        cnicNumber: {
            validate: (value) => {
                if (!value.trim()) return 'Please enter your CNIC number';
                const cnicPattern = /^\d{5}-\d{7}-\d$/;
                if (!cnicPattern.test(value.trim())) return 'Please enter a valid CNIC number (format: 12345-1234567-1)';
                return null;
            }
        },
        description: {
            validate: (value) => {
                if (!value.trim()) return 'Please provide a description';
                return null;
            }
        },
        propertyImages: {
            validate: (input) => {
                if (!input.files || input.files.length === 0) return 'Please upload at least one image';
                return null;
            }
        },
        cnicImage: {
            validate: (input) => {
                if (!input.files || input.files.length === 0) return 'Please upload your CNIC image';
                const file = input.files[0];
                if (!file.type.startsWith('image/')) return 'Please upload an image file for CNIC';
                return null;
            }
        },
        ownershipDocs: {
            validate: (input) => {
                if (!input.files || input.files.length === 0) return 'Please upload ownership documents';
                const file = input.files[0];
                const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'text/plain'];
                if (!allowedTypes.includes(file.type)) return 'Please upload a valid document file (PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, or TXT)';
                return null;
            }
        },
        link: {
            validate: (value) => {
                if (!value.trim()) return 'Please provide a map link';
                if (!value.includes('google.com/maps/embed')) return 'Please provide a valid Google Maps embed iframe link';
                return null;
            }
        }
    };

    // Add validation to each field
    Object.keys(validationRules).forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (!field) return;

        // Validation on blur
        field.addEventListener('blur', () => {
            validateField(field, validationRules[fieldName]);
        });

        // Validation on input (for real-time feedback)
        if (field.type !== 'file') {
            field.addEventListener('input', () => {
                if (field.classList.contains('is-invalid')) {
                    validateField(field, validationRules[fieldName]);
                }
            });
        }
    });

    // Form submit validation
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        Object.keys(validationRules).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (!field) return;
            
            if (!validateField(field, validationRules[fieldName])) {
                isValid = false;
            }
        });

        if (!isValid) {
            e.preventDefault();
            showToast('Please fix the validation errors before submitting', 'error');
        }
    });
}

// Contact Agent Form Validation
function initializeContactFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const validationRules = {
        name: {
            validate: (value) => {
                if (!value.trim()) return 'Please enter your name';
                if (!/^[A-Za-z\s]+$/.test(value.trim())) return 'Please enter a valid name (letters only, max 12 characters)';
                if (value.trim().length > 12) return 'Name must not exceed 12 characters';
                return null;
            }
        },
        email: {
            validate: (value) => {
                if (!value.trim()) return 'Please enter an email address';
                if (!value.includes('@')) return 'Please enter a valid email address containing "@"';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address';
                return null;
            }
        },
        phone: {
            validate: (value) => {
                if (!value.trim()) return 'Please enter a phone number';
                if (!/^\d{11}$/.test(value.replace(/\D/g, ''))) return 'Please enter a valid phone number (exactly 11 digits)';
                return null;
            }
        },
        message: {
            validate: (value) => {
                if (!value.trim()) return 'Please enter your message';
                if (value.trim().length < 10) return 'Please enter your message (minimum 10 characters)';
                return null;
            }
        }
    };

    // Add validation to each field
    Object.keys(validationRules).forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (!field) return;

        // Validation on blur
        field.addEventListener('blur', () => {
            validateField(field, validationRules[fieldName]);
        });

        // Validation on input (for real-time feedback)
        field.addEventListener('input', () => {
            if (field.classList.contains('is-invalid')) {
                validateField(field, validationRules[fieldName]);
            }
        });
    });

    // Form submit validation
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        Object.keys(validationRules).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (!field) return;
            
            if (!validateField(field, validationRules[fieldName])) {
                isValid = false;
            }
        });

        if (!isValid) {
            e.preventDefault();
            showToast('Please fix the validation errors before submitting', 'error');
        }
    });
}

// Login Form Validation
function initializeLoginFormValidation() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    const validationRules = {
        email: {
            validate: (value) => {
                if (!value.trim()) return 'Please enter your email address';
                if (!value.includes('@')) return 'Please enter a valid email address';
                return null;
            }
        },
        password: {
            validate: (value) => {
                if (!value.trim()) return 'Please enter your password';
                if (value.trim().length < 6) return 'Password must be at least 6 characters';
                return null;
            }
        }
    };

    // Add validation to each field
    Object.keys(validationRules).forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (!field) return;

        // Validation on blur
        field.addEventListener('blur', () => {
            validateField(field, validationRules[fieldName]);
        });

        // Validation on input (for real-time feedback)
        field.addEventListener('input', () => {
            if (field.classList.contains('is-invalid')) {
                validateField(field, validationRules[fieldName]);
            }
        });
    });

    // Form submit validation
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        Object.keys(validationRules).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (!field) return;
            
            if (!validateField(field, validationRules[fieldName])) {
                isValid = false;
            }
        });

        if (!isValid) {
            e.preventDefault();
            showToast('Please fix the validation errors before submitting', 'error');
        }
    });
}

// Signup Form Validation
function initializeSignupFormValidation() {
    const form = document.getElementById('signupForm');
    if (!form) return;

    const validationRules = {
        name: {
            validate: (value) => {
                if (!value.trim()) return 'Please enter your name';
                if (!/^[A-Za-z\s]+$/.test(value.trim())) return 'Name should only contain letters and spaces';
                if (value.trim().length < 2) return 'Name must be at least 2 characters';
                return null;
            }
        },
        email: {
            validate: (value) => {
                if (!value.trim()) return 'Please enter your email address';
                if (!value.includes('@')) return 'Please enter a valid email address';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address';
                return null;
            }
        },
        phone: {
            validate: (value) => {
                if (!value.trim()) return 'Please enter your phone number';
                if (!/^\d{4}-\d{7}$/.test(value.trim())) return 'Please enter a valid phone number (format: 0300-1234567)';
                return null;
            }
        },
        location: {
            validate: (value) => {
                if (!value.trim()) return 'Please enter your location';
                return null;
            }
        },
        cnic: {
            validate: (value) => {
                if (!value.trim()) return 'Please enter your CNIC number';
                const cnicPattern = /^\d{5}-\d{7}-\d$/;
                if (!cnicPattern.test(value.trim())) return 'Please enter a valid CNIC number (format: 12345-1234567-1)';
                return null;
            }
        },
        role: {
            validate: (value) => {
                if (!value) return 'Please select a role';
                return null;
            }
        },
        password: {
            validate: (value) => {
                if (!value.trim()) return 'Please enter a password';
                if (value.trim().length < 6) return 'Password must be at least 6 characters';
                return null;
            }
        },
        confirmPassword: {
            validate: (value) => {
                const password = document.getElementById('password').value;
                if (!value.trim()) return 'Please confirm your password';
                if (value !== password) return 'Passwords do not match';
                return null;
            }
        }
    };

    // Add validation to each field
    Object.keys(validationRules).forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (!field) return;

        // Validation on blur
        field.addEventListener('blur', () => {
            validateField(field, validationRules[fieldName]);
        });

        // Validation on input (for real-time feedback)
        field.addEventListener('input', () => {
            if (field.classList.contains('is-invalid')) {
                validateField(field, validationRules[fieldName]);
            }
        });
    });

    // Form submit validation
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        Object.keys(validationRules).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (!field) return;
            
            if (!validateField(field, validationRules[fieldName])) {
                isValid = false;
            }
        });

        if (!isValid) {
            e.preventDefault();
            showToast('Please fix the validation errors before submitting', 'error');
        }
    });
}

// General Contact Form Validation
function initializeGeneralContactFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const validationRules = {
        name: {
            validate: (value) => {
                if (!value.trim()) return 'Please enter your name';
                if (!/^[A-Za-z\s]+$/.test(value.trim())) return 'Name should only contain letters and spaces';
                return null;
            }
        },
        email: {
            validate: (value) => {
                if (!value.trim()) return 'Please enter your email address';
                if (!value.includes('@')) return 'Please enter a valid email address';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address';
                return null;
            }
        },
        message: {
            validate: (value) => {
                if (!value.trim()) return 'Please enter your message';
                if (value.trim().length < 10) return 'Message must be at least 10 characters';
                return null;
            }
        }
    };

    // Add validation to each field
    Object.keys(validationRules).forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (!field) return;

        // Validation on blur
        field.addEventListener('blur', () => {
            validateField(field, validationRules[fieldName]);
        });

        // Validation on input (for real-time feedback)
        field.addEventListener('input', () => {
            if (field.classList.contains('is-invalid')) {
                validateField(field, validationRules[fieldName]);
            }
        });
    });

    // Form submit validation
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        Object.keys(validationRules).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (!field) return;
            
            if (!validateField(field, validationRules[fieldName])) {
                isValid = false;
            }
        });

        if (!isValid) {
            e.preventDefault();
    // Error popup removed

        }
    });
}

// Forgot Password Form Validation
function initializeForgotPasswordFormValidation() {
    const form = document.getElementById('forgotPasswordForm');
    if (!form) return;

    const validationRules = {
        email: {
            validate: (value) => {
                if (!value.trim()) return 'Please enter your email address';
                if (!value.includes('@')) return 'Please enter a valid email address';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address';
                return null;
            }
        }
    };

    // Add validation to each field
    Object.keys(validationRules).forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (!field) return;

        // Validation on blur
        field.addEventListener('blur', () => {
            validateField(field, validationRules[fieldName]);
        });

        // Validation on input (for real-time feedback)
        field.addEventListener('input', () => {
            if (field.classList.contains('is-invalid')) {
                validateField(field, validationRules[fieldName]);
            }
        });
    });

    // Form submit validation
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        Object.keys(validationRules).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (!field) return;
            
            if (!validateField(field, validationRules[fieldName])) {
                isValid = false;
            }
        });

        if (!isValid) {
            e.preventDefault();
            showToast('Please fix the validation errors before submitting', 'error');
        }
    });
}

// Reset Password Form Validation
function initializeResetPasswordFormValidation() {
    const form = document.getElementById('resetPasswordForm');
    if (!form) return;

    const validationRules = {
        password: {
            validate: (value) => {
                if (!value.trim()) return 'Please enter a new password';
                if (value.trim().length < 8) return 'Password must be at least 8 characters';
                return null;
            }
        },
        confirmPassword: {
            validate: (value) => {
                const password = document.getElementById('password').value;
                if (!value.trim()) return 'Please confirm your password';
                if (value !== password) return 'Passwords do not match';
                return null;
            }
        }
    };

    // Add validation to each field
    Object.keys(validationRules).forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (!field) return;

        // Validation on blur
        field.addEventListener('blur', () => {
            validateField(field, validationRules[fieldName]);
        });

        // Validation on input (for real-time feedback)
        field.addEventListener('input', () => {
            if (field.classList.contains('is-invalid')) {
                validateField(field, validationRules[fieldName]);
            }
        });
    });

    // Form submit validation
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        Object.keys(validationRules).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (!field) return;
            
            if (!validateField(field, validationRules[fieldName])) {
                isValid = false;
            }
        });

        if (!isValid) {
            e.preventDefault();
            showToast('Please fix the validation errors before submitting', 'error');
        }
    });
}

// Generic field validation function
function validateField(field, rule) {
    const value = field.type === 'file' ? field : field.value;
    const errorMessage = rule.validate(value);
    
    if (errorMessage) {
        // Show error
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        
        // Update and show error message
        const feedbackElement = field.parentNode.querySelector('.invalid-feedback');
        if (feedbackElement) {
            feedbackElement.textContent = errorMessage;
            feedbackElement.style.display = 'block';
        }
        
        return false; // Invalid
    } else {
        // Hide error
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
        
        // Hide error message
        const feedbackElement = field.parentNode.querySelector('.invalid-feedback');
        if (feedbackElement) {
            feedbackElement.style.display = 'none';
        }
        
        return true; // Valid
    }
}

// Toast notification function (if not already defined)
function showToast(message, type = 'info') {
    // Check if toast container exists, if not create one
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 350px;
        `;
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    toast.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    toastContainer.appendChild(toast);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 5000);
}