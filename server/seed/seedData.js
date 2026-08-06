import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Order from '../models/Order.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const categories = [
  { name: 'Women\'s Fashion', slug: 'womens-fashion', description: 'Elegant dresses, tops, and stylish apparel for women.' },
  { name: 'Men\'s Fashion', slug: 'mens-fashion', description: 'Sharp suits, casual wear, and premium menswear.' },
  { name: 'Kids\' Fashion', slug: 'kids-fashion', description: 'Comfortable and stylish clothing for children.' },
  { name: 'Jewelry', slug: 'jewelry', description: 'Elegant necklaces, rings, and premium jewelry pieces.' },
  { name: 'Accessories', slug: 'accessories', description: 'Premium bags, sunglasses, and timeless wristwatches.' }
];

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    console.log('Creating demo user...');
    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@smatt.com',
      password: 'password123',
      role: 'user'
    });

    console.log('Creating categories...');
    const createdCategories = await Category.insertMany(categories);
    
    const catMap = {};
    createdCategories.forEach(c => {
      catMap[c.name] = c._id;
    });

    const products = [];

    // Women's Fashion
    for (let i = 1; i <= 6; i++) {
      products.push({
        name: `Elegant Dress ${i}`,
        slug: `elegant-dress-${i}`,
        description: 'A timeless elegant dress for any occasion. Comfortable and stylish.',
        price: 89.99 + i * 10,
        compareAtPrice: 120.00 + i * 10,
        images: [`/images/products/womens-elegant-dress-1.jpg`],
        category: catMap['Women\'s Fashion'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Black', hex: '#000000' }],
        stock: 50,
        rating: 4.5,
        numReviews: 24,
        featured: i % 2 === 0,
        tags: ['dress', 'womens', 'elegant']
      });
    }

    // Men's Fashion
    for (let i = 1; i <= 6; i++) {
      products.push({
        name: `Sharp Suit ${i}`,
        slug: `sharp-suit-${i}`,
        description: 'Stay sharp with our premium tailored suit. Perfect for any formal event.',
        price: 159.99 + i * 15,
        compareAtPrice: 199.99 + i * 15,
        images: [`/images/products/mens-sharp-suit-1.jpg`],
        category: catMap['Men\'s Fashion'],
        sizes: ['38R', '40R', '42R', '44R'],
        colors: [{ name: 'Navy', hex: '#000080' }, { name: 'Charcoal', hex: '#36454F' }],
        stock: 100,
        rating: 4.8,
        numReviews: 150,
        featured: i === 1 || i === 3,
        tags: ['suit', 'mens', 'formal']
      });
    }

    // Kids' Fashion
    for (let i = 1; i <= 6; i++) {
      products.push({
        name: `Kids Outfit ${i}`,
        slug: `kids-outfit-${i}`,
        description: 'Comfortable and stylish outfit for children. Made from premium cotton.',
        price: 39.99 + i * 5,
        images: [`/images/products/womens-elegant-dress-1.jpg`],
        category: catMap['Kids\' Fashion'],
        sizes: ['2T', '3T', '4T', '5T'],
        colors: [{ name: 'Blue', hex: '#0000FF' }, { name: 'Pink', hex: '#FFC0CB' }],
        stock: 130,
        rating: 4.2,
        numReviews: 45,
        featured: i === 5,
        tags: ['kids', 'outfit', 'comfortable']
      });
    }

    // Jewelry
    for (let i = 1; i <= 6; i++) {
      products.push({
        name: `Luxury Necklace ${i}`,
        slug: `luxury-necklace-${i}`,
        description: 'Elegant luxury necklace. A statement piece for any occasion.',
        price: 234.99 + i * 20,
        compareAtPrice: 345.00,
        images: [`/images/products/accessories-timeless-watch-1.jpg`],
        category: catMap['Jewelry'],
        sizes: ['Standard'],
        colors: [],
        stock: 200,
        rating: 4.9,
        numReviews: 320,
        featured: i === 2,
        tags: ['jewelry', 'necklace', 'luxury']
      });
    }

    // Accessories
    for (let i = 1; i <= 6; i++) {
      products.push({
        name: `Premium Bag ${i}`,
        slug: `premium-bag-${i}`,
        description: 'Premium leather bag. Elegant and functional design for everyday use.',
        price: 124.99,
        images: [`/images/products/accessories-timeless-watch-1.jpg`],
        category: catMap['Accessories'],
        sizes: ['Standard'],
        colors: [],
        stock: 150,
        rating: 4.6,
        numReviews: 88,
        featured: i === 4 || i === 6,
        tags: ['bag', 'accessories', 'leather']
      });
    }

    console.log('Creating products...');
    await Product.insertMany(products);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

seedData();
