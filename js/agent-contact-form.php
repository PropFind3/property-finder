<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agent Contact Form</title>
</head>
<body>
    <form id="agentContactForm" action="submit_form.php" method="POST">
        <div>
            <label for="name">Name:</label>
            <input 
                type="text" 
                id="name" 
                name="name" 
                oninput="validateName(this)"
                pattern="[A-Za-z\s]+"
                title="Name should only contain letters and spaces"
                required>
        </div>
        
        <div>
            <label for="phone">Phone:</label>
            <input 
                type="tel" 
                id="phone" 
                name="phone" 
                oninput="validatePhone(this)"
                maxlength="11"
                pattern="[0-9]{11}"
                title="Phone number should be exactly 11 digits"
                required>
        </div>
        
        <button type="submit">Submit</button>
    </form>

    <script>
        function validateName(input) {
            // Allow only letters and spaces
            input.value = input.value.replace(/[^A-Za-z\s]/g, '');
        }
        
        function validatePhone(input) {
            // Allow only digits
            input.value = input.value.replace(/[^0-9]/g, '');
            
            // Limit to 11 digits
            if (input.value.length > 11) {
                input.value = input.value.slice(0, 11);
            }
        }
    </script>
    
    <script src="form-validation.js"></script>
</body>
</html>