# Sparkling Clean React

A modern React application for a cleaning service website built with React, Tailwind CSS, and React Router.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern React**: Built with React 19 and React Router
- **Component-Based Architecture**: Modular and reusable components
- **Professional UI**: Clean and modern interface for cleaning services

## Components

- **Header**: Navigation with mobile menu
- **Hero**: Landing section with call-to-action
- **Services**: Service offerings display
- **About**: Company information
- **Contact**: Contact form and information
- **Footer**: Site footer with links

## Pages

- **Home**: Main landing page
- **About**: About us page
- **Services**: Services overview page
- **Contact**: Contact page

## Technologies Used

- React 19.1.1
- React Router DOM 7.8.2
- Tailwind CSS 3.4.17
- EmailJS for contact form
- Create React App

## Environment Variables

The application uses the following environment variables for EmailJS configuration:

- `REACT_APP_EMAILJS_SERVICE_ID` - Your EmailJS service ID
- `REACT_APP_EMAILJS_TEMPLATE_ID` - Your EmailJS template ID  
- `REACT_APP_EMAILJS_PUBLIC_KEY` - Your EmailJS public key

**Note**: All React environment variables must be prefixed with `REACT_APP_` to be accessible in the browser.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sparkling-clean-react.git
```

2. Navigate to the project directory:
```bash
cd sparkling-clean-react
```

3. Install dependencies:
```bash
npm install
```

4. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the EmailJS configuration with your actual values:
   ```
   REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
   REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
   REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

5. Start the development server:
```bash
npm start
```

6. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Navigation component
│   ├── Hero.js         # Hero section
│   ├── Services.js     # Services display
│   ├── About.js        # About section
│   ├── Contact.js      # Contact form
│   └── Footer.js       # Footer component
├── pages/              # Page components
│   ├── HomePage.js     # Home page
│   ├── AboutPage.js    # About page
│   ├── ServicesPage.js # Services page
│   └── ContactPage.js  # Contact page
├── App.js              # Main app component
└── index.js            # App entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - [@yourusername](https://github.com/yourusername)

Project Link: [https://github.com/yourusername/sparkling-clean-react](https://github.com/yourusername/sparkling-clean-react)