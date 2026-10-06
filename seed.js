// Run with: npm run seed
// Wipes and reseeds the database with demo users and South African listings.
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Accommodation = require('../models/Accommodation');
const Reservation = require('../models/Reservation');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await User.deleteMany();
    await Accommodation.deleteMany();
    await Reservation.deleteMany();

    const host = await User.create({
      username: 'Johann Coetzee',
      email: 'host@airbnb-clone.co.za',
      password: 'password123',
      role: 'host',
    });

    const guest = await User.create({
      username: 'Kago Kola',
      email: 'guest@airbnb-clone.co.za',
      password: 'password123',
      role: 'user',
    });

    const listingsData = [
      {
        title: 'Sandton City Hotel',
        type: '3 Room Bedroom · Entire home',
        location: 'Sandton, Johannesburg',
        description:
          'Stay in this stylish apartment in the heart of Sandton, Johannesburg\'s financial hub. Walking distance to Sandton City Mall, the Gautrain station and Nelson Mandela Square. Bright, modern and perfect for business or leisure travellers.',
        guests: 6,
        bedrooms: 3,
        bathrooms: 3,
        beds: 5,
        amenities: ['Wifi', 'Kitchen', 'Free Parking', 'Air conditioning', 'Pool', 'Washer'],
        images: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
          'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
        ],
        price: 3250,
        weeklyDiscount: 200,
        cleaningFee: 350,
        serviceFee: 280,
        occupancyTaxes: 150,
        rating: 5.0,
        reviews: 318,
        host: host.username,
        host_id: host._id,
      },
      {
        title: 'Woodmead City Hotel',
        type: 'Entire home in Woodmead',
        location: 'Woodmead, Johannesburg',
        description:
          'A charming, historic-style building in Woodmead with easy access to the N1 highway, Woodmead retail park and top restaurants. Perfect base for exploring Johannesburg.',
        guests: 6,
        bedrooms: 3,
        bathrooms: 3,
        beds: 5,
        amenities: ['Wifi', 'Kitchen', 'Free Parking', 'Dedicated workspace', 'Iron', 'Dryer'],
        images: [
          'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200',
          'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800',
          'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800',
          'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800',
          'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800',
        ],
        price: 2000,
        weeklyDiscount: 150,
        cleaningFee: 300,
        serviceFee: 220,
        occupancyTaxes: 120,
        rating: 5.0,
        reviews: 318,
        host: host.username,
        host_id: host._id,
      },
      {
        title: 'Historic City Center Home',
        type: 'Entire home in Cape Town',
        location: 'Cape Town City Centre',
        description:
          'A beautiful historic home tucked in the heart of Cape Town, close to the V&A Waterfront, Table Mountain cable car and the city\'s best restaurants and bars.',
        guests: 6,
        bedrooms: 3,
        bathrooms: 3,
        beds: 5,
        amenities: ['Wifi', 'Kitchen', 'Free Parking', 'Garden view', 'Pets allowed', 'Bicycles'],
        images: [
          'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1200',
          'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800',
          'https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800',
          'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800',
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        ],
        price: 1250,
        weeklyDiscount: 100,
        cleaningFee: 200,
        serviceFee: 150,
        occupancyTaxes: 80,
        rating: 5.0,
        reviews: 318,
        host: host.username,
        host_id: host._id,
      },
      {
        title: 'Hyde Park Luxury Apartment',
        type: 'Entire apartment in Hyde Park',
        location: 'Hyde Park, Johannesburg',
        description:
          'Luxurious apartment overlooking Hyde Park Corner. Enjoy upscale shopping, fine dining and a quiet, leafy neighbourhood just minutes from Sandton.',
        guests: 4,
        bedrooms: 2,
        bathrooms: 2,
        beds: 3,
        amenities: ['Wifi', 'Kitchen', 'Free Parking', 'Air conditioning', 'Security cameras on property'],
        images: [
          'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200',
          'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
          'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800',
          'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800',
        ],
        price: 2750,
        weeklyDiscount: 180,
        cleaningFee: 320,
        serviceFee: 260,
        occupancyTaxes: 140,
        rating: 4.9,
        reviews: 214,
        host: host.username,
        host_id: host._id,
      },
      {
        title: 'Stellenbosch Vineyard Cottage',
        type: 'Entire cottage in Stellenbosch',
        location: 'Stellenbosch, Western Cape',
        description:
          'A cosy cottage surrounded by rolling vineyards in the heart of the Cape Winelands. Wake up to mountain views and spend your days wine tasting.',
        guests: 4,
        bedrooms: 2,
        bathrooms: 1,
        beds: 2,
        amenities: ['Wifi', 'Kitchen', 'Free Parking', 'Garden view', 'Fireplace'],
        images: [
          'https://images.unsplash.com/photo-1505692952047-1a78307da8f2?w=1200',
          'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
          'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
        ],
        price: 1850,
        weeklyDiscount: 120,
        cleaningFee: 220,
        serviceFee: 180,
        occupancyTaxes: 90,
        rating: 4.95,
        reviews: 176,
        host: host.username,
        host_id: host._id,
      },
      {
        title: 'Durban Beachfront Flat',
        type: 'Entire apartment in Durban',
        location: 'Umhlanga, Durban',
        description:
          'Wake up to ocean views in this beachfront flat in Umhlanga. Steps away from the promenade, restaurants and the famous Umhlanga lighthouse.',
        guests: 5,
        bedrooms: 2,
        bathrooms: 2,
        beds: 3,
        amenities: ['Wifi', 'Kitchen', 'Free Parking', 'Pool', 'Air conditioning'],
        images: [
          'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200',
          'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
          'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
        ],
        price: 1600,
        weeklyDiscount: 100,
        cleaningFee: 200,
        serviceFee: 160,
        occupancyTaxes: 85,
        rating: 4.8,
        reviews: 259,
        host: host.username,
        host_id: host._id,
      },
    ];

    const accommodations = await Accommodation.insertMany(listingsData);
    console.log(`Seeded ${accommodations.length} accommodations`);

    await Reservation.create([
      {
        accommodation: accommodations[0]._id,
        user: guest._id,
        host: host._id,
        bookedBy: 'Johann Coetzee',
        propertyTitle: accommodations[0].title,
        checkIn: new Date('2026-06-19'),
        checkOut: new Date('2026-06-24'),
        guests: 2,
        total: accommodations[0].price * 5,
      },
      {
        accommodation: accommodations[1]._id,
        user: guest._id,
        host: host._id,
        bookedBy: 'Asif Hassam',
        propertyTitle: accommodations[1].title,
        checkIn: new Date('2026-06-19'),
        checkOut: new Date('2026-06-19'),
        guests: 1,
        total: accommodations[1].price,
      },
      {
        accommodation: accommodations[0]._id,
        user: guest._id,
        host: host._id,
        bookedBy: 'Kago Kola',
        propertyTitle: accommodations[0].title,
        checkIn: new Date('2026-06-25'),
        checkOut: new Date('2026-06-30'),
        guests: 3,
        total: accommodations[0].price * 5,
      },
    ]);

    console.log('Seeding complete!');
    console.log('---------------------------------');
    console.log('Demo host login: host@airbnb-clone.co.za / password123');
    console.log('Demo guest login: guest@airbnb-clone.co.za / password123');
    console.log('---------------------------------');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seed();
