/*
============================================
============================================
            **** WARNING ****
  RUNNING THIS SCRIPT WILL DELETE AND\OR
  OVERWRITE YOUR BCARDS DATABASE !!!!!!!
============================================
============================================
*/

const connectDB = require('./dal/mongoose')
const { users, plans, workouts, exercises } = require('./data/data')
const User = require('./models/User');
const Plan = require('./models/Plan');
const Workout = require('./models/Workout');
const Exercise = require('./models/Exercise');

const seedAll = async () => {

    console.log('\nDatabase seeding started...');

    try {

        // Seed Exercises

        // delete all existing exercises
        await Exercise.deleteMany();
        // insert seed exercises
        const insertedExercises = await Exercise.insertMany(exercises);
        console.log(`  [i] Inserted ${insertedExercises.length} exercises`);

        // Seed Workouts

        // delete all existing workouts
        await Workout.deleteMany();
        // insert seed workouts
        const insertedWorkouts = await Workout.insertMany(workouts);
        console.log(`  [i] Inserted ${insertedWorkouts.length} workouts`);

        // Seed Plans

        // delete all existing plans
        await Plan.deleteMany();
        // insert seed plans
        const insertedPlans = await Plan.insertMany(plans);
        console.log(`  [i] Inserted ${insertedPlans.length} plans`);

        // Seed users

        // delete all existing users
        await User.deleteMany();
        // insert seed users
        const insertedUsers = await User.insertMany(users);
        console.log(`  [i] Inserted ${insertedUsers.length} users`);

        // Success

        console.log('[v] Completed successfully');
        process.exit(0);

    } catch (e) {

        // Error

        console.log('[x] Seeding error')
        console.log(e.message)
        process.exit(1);

    }

}

// Connect to database
connectDB().then(() => {
    // Seed all collections
    seedAll()
});