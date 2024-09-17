# Class Full Stack Project Assignment

# About the Project

This project simulates an administrative tool for gym owners. The system manages three types of users: admins, trainers, and trainees. Trainers have personalized plans, workouts, and exercises, and they manage their trainees. A trainer can monitor their trainees' progress, adjust workout plans, and make changes based on their assessments.

The key entities in the system are:
- **Users**: Admins, trainers, and trainees
- **Plans**: Consisting of multiple workouts
- **Workouts**: Comprised of various workouts from various exercises

Below is a simplified diagram of the entity model:
<img width="940" alt="entity model" src="https://github.com/user-attachments/assets/08cfd08e-a078-4e3a-bc02-34d872170838">


Additionally, here is a site map for reference:
<img width="1022" alt="site map" src="https://github.com/user-attachments/assets/0648f02e-ec40-4a2c-b008-ebabaab9803f">


# Installation & Setup

1. Download and unzip the repository.
2. Ensure MongoDB is running locally, then navigate to the `server` folder and run `node seed` to seed the database.
3. Install server dependencies with `npm install` and start the server using `nodemon`.
4. In the `client` folder, run `npm install` and then `npm run dev`.
5. Open the provided `localhost` link in your browser to access the application.

   there is env file that already defined and uplodad. so not extra setting needed.

# Technologies Used

- **Frontend**: React with Mantine UI framework
- **Backend**: Node.js, Express, and Mongoose for database interaction
- **Database**: MongoDB

