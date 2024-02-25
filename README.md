# tasksAPI

tasksAPI is a RESTful API tailored for managing tasks, incorporating features like task validation and task expiration deadlines. It's an ideal solution for applications requiring robust task management functionalities.

## Getting Started

### Prerequisites

Ensure you have Git installed on your machine to clone the application. Visit [Git's official site](https://git-scm.com/downloads) for installation instructions.

### Clone the Repository

To clone the repository, execute the following command:

```bash
git clone https://github.com/matheusPavaneli/tasksAPI.git
```

After cloning, navigate to the project directory:

```bash
cd tasksAPI
```

### Setting Up Environment Variables

Create a `.env` file in the root directory to set up the required environment variables as follows:

```env
PORT=YOUR_PORT
DATABASE_URL=YOUR_DATABASE_URL
CORS_ORIGIN=YOUR_ORIGIN_URL
```

### Installing Dependencies

Install the project dependencies by running:

```bash
npm install
```

### Running the Application

To launch the application, execute:

```bash
npm run dev
```

## Features

- **CRUD Operations for Tasks:** Facilitates creating, reading, updating, and deleting tasks.
- **Validation Date:** Enforces a validation deadline for tasks, with updates extending the duration.
- **Field Validation:** Ensures the presence of all necessary fields and the uniqueness of tasks.
- **Toggle Complete:** Allows toggling the completion status of tasks.

## Technologies Used

- **Cors:** Enables secure cross-origin requests.
- **Express:** Provides a fast, unopinionated web framework for Node.js.
- **Helmet:** Enhances security by setting various HTTP headers.
- **Mongoose:** Acts as an Object Data Modeling (ODM) library for MongoDB and Node.js, simplifying data modeling.
- **ts-node:** Facilitates the direct execution of TypeScript files in Node.js.

## Final Observations

tasksAPI is designed to simplify the integration of task management functionalities into applications, emphasizing efficiency and user-friendliness. Whether starting a new project or enhancing an existing one with task management features, tasksAPI offers a comprehensive and customizable foundation to meet your needs.