const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const users = [
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234561'),
    name: {
      first: "Ori",
      middle: "the",
      last: "Admin",
    },
    image:{
      url: "https://cdn.pixabay.com/photo/2023/12/14/06/45/chicken-8448262_1280.jpg",
      alt: "Admin image profile",
    },
    phone: "050-1234567",
    email: "user@gmail.com",
    password: bcrypt.hashSync('Admin123!', 10),
    birthdate: new Date(2000, 1, 1),
    gender: "Male",
    weightKG: 120,
    heightCM: 180,
    role: "ADMIN",
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234562'),
    name: {
      first: "Uri2",
      middle: "the",
      last: "Trainer",
    },
    phone: "050-1234568",
    email: "user2@gmail.com",
    password: bcrypt.hashSync('Trainer123!', 10),
    birthdate: new Date(2001, 3, 2),
    gender: "Male",
    weightKG: 98,
    heightCM: 175,
    trainees: [
      "60d5ec49f1b2f9a7d1234563",
      "60d5ec49f1b2f9a7d1234564",
    ],
    role: "TRAINER",
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234563'),
    name: {
      first: "Uri3",
      middle: "the",
      last: "Trainee",
    },
    phone: "050-1234569",
    email: "user3@gmail.com",
    password: bcrypt.hashSync('Trainee123!', 10),
    birthdate: new Date(1975, 3, 12),
    gender: "Male",
    weightKG: 163,
    heightCM: 210,
    trainer: "60d5ec49f1b2f9a7d1234562",
    role: "TRAINEE",
    plan: {
      plan: "60d5ec49f1b2f9a7d1234578",
      startDate: new Date(2024, 10, 10),
    },
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234564'),
    name: {
      first: "Uri4",
      middle: "the",
      last: "The 2nd Trainee",
    },
    phone: "050-1234570",
    email: "user4@gmail.com",
    password: bcrypt.hashSync('Trainee2123!', 10),
    birthdate: new Date(2004, 12, 13),
    gender: "Male",
    weightKG: 180,
    heightCM: 160,
    role: "TRAINEE",
    trainer: "60d5ec49f1b2f9a7d1234562",
    plan: {
      plan: "60d5ec49f1b2f9a7d1234578",
      startDate: new Date(2024, 9, 9),
    }
  },
];

const exercises = [
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234565'),
    name: "Bench Press",
    sets: 3,
    repetitions: 10,
    weight: 25,
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234566'),
    name: "Squat",
    sets: 4,
    repetitions: 12,
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234567'),
    name: "Deadlift",
    sets: 3,
    repetitions: 8,
    weight: 25,
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234568'),
    name: "Overhead Press",
    sets: 3,
    repetitions: 10,
    weight: 30,
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234569'),
    name: "Bicep Curl",
    sets: 3,
    repetitions: 15,
    weight: 25,
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234570'),
    name: "Tricep Dip",
    sets: 3,
    repetitions: 12,
    weight: 10,
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234571'),
    name: "Lunges",
    sets: 3,
    repetitions: 12,
    weight: 20,
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234572'),
    name: "Lat Pulldown",
    sets: 3,
    repetitions: 10,
    weight: 20,
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234573'),
    name: "Plank",
    sets: 3,
    repetitions: 10,
    duration: 60,
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234574'),
    name: "Leg Press",
    sets: 4,
    repetitions: 12,
    weight: 50,
  },
];

const workouts = [
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234575'),
    name: "Full-Body Strength",
    exercises: [
      {
        exercise: "60d5ec49f1b2f9a7d1234565",
        modifications: { sets: 12 },
      },
      {
        exercise: "60d5ec49f1b2f9a7d1234566",
      },
      {
        exercise: "60d5ec49f1b2f9a7d1234567",
        modifications: {
          repetitions: 4,
        },
      },
      {
        exercise: "60d5ec49f1b2f9a7d1234568",
      },
      {
        exercise: "60d5ec49f1b2f9a7d1234573",
        modifications: {
          sets: 12
        },
      },
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234576'),
    name: "Upper Body Strength",
    exercises: [
      {
        exercise: "60d5ec49f1b2f9a7d1234565",
      },
      {
        exercise: "60d5ec49f1b2f9a7d1234568",
      },
      {
        exercise: "60d5ec49f1b2f9a7d1234569",
        modifications: {
          repetitions: 2,
        },
      },
      {
        exercise: "60d5ec49f1b2f9a7d1234570",
      },
      {
        exercise: "60d5ec49f1b2f9a7d1234572",
        modifications: {
          sets: 4
        },
      },
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234577'),
    name: "Lower Body & Core",
    exercises: [
      {
        exercise: "60d5ec49f1b2f9a7d1234566",
      },
      {
        exercise: "60d5ec49f1b2f9a7d1234567",
      },
      {
        exercise: "60d5ec49f1b2f9a7d1234571",
        modifications: {
          repetitions: 2,
        },
      },
      {
        exercise: "60d5ec49f1b2f9a7d1234574",
      },
      {
        exercise: "60d5ec49f1b2f9a7d1234573",
        modifications: {
          sets: 4
        },
      },
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234579'),
    name: "Lower Body & Core",
    exercises:[
      {
        exercise: "60d5ec49f1b2f9a7d1234573",
      }
    ]
  },
];

const plans = [
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234578'),
    name: "4-Week Strength Building Program",
    description: "A program to build strength for beginners",
    durationWEEKS: 4,
    workouts: [
      {
        workout: "60d5ec49f1b2f9a7d1234575",
        day: 2,
        name: "Full-Body Strength"
      },
      {
        workout: "60d5ec49f1b2f9a7d1234576",
        day: 5,
        name: "Upper Body Strength",
      },
      {
        workout: "60d5ec49f1b2f9a7d1234577",
        day: 6,
        name: "Lower Body & Core",
      },
    ]
  }
];

module.exports = { users, exercises, workouts, plans };