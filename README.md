# BITBook
BITBOOK: Developed a  social media app for college students using the MERN stack,  featuring user authentication, real-time post sharing as blog, and collaboration tools. 



### Project Title: **BITBOOK – A Social Media Platform for College Students**

### Project Description:

**BITBOOK** is a social media platform specifically designed for college students to share their thoughts, ideas, and experiences in a closed community. The platform focuses on creating a secure and interactive environment where students can post updates, interact with peers, and manage their profiles in a college-centric network.

#### Key Features:
1. **User Authentication (JWT-based Login/Registration):**
   - Secure user authentication using JSON Web Tokens (JWT) for login and registration.
   - Password hashing and token-based authentication to ensure data security.
   - Role-based access to different parts of the platform, ensuring that only authenticated users can access specific pages.

2. **Profile Management:**
   - Users can manage and update their profiles with relevant details like profile, bio, and academic information.
   - Personal dashboards display user posts, profile ,bio.
   
3. **Post Creation and Interaction:**
   - Users can create and share posts with various visibility options (public, friends only, or private).
   - Posts can include text, media (images or videos), and links.
   - Other users can like, comment, or share posts within the community.

4. **JWT Middleware for Security:**
   - Middleware for token verification ensures that each request is authenticated and protected from unauthorized access.
   - Error handling for token expiration and invalid token scenarios, improving overall security.

5. **Client-Side Integration with Token Storage:**
   - After successful login, the JWT token is securely stored in the browser's local storage.
   - The token is automatically attached to outgoing requests for accessing secure routes, enabling seamless interaction with the backend.

6. **Post Creation and Profile Interaction:**
   - Users can create new posts with specific visibility options and view all their posts on their profile.
   - The profile page provides an overview of the user’s contributions to the platform and interactions with other users.

#### Technology Stack:
- **Frontend:**
  - HTML, CSS, JavaScript
  - Client-side validation for forms and UI interactivity
- **Backend:**
  - Node.js with Express.js
  - MongoDB for storing user data and posts
  - JWT for secure user authentication
- **Other Tools:**
  - bcrypt.js for password hashing
  - jsonwebtoken package for handling token creation and verification
  - Fetch API for making asynchronous requests between the frontend and backend

#### Future Enhancements:
- Integrating real-time chat functionality using WebSockets.
- Expanding the platform to include groups or clubs where students can join based on shared interests.
- Implementing a notification system to alert users of new friend requests, post interactions, and messages.

---

**BITBOOK** aims to foster a close-knit digital community for college students, providing a secure and private space for communication and networking. The platform is designed to help students express themselves and engage with their peers in an academic environment.
