// Initialize Swiper for image gallery
const initializeGallery = () => {
  const swiper = new Swiper(".swiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
};

// Handle Video Tour Section
const handleVideoSection = () => {
  const videoSection = document.getElementById("videoTourSection");
  const videoUrl = videoSection.querySelector("iframe").src;

  // Show/hide video section based on video URL
  if (videoUrl && videoUrl !== "https://www.youtube.com/embed/your-video-id") {
    videoSection.style.display = "block";
  } else {
    videoSection.style.display = "none";
  }
};

// Handle Bookmark/Save functionality
const handleBookmark = async () => {
  const bookmarkBtn = document.getElementById("bookmarkBtn");
  const bookmarkIcon = bookmarkBtn.querySelector("i");
  const propertyId =
    document.getElementById("property_id")?.value ||
    new URLSearchParams(window.location.search).get("id");

  if (!propertyId) {
    console.error("No property ID found");
    return;
  }

  // Check if property is already saved in database
  try {
    const response = await fetch("backend/fetch-save-properties.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        property_id: parseInt(propertyId),
      }),
    });

    const data = await response.json();
    const isSaved = data.status === "success" && data.is_saved === 1;

    // Update initial button state based on database
    if (isSaved) {
      bookmarkIcon.classList.replace("far", "fas");
    } else {
      bookmarkIcon.classList.replace("fas", "far");
    }
  } catch (err) {
    console.error("Failed to check save status:", err);
    // Keep default state (outline bookmark)
    bookmarkIcon.classList.replace("fas", "far");
  }

  bookmarkBtn.addEventListener("click", async () => {
    const isSaved = bookmarkIcon.classList.contains("fas");

    try {
      const response = await fetch("backend/save-property.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          property_id: parseInt(propertyId),
          action: isSaved ? "remove" : "add",
        }),
      });

      const data = await response.json();

      // Check if user is not logged in
      if (data.status === "error" && data.message === "User not logged in") {
        showToast("Please login to save properties", "error");
        return;
      }

      if (data.status === "success") {
        // Update UI based on backend response
        if (data.is_saved === 1) {
          // Property is now saved
          bookmarkIcon.classList.replace("far", "fas");
          showToast("Property saved successfully");
        } else {
          // Property is now unsaved
          bookmarkIcon.classList.replace("fas", "far");
          showToast("Property removed from saved properties");
        }
      } else {
        showToast(data.message || "Failed to update saved property", "error");
      }
    } catch (err) {
      console.error("Failed to toggle save:", err);
      showToast("An error occurred while saving the property", "error");
    }
  });
};

// Handle Report Modal
const handleReport = () => {
  const reportBtn = document.getElementById("reportBtn");

  if (!reportBtn) {
    console.log("Report button not found, skipping report functionality");
    return;
  }

  reportBtn.addEventListener("click", () => {
    // Create and show modal
    const modalHtml = `
            <div class="modal fade" id="reportModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Report Property</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="reportForm">
                                <div class="mb-3">
                                    <label class="form-label">Reason for reporting</label>
                                    <select class="form-select" required>
                                        <option value="">Select a reason</option>
                                        <option value="incorrect">Incorrect Information</option>
                                        <option value="spam">Spam</option>
                                        <option value="duplicate">Duplicate Listing</option>
                                        <option value="fraud">Potential Fraud</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Additional Details</label>
                                    <textarea class="form-control" rows="3" required></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger">Submit Report</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

    // Add modal to document if it doesn't exist
    if (!document.getElementById("reportModal")) {
      document.body.insertAdjacentHTML("beforeend", modalHtml);
    }

    // Show modal
    const reportModal = new bootstrap.Modal(
      document.getElementById("reportModal")
    );
    reportModal.show();
  });
};

// Contact Form Validation
const handleContactForm = () => {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");

  if (!form) {
    console.error("Contact form not found!");
    return;
  }

  console.log("Setting up contact form handler");

  // Enhanced real-time validation for name field (only letters and spaces, max 12 characters)
  if (nameInput) {
    // Prevent typing invalid characters
    nameInput.addEventListener("keypress", function(e) {
      const char = String.fromCharCode(e.which);
      if (!/[A-Za-z\s]/.test(char)) {
        e.preventDefault();
      }
    });
    
    // Real-time input validation
    nameInput.addEventListener("input", function(e) {
      // Remove any non-alphabetic characters and spaces
      let value = e.target.value.replace(/[^A-Za-z\s]/g, "");
      
      // Limit to 12 characters as per backend requirements
      if (value.length > 12) {
        value = value.substring(0, 12);
      }
      
      // Update the input value
      e.target.value = value;
      
      // Validate name (at least 2 characters)
      if (value.length < 2 && value.length > 0) {
        e.target.setCustomValidity("Name must be at least 2 characters long");
        e.target.classList.add("is-invalid");
      } else if (value.length >= 2) {
        e.target.setCustomValidity("");
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
      } else {
        e.target.setCustomValidity("");
        e.target.classList.remove("is-invalid", "is-valid");
      }
    });
    
    // Prevent pasting invalid characters in name field
    nameInput.addEventListener("paste", function(e) {
      setTimeout(() => {
        let value = e.target.value.replace(/[^A-Za-z\s]/g, "");
        // Ensure pasted content also respects the 12 character limit
        if (value.length > 12) {
          value = value.substring(0, 12);
        }
        e.target.value = value;
        
        // Validate name (at least 2 characters)
        if (value.length < 2 && value.length > 0) {
          e.target.setCustomValidity("Name must be at least 2 characters long");
          e.target.classList.add("is-invalid");
        } else if (value.length >= 2) {
          e.target.setCustomValidity("");
          e.target.classList.remove("is-invalid");
          e.target.classList.add("is-valid");
        } else {
          e.target.setCustomValidity("");
          e.target.classList.remove("is-invalid", "is-valid");
        }
      }, 10);
    });
    
    // Validate on blur
    nameInput.addEventListener("blur", function(e) {
      if (e.target.value.length > 0 && e.target.value.length < 2) {
        e.target.setCustomValidity("Name must be at least 2 characters long");
        e.target.classList.add("is-invalid");
      } else if (e.target.value.length >= 2) {
        e.target.setCustomValidity("");
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
      } else {
        e.target.setCustomValidity("");
        e.target.classList.remove("is-invalid", "is-valid");
      }
    });
  }

  // Enhanced real-time validation for email field
  if (emailInput) {
    emailInput.addEventListener("input", function(e) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (e.target.value && !emailRegex.test(e.target.value)) {
        e.target.setCustomValidity("Please enter a valid email address");
        e.target.classList.add("is-invalid");
        e.target.classList.remove("is-valid");
      } else if (e.target.value && emailRegex.test(e.target.value)) {
        e.target.setCustomValidity("");
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
      } else {
        e.target.setCustomValidity("");
        e.target.classList.remove("is-invalid", "is-valid");
      }
    });
    
    emailInput.addEventListener("blur", function(e) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (e.target.value && !emailRegex.test(e.target.value)) {
        e.target.setCustomValidity("Please enter a valid email address");
        e.target.classList.add("is-invalid");
        e.target.classList.remove("is-valid");
      } else if (e.target.value && emailRegex.test(e.target.value)) {
        e.target.setCustomValidity("");
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
      } else {
        e.target.setCustomValidity("");
        e.target.classList.remove("is-invalid", "is-valid");
      }
    });
  }

  // Enhanced real-time validation for phone field (only numbers, exactly 11 digits)
  if (phoneInput) {
    // Prevent typing non-numeric characters
    phoneInput.addEventListener("keypress", function(e) {
      // Allow only numbers (0-9) and backspace, delete, arrow keys
      if (e.which < 48 || e.which > 57) {
        e.preventDefault();
      }
    });
    
    // Real-time input validation
    phoneInput.addEventListener("input", function(e) {
      // Remove any non-numeric characters
      let value = e.target.value.replace(/\D/g, "");
      
      // Limit to 11 digits as per backend requirements
      if (value.length > 11) {
        value = value.substring(0, 11);
      }
      
      // Update the input value
      e.target.value = value;
      
      // Validate phone (exactly 11 digits)
      if (value.length > 0 && value.length !== 11) {
        e.target.setCustomValidity("Phone number must be exactly 11 digits");
        e.target.classList.add("is-invalid");
        e.target.classList.remove("is-valid");
      } else if (value.length === 11 && /^[0-9]{11}$/.test(value)) {
        e.target.setCustomValidity("");
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
      } else {
        e.target.setCustomValidity("");
        e.target.classList.remove("is-invalid", "is-valid");
      }
    });
    
    // Prevent pasting invalid characters in phone field
    phoneInput.addEventListener("paste", function(e) {
      setTimeout(() => {
        let value = e.target.value.replace(/\D/g, "");
        // Ensure pasted content also respects the 11 digit limit
        if (value.length > 11) {
          value = value.substring(0, 11);
        }
        e.target.value = value;
        
        // Validate phone (exactly 11 digits)
        if (value.length > 0 && value.length !== 11) {
          e.target.setCustomValidity("Phone number must be exactly 11 digits");
          e.target.classList.add("is-invalid");
          e.target.classList.remove("is-valid");
        } else if (value.length === 11 && /^[0-9]{11}$/.test(value)) {
          e.target.setCustomValidity("");
          e.target.classList.remove("is-invalid");
          e.target.classList.add("is-valid");
        } else {
          e.target.setCustomValidity("");
          e.target.classList.remove("is-invalid", "is-valid");
        }
      }, 10);
    });
    
    // Validate on blur
    phoneInput.addEventListener("blur", function(e) {
      if (e.target.value.length > 0 && e.target.value.length !== 11) {
        e.target.setCustomValidity("Phone number must be exactly 11 digits");
        e.target.classList.add("is-invalid");
        e.target.classList.remove("is-valid");
      } else if (e.target.value.length === 11 && /^[0-9]{11}$/.test(e.target.value)) {
        e.target.setCustomValidity("");
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
      } else {
        e.target.setCustomValidity("");
        e.target.classList.remove("is-invalid", "is-valid");
      }
    });
  }

  // Enhanced real-time validation for message field
  if (messageInput) {
    messageInput.addEventListener("input", function(e) {
      // Validate message (at least 10 characters, max 500 characters)
      if (e.target.value.length > 0 && e.target.value.length < 10) {
        e.target.setCustomValidity("Message must be at least 10 characters long");
        e.target.classList.add("is-invalid");
        e.target.classList.remove("is-valid");
      } else if (e.target.value.length > 500) {
        e.target.setCustomValidity("Message must be no more than 500 characters");
        e.target.classList.add("is-invalid");
        e.target.classList.remove("is-valid");
      } else if (e.target.value.length >= 10 && e.target.value.length <= 500) {
        e.target.setCustomValidity("");
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
      } else {
        e.target.setCustomValidity("");
        e.target.classList.remove("is-invalid", "is-valid");
      }
    });
    
    messageInput.addEventListener("blur", function(e) {
      if (e.target.value.length > 0 && e.target.value.length < 10) {
        e.target.setCustomValidity("Message must be at least 10 characters long");
        e.target.classList.add("is-invalid");
        e.target.classList.remove("is-valid");
      } else if (e.target.value.length > 500) {
        e.target.setCustomValidity("Message must be no more than 500 characters");
        e.target.classList.add("is-invalid");
        e.target.classList.remove("is-valid");
      } else if (e.target.value.length >= 10 && e.target.value.length <= 500) {
        e.target.setCustomValidity("");
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
      } else {
        e.target.setCustomValidity("");
        e.target.classList.remove("is-invalid", "is-valid");
      }
    });
  }

  form.addEventListener("submit", async (e) => {
    console.log("Form submission intercepted");
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    // Trigger validation for all fields
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    
    // Validate all fields before submission
    let isValid = true;
    
    // Validate name
    if (!name) {
      document.getElementById("name").setCustomValidity("Please enter your name");
      isValid = false;
    } else if (name.length < 2) {
      document.getElementById("name").setCustomValidity("Name must be at least 2 characters long");
      isValid = false;
    } else if (name.length > 12) {
      document.getElementById("name").setCustomValidity("Name must be no more than 12 characters");
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      document.getElementById("name").setCustomValidity("Name should only contain letters and spaces");
      isValid = false;
    } else {
      document.getElementById("name").setCustomValidity("");
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      document.getElementById("email").setCustomValidity("Please enter your email address");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      document.getElementById("email").setCustomValidity("Please enter a valid email address");
      isValid = false;
    } else {
      document.getElementById("email").setCustomValidity("");
    }
    
    // Validate phone
    if (!phone) {
      document.getElementById("phone").setCustomValidity("Please enter your phone number");
      isValid = false;
    } else if (phone.length !== 11) {
      document.getElementById("phone").setCustomValidity("Phone number must be exactly 11 digits");
      isValid = false;
    } else if (!/^[0-9]{11}$/.test(phone)) {
      document.getElementById("phone").setCustomValidity("Phone number must contain only digits");
      isValid = false;
    } else {
      document.getElementById("phone").setCustomValidity("");
    }
    
    // Validate message
    if (!message) {
      document.getElementById("message").setCustomValidity("Please enter your message");
      isValid = false;
    } else if (message.length < 10) {
      document.getElementById("message").setCustomValidity("Message must be at least 10 characters long");
      isValid = false;
    } else if (message.length > 500) {
      document.getElementById("message").setCustomValidity("Message must be no more than 500 characters");
      isValid = false;
    } else {
      document.getElementById("message").setCustomValidity("");
    }
    
    // If form is not valid, show validation errors
    if (!isValid) {
      e.stopPropagation();
      form.classList.add("was-validated");
      // Manually trigger validation display
      triggerValidationDisplay();
      return;
    }

    // If form is valid, proceed with submission
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      // Manually trigger validation display
      triggerValidationDisplay();
      return;
    }

    // Get form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
      property_id: document.getElementById("property_id").value,
    };

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
    submitBtn.disabled = true;

    try {
      // Send to backend
      const response = await fetch("backend/contact-agent.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === "success") {
        // Store the property ID before reset
        const propertyIdValue = document.getElementById("property_id").value;

        // Reset form
        form.reset();
        form.classList.remove("was-validated");

        // Restore the property ID after reset
        document.getElementById("property_id").value = propertyIdValue;

        // Show success message
        const alertHtml = `
          <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
            ${data.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
          </div>
        `;
        form.insertAdjacentHTML("beforebegin", alertHtml);

        // Show toast notification
        showToast("Message sent successfully!", "success");
      } else {
        // Show error message
        const alertHtml = `
          <div class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
            ${data.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
          </div>
        `;
        form.insertAdjacentHTML("beforebegin", alertHtml);

        // Show toast notification
        showToast(data.message, "error");
      }
    } catch (error) {
      console.error("Error sending message:", error);

      // Show error message
      const alertHtml = `
        <div class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
          An error occurred while sending your message. Please try again.
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
      `;
      form.insertAdjacentHTML("beforebegin", alertHtml);

      // Show toast notification
      showToast("An error occurred while sending your message", "error");
    } finally {
      // Reset button
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });

  // Add form reset event listener to clear validation states
  form.addEventListener("reset", function() {
    // Clear all validation classes
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach(input => {
      input.classList.remove("is-valid", "is-invalid");
      input.setCustomValidity("");
    });
    
    // Remove was-validated class
    form.classList.remove("was-validated");
    
    // Remove any existing alerts
    const existingAlerts = form.parentElement.querySelectorAll(".alert");
    existingAlerts.forEach(alert => alert.remove());
  });
};

// Function to clear validation states
const clearValidationStates = (form) => {
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach(input => {
    input.classList.remove("is-valid", "is-invalid");
    input.setCustomValidity("");
  });
  form.classList.remove("was-validated");
};

// Toast notification function
const showToast = (message, type = "success") => {
  // Check if iziToast is available (from listings page)
  if (typeof iziToast !== "undefined") {
    iziToast[type]({
      title: type === "success" ? "Success" : "Error",
      message: message,
      position: "topRight",
    });
  } else {
    // Fallback to alert if iziToast is not available
    alert(message);
  }
};

// Function to manually trigger validation display
const triggerValidationDisplay = () => {
  const form = document.getElementById("contactForm");
  if (form) {
    // Manually trigger validation display for all fields
    form.querySelectorAll("input, textarea").forEach(input => {
      input.dispatchEvent(new Event('input')); // Trigger input event
      input.dispatchEvent(new Event('blur')); // Trigger blur event
    });
  }
};

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM loaded, initializing property detail functionality");

  initializeGallery();
  handleVideoSection();
  await handleBookmark();
  handleReport();
  handleContactForm();

  // Initialize all tooltips
  const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltips.forEach((tooltip) => new bootstrap.Tooltip(tooltip));
});

// Also set up form handler immediately if DOM is already loaded
if (document.readyState === "loading") {
  // DOM is still loading, wait for DOMContentLoaded
} else {
  // DOM is already loaded, set up form handler immediately
  console.log("DOM already loaded, setting up form handler immediately");
  handleContactForm();
}
