# Book Management System

The Book Management System is a Node.js application designed to manage books and handle user authentication. It offers APIs for performing various operations related to book management and user authentication. This README provides instructions on how to set up and run the application.

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js:** Version 14 or later
- **npm:** Node Package Manager
- **MongoDB:** You can either install MongoDB locally or use a MongoDB cloud service like MongoDB Atlas

## Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/your-username/book-management-system.git
    ```

2. **Navigate to the Project Directory:**

    ```bash
    cd book-management-system
    ```

3. **Install the Dependencies:**

    ```bash
    npm install
    ```

4. **Create a `.env` File:**

    Create a file named `.env` in the root directory of the project and add the following environment variables:

    ```plaintext
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    PORT=your_port_number
    SMTP_HOST=your_smtp_host
    SMTP_PORT=your_smtp_port
    SMTP_USER=your_smtp_username
    SMTP_PASS=your_smtp_password
    SMTP_FROM=your_smtp_from_email
    ```

    Replace `your_mongodb_uri`, `your_jwt_secret`, `your_port_number`, `your_smtp_host`, `your_smtp_port`, `your_smtp_username`, `your_smtp_password`, and `your_smtp_from_email` with appropriate values.

5. **Running the Application:**

    Once you have set up the environment variables in the `.env` file, you can start the application by running:

    ```bash
    npm start
    ```
