# Community Relief Coordination App

## Overview
This open-source web app was originally created in response to the devastating LA fires, aiming to help communities coordinate relief efforts more effectively. However, it’s designed to be versatile and can be used in any situation where people might need help or want to volunteer.

The app enables people to post and respond to requests for assistance, categorized by needs and filtered by location. Built using the **Replyke** SaaS, it demonstrates how to implement location-based filters and request categorization in a web application.

---

## Features
- **Post Requests**: Users can post detailed help requests, specifying:
  - Type of assistance needed (e.g., housing, medical, transportation).
  - Number of volunteers required.
  - Specific location.
- **Search by Category and Location**: Volunteers can filter requests by category and location to find opportunities that match their skills or proximity.
- **Open Source**: Built to inspire and educate developers, with contributions welcome.

---

## Built With
- [Replyke](https://replyke.com): Provides the backend structure for handling requests, categories, and location filters.
- **React**: Used for building the user interface.
- **TypeScript**: Ensures type safety and better developer experience.
- **Tailwind CSS**: For efficient and responsive styling.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Tsabary/Aid.git
   cd aid
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up environment variables by creating a `.env` file based on the provided `.env.example` template. Configure necessary keys for Replyke integration and any other services used.

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```




## Contributing
This project welcomes contributions! Here’s how you can get involved:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments
- Inspired by the need for effective community coordination during emergencies.
- Built with the support of the Replyke community and tools.

---

## Contact
For questions, suggestions, or feedback, feel free to reach out through the repository’s issue tracker.

