# PropFind - Property Listing Website

PropFind is a modern property listing website that helps users find their perfect property. The platform offers a user-friendly interface for browsing, saving, and comparing properties with advanced features for both regular users and administrators.

## Features

### Frontend Features
- **Property Listings**: Browse through an extensive collection of properties with detailed information
- **Advanced Search Filters**: Filter properties by price, location, size, type, and more
- **Property Comparison**: Compare up to 3 properties side by side
- **Property Details**: View comprehensive property information with image galleries
- **Verified Listings**: Easily identify verified property listings with special badges
- **User Dashboard**: Manage saved properties, profile settings, and account information
- **Property Upload**: List your property with detailed information and images
- **Property Reviews**: Leave ratings and reviews for properties
- **Contact Agents**: Direct messaging system for property inquiries
- **Bookmark Properties**: Save properties for later viewing
- **Responsive Design**: Fully responsive website that works on all devices
- **Interactive Maps**: Google Maps integration for property locations

### Backend Features
- **User Authentication**: Secure login/signup with session management
- **Property Management**: Create, read, update, and delete property listings
- **Image Upload**: Multi-image upload for property listings
- **Database Storage**: Secure storage of property and user information
- **Admin Panel**: Comprehensive admin dashboard for site management
- **Property Verification**: Admin approval system for property listings
- **Transaction Processing**: Property purchase functionality with payment processing
- **Messaging System**: Contact form and agent messaging capabilities
- **Review System**: Property rating and review functionality
- **Referral Program**: User referral system with reward points
- **User Roles**: Different access levels for regular users and administrators

## Technical Stack

### Frontend
- HTML5
- CSS3 (with Bootstrap 5)
- JavaScript (Vanilla)
- jQuery
- AJAX
- Bootstrap 5 for UI components
- Font Awesome for icons
- Swiper.js for image galleries
- iziToast for notifications

### Backend
- PHP 7+
- MySQL/MariaDB
- Apache Server

### APIs and Services
- Google Maps API for property locations
- Email services for contact forms and notifications

## Recent Updates/Changelog

### Database Enhancements
- Added CNIC column to user profiles
- Added cardholder name column for payment processing
- Created contact messages table for user inquiries
- Set up proper database schema for property reviews

### Security Improvements
- Enhanced form validation for all user inputs
- Improved password requirements (8+ characters, uppercase, number)
- Added CNIC validation (format: XXXXX-XXXXXXX-X)
- Implemented proper session management

### UI/UX Enhancements
- Improved property detail page with better image galleries
- Enhanced contact forms with real-time validation
- Added property comparison functionality
- Improved responsive design for mobile devices
- Added verified property badges
- Enhanced property search with advanced filters

### Feature Additions
- Property review and rating system
- Direct messaging between users and property owners
- Referral program with reward points
- Property bookmarking/saving functionality
- Admin property approval system
- Transaction history tracking

## Installation & Setup

1. Clone the repository
2. Set up a local server environment (XAMPP/WAMP/MAMP)
3. Import the database schema
4. Update database connection settings in `backend/db.php`
5. Open index.php in your web browser
6. Start browsing properties!

### Prerequisites
- PHP 7.0 or higher
- MySQL 5.6 or higher
- Apache server
- Composer (for any PHP dependencies)

### Database Setup
1. Create a new database in MySQL
2. Import the SQL files from the `backend` directory
3. Update the database credentials in `backend/db.php`

## User Dashboard Features

### Property Management
- View all properties posted by the user
- Edit existing property listings
- Delete property listings
- Track property status (active/pending/sold)

### Saved Properties
- View all bookmarked properties
- Remove properties from saved list
- Quick access to property details

### Profile Management
- Update personal information (name, email, phone, location)
- Change profile picture
- Update CNIC information
- Modify account password

### Transaction History
- View all property purchases
- See transaction details and history
- Track payment status

### Referral Program
- View referral code
- Track referral rewards and points
- See list of referred users

## Admin Dashboard Features

### Property Management
- View all properties in the system
- Approve or reject property listings
- Edit any property details
- Delete properties
- Filter properties by status, type, or location

### User Management
- View all registered users
- Delete user accounts
- Modify user roles
- Track user activity

### Transaction Management
- View all transactions in the system
- Track property sales
- Monitor payment processing

### Property Verification
- Review property submissions
- Approve or reject listings
- Verify property documents

### Analytics Dashboard
- View site statistics
- Monitor user registrations
- Track property listings and sales
- Review revenue metrics

## Folder Structure

```
Property-Finder/
├── backend/
│   ├── add-review.php
│   ├── approve-property.php
│   ├── change-password.php
│   ├── check-session.php
│   ├── contact-agent.php
│   ├── contact-form.php
│   ├── create_contact_messages_table.sql
│   ├── create_contact_table.sql
│   ├── create_messages_table.sql
│   ├── csrf.php
│   ├── db.php
│   ├── delete-property.php
│   ├── delete-user.php
│   ├── edit-property-details.php
│   ├── fetch-all-properties.php
│   ├── fetch-dashboard-details.php
│   ├── fetch-latest-properties.php
│   ├── fetch-messages.php
│   ├── fetch-referral-dashboard.php
│   ├── fetch-referral-stats.php
│   ├── fetch-reviews.php
│   ├── fetch-save-properties.php
│   ├── fetch-user-properties.php
│   ├── fetch-user-saved-properties.php
│   ├── fetch-users.php
│   ├── forgot-password.php
│   ├── handle-buy-request.php
│   ├── login.php
│   ├── logout.php
│   ├── property-buy-request.php
│   ├── property-upload.php
│   ├── reset-password.php
│   ├── save-property.php
│   ├── send-message.php
│   ├── signup.php
│   ├── toggle-listing-status.php
│   ├── toggle-property-status.php
│   ├── update-last-active.php
│   └── update-user-details.php
├── css/
│   ├── about.css
│   ├── admin.css
│   ├── auth.css
│   ├── chat.css
│   ├── compare.css
│   ├── contact.css
│   ├── dashboard.css
│   ├── listings.css
│   ├── properties.css
│   ├── property-detail.css
│   ├── report.css
│   ├── reviews.css
│   ├── saved-properties.css
│   ├── settings.css
│   ├── styles.css
│   ├── upload-property.css
│   └── user-management.css
├── dashboard/
│   ├── dashboard.php
│   ├── logout.php
│   └── inc/
├── images/
│   ├── properties/
│   └── user.png
├── inc/
│   ├── footer.php
│   └── header.php
├── js/
│   ├── admin.js
│   ├── auth.js
│   ├── chat.js
│   ├── compare.js
│   ├── contact.js
│   ├── dashboard.js
│   ├── form-validation.js
│   ├── listings.js
│   ├── login.js
│   ├── main.js
│   ├── notifications.js
│   ├── properties.js
│   ├── property-buy.js
│   ├── property-detail.js
│   ├── reviews.js
│   ├── saved-properties.js
│   ├── script.js
│   └── upload-property.js
├── superadmin/
│   ├── all-properties.php
│   ├── all-users.php
│   ├── approve-property.php
│   ├── buy-requests.php
│   ├── delete-user.php
│   ├── index.php
│   ├── login.php
│   ├── reject-property.php
│   ├── view-property-detail.php
│   ├── view-user.php
│   └── inc/
├── uploads/
│   └── profile-pic/
├── about.php
├── ajax.js
├── api.php
├── chat.php
├── compare.php
├── contact.php
├── listings.php
├── login.php
├── logout.php
├── referral.php
├── reset-password.php
├── saved-properties.php
├── search-results.php
├── settings.php
├── signup.php
├── upload-property.php
└── view-property-detail.php
```

## Usage Examples

### Property Search
Users can search for properties using various filters:
- Price range (PKR)
- Property type (House, Plot, Commercial, Apartment)
- Location/City
- Area size

### Property Upload
Users can list their properties by providing:
- Property title and description
- Price and location details
- Area size with unit (Marla)
- Property images (up to 5)
- CNIC information and documents
- Ownership documents
- Google Maps location link

### Admin Property Approval
Administrators can manage property listings through the admin panel:
- Review pending property submissions
- Approve or reject listings
- View all properties in the system
- Edit property details if needed

## Contributors / Credits

This project was developed by a dedicated team of developers. Special thanks to all contributors who have helped improve PropFind.

## License

This project is licensed under the MIT License - see the LICENSE file for details.