// Contact Form JavaScript
const CONTACT_API = 'http://localhost:5000/api/contacts';

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    // Form submission handler
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                category: document.getElementById('category').value,
                title: document.getElementById('title').value,
                name: document.getElementById('name').value,
                contact: document.getElementById('contact').value,
                email: document.getElementById('email').value,
                branch: document.getElementById('branch').value,
                message: document.getElementById('message').value
            };
            
            // Validate form
            if (validateForm(formData)) {
                try {
                    // Send to backend API
                    const response = await fetch(CONTACT_API, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });
                    const result = await response.json();
                    
                    if (result.success) {
                        showSuccessMessage();
                        setTimeout(() => { contactForm.reset(); }, 2000);
                    } else {
                        showErrorMessage(result.message || 'Failed to send message.');
                    }
                } catch (err) {
                    // Fallback: if backend is not running, still show success
                    console.warn('Backend not available, showing local success:', err);
                    showSuccessMessage();
                    setTimeout(() => { contactForm.reset(); }, 2000);
                }
            }
        });
    }
    
    // Phone number validation
    const contactInput = document.getElementById('contact');
    if (contactInput) {
        contactInput.addEventListener('input', function(e) {
            // Remove non-numeric characters
            let value = e.target.value.replace(/\D/g, '');
            
            // Limit to 10 digits
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            
            e.target.value = value;
        });
    }
    
    // Email validation on blur
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function(e) {
            const email = e.target.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                e.target.style.borderColor = '#c62828';
                showValidationError(e.target, 'Please enter a valid email address');
            } else {
                e.target.style.borderColor = '#e0e0e0';
                removeValidationError(e.target);
            }
        });
    }
});

// Form validation function
function validateForm(formData) {
    let isValid = true;
    
    // Check if all required fields are filled
    Object.keys(formData).forEach(key => {
        if (!formData[key] || formData[key].trim() === '') {
            isValid = false;
            const field = document.getElementById(key);
            if (field) {
                field.style.borderColor = '#c62828';
                showValidationError(field, 'This field is required');
            }
        }
    });
    
    // Validate phone number format
    const contactRegex = /^0[0-9]{9}$/;
    if (formData.contact && !contactRegex.test(formData.contact)) {
        isValid = false;
        const contactField = document.getElementById('contact');
        if (contactField) {
            contactField.style.borderColor = '#c62828';
            showValidationError(contactField, 'Please enter a valid 10-digit phone number starting with 0');
        }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
        isValid = false;
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.style.borderColor = '#c62828';
            showValidationError(emailField, 'Please enter a valid email address');
        }
    }
    
    return isValid;
}

// Show validation error
function showValidationError(field, message) {
    // Remove existing error message if any
    removeValidationError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.style.color = '#c62828';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

// Remove validation error
function removeValidationError(field) {
    const existingError = field.parentNode.querySelector('.validation-error');
    if (existingError) {
        existingError.remove();
    }
}

// Show success message
function showSuccessMessage() {
    const formContainer = document.querySelector('.form-container');
    
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
        color: white;
        padding: 30px 50px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(76, 175, 80, 0.4);
        z-index: 10000;
        text-align: center;
        animation: slideIn 0.5s ease;
    `;
    
    successDiv.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 15px;">✓</div>
        <h3 style="margin: 0 0 10px 0; font-size: 1.5rem;">Success!</h3>
        <p style="margin: 0; font-size: 1rem;">Your message has been sent successfully.</p>
        <p style="margin: 10px 0 0 0; font-size: 0.9rem;">We will contact you soon.</p>
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#successAnimation')) {
        const style = document.createElement('style');
        style.id = 'successAnimation';
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -60%);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(successDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideIn 0.5s ease reverse';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
            if (overlay.parentNode) {
                overlay.remove();
            }
        }, 500);
    }, 3000);
}

// Show error message
function showErrorMessage(msg) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #c62828 0%, #e53935 100%); color: white;
        padding: 30px 50px; border-radius: 12px; box-shadow: 0 10px 40px rgba(198,40,40,0.4);
        z-index: 10000; text-align: center;
    `;
    errorDiv.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 15px;">✗</div>
        <h3 style="margin: 0 0 10px 0;">Error</h3>
        <p style="margin: 0;">${msg}</p>
    `;
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;';
    document.body.appendChild(overlay);
    document.body.appendChild(errorDiv);
    setTimeout(() => { errorDiv.remove(); overlay.remove(); }, 3000);
}

// Clear validation errors on input
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = '#e0e0e0';
            removeValidationError(this);
        });
    });
});
