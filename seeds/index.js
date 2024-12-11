/**
 * Run this file on its own, separate from node app
 * any time you want to 'seed' the database or make changes
 * to the seed data.
 */

const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Database connected'));

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6744c65699757c833d103200',
            geometry: { 
              type: 'Point', 
              coordinates: [ 
                cities[random1000].longitude,
                cities[random1000].latitude
              ] 
            },
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dpynhxzww/image/upload/v1733348031/YelpCamp/bdmy6bnoyw7qe1ap2p5p.jpg',
                  filename: 'YelpCamp/bdmy6bnoyw7qe1ap2p5p',
                },
                {
                  url: 'https://res.cloudinary.com/dpynhxzww/image/upload/v1733348032/YelpCamp/fckq6rsxa18ctdqbyyco.jpg',
                  filename: 'YelpCamp/fckq6rsxa18ctdqbyyco',
                }
              ],
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
