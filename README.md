# GDGoC APSIT Club Website

Welcome to the GDGoC APSIT Club Website project! This repository contains both the frontend and backend components of the application, built using Next.js and Express.js, respectively. The website serves as a central hub for the club's activities, including event management, community interaction, and resource sharing.

## Table of Contents

- [Requirements](#requirements)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Requirements

- Node.js (version 14.x or later)
- npm (Node Package Manager) or Yarn

## Folder Structure

### Frontend

```plaintext
frontend
├── .eslintrc.json                // ESLint configuration for code quality and style consistency
├── components.json               // Config file for managing components, possibly for CLI or custom setup
├── jsconfig.json                 // JavaScript configuration for module resolution and paths
├── next.config.mjs               // Next.js configuration file for server settings, routing, etc.
├── package-lock.json             // Auto-generated file to lock dependencies' versions
├── package.json                  // Lists project dependencies and scripts
├── postcss.config.mjs            // Configuration for PostCSS, used in styling
├── public                        // Public assets, accessible directly in the browser
│   ├── favicon.ico               // Favicon for the website
│   ├── gdg-logo.png              // Logo image for GDG, possibly used on the site
│   └── placeholder.svg           // Placeholder image for empty states or missing images
├── README.md                     // Documentation for project setup and usage
├── src                           // Source folder for main application code
│   ├── app                       // Main app directory following Next.js App Router
│   │   ├── community
│   │   │   └── page.js           // Page for community section, handles community-related content
│   │   ├── events
│   │   │   └── page.js           // Page for events section, displays event details
│   │   ├── fonts                 // Custom fonts used in the app
│   │   │   ├── GeistMonoVF.woff  // Geist Mono font
│   │   │   └── GeistVF.woff      // Geist font
│   │   ├── globals.css           // Global styles for the entire app
│   │   ├── layout.js             // Global layout component, usually wraps all pages
│   │   ├── page.js               // Main entry page, typically the homepage or index
│   │   ├── profile
│   │   │   └── page.js           // Page for user profile section
│   │   ├── recognition
│   │   │   └── page.js           // Page for recognition section, showcasing achievements
│   │   └── resources
│   │       └── page.js           // Page for resources section, providing tutorials and guides
│   ├── components                // Reusable UI components for app sections
│   │   ├── community-page.jsx    // Component for rendering community page content
│   │   ├── events-page.jsx       // Component for events page content
│   │   ├── homepage.jsx          // Component for homepage content
│   │   ├── navbar.jsx            // Navbar component for app navigation
│   │   ├── profile-page.jsx      // Component for profile page content
│   │   ├── recognition-page.jsx  // Component for recognition page content
│   │   ├── resources-page.jsx    // Component for resources page content
│   │   └── ui                    // Collection of smaller UI components
│   │       ├── accordion.jsx     // Accordion component, likely for expanding/collapsing content
│   │       ├── badge.jsx         // Badge component, possibly for member achievements
│   │       ├── button.jsx        // Button component
│   │       ├── calendar.jsx      // Calendar component, likely for event dates
│   │       ├── card.jsx          // Card component for content display
│   │       ├── input.jsx         // Input field component for forms
│   │       ├── progress.jsx      // Progress bar component, possibly for tracking achievements
│   │       ├── select.jsx        // Select dropdown component
│   │       ├── sheet.jsx         // Sheet component, maybe a modal or overlay
│   │       ├── table.jsx         // Table component for displaying tabular data
│   │       └── tabs.jsx          // Tabs component for navigating between sections
│   └── lib                       // Utility functions and helper modules
│       └── utils.js              // Utility functions used across the frontend app
└── tailwind.config.js            // Tailwind CSS configuration
```

### Backend

```plaintext
backend
├── .env                          // Environment variables for sensitive information like database URIs
├── package-lock.json             // Auto-generated file to lock dependencies' versions
├── package.json                  // Lists project dependencies and scripts
└── src                           // Source folder for backend code
   ├── app.js                    // Main app setup, initializes Express and middleware
   ├── config
   │   └── db.js                 // Database configuration file for connecting to MongoDB
   ├── controllers               // Logic for handling various API requests
   │   ├── notificationController.js // Controller for handling notification actions
   │   └── userController.js     // Controller for handling user-related actions
   ├── middleware                // Middleware functions for request processing (e.g., auth)
   ├── models                    // Mongoose models defining data structures
   │   ├── achievementModel.js   // Model for achievements and recognitions
   │   ├── attendanceModel.js    // Model for attendance tracking
   │   ├── blogModel.js          // Model for blog posts
   │   ├── eventModel.js         // Model for events and details
   │   ├── notificationModel.js  // Model for notifications
   │   ├── resourceModel.js      // Model for resources in the library
   │   └── userModel.js          // Model for user data and authentication
   ├── routes                    // Routes for handling API requests
   │   ├── notificationRoutes.js // Routes for notifications API
   │   └── userRoutes.js         // Routes for user API
   ├── server.js                 // Server initialization file, starts Express server
   └── swagger.json              // Swagger documentation for API endpoints
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GDG-on-Campus-APSIT/GDGoC-APSIT-Website.git
   cd GDGoC-APSIT-Website
   ```

2. Navigate to the frontend directory and install the dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Navigate to the backend directory and install the dependencies:

   ```bash
   cd ../backend
   npm install
   ```

## Running the Project

### Frontend

1. Start the frontend server:

   ```bash
   cd frontend
   npm run dev
   ```

   This will start the Next.js development server, usually accessible at `http://localhost:3000`.

### Backend

1. Ensure that you have your environment variables set in the `.env` file.

2. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

   This will start the Express server, usually accessible at `http://localhost:5000` and the swagger documentation at `http://localhost:5000/api-docs`.

## Usage

- Access the frontend application at `http://localhost:3000`.
- The backend API can be accessed at `http://localhost:5000/api`.
- The backend API documentation can be accessed at `http://localhost:5000/api-docs`

## Environment Variables

Make sure to create a `.env` file in the `backend` directory with the following structure:

```plaintext
MONGO_URI=<your-mongodb-uri>
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.