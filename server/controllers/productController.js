import Product from '../models/Product.js';
import Category from '../models/Category.js';

export const getProducts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 12;
    const page = parseInt(req.query.page, 10) || 1;
    
    let query = {};

    if (req.query.keyword) {
      query.$or = [
        { name: { $regex: req.query.keyword, $options: 'i' } },
        { description: { $regex: req.query.keyword, $options: 'i' } },
      ];
    }

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }
    
    if (req.query.size) {
      query.sizes = { $in: [req.query.size] };
    }

    if (req.query.color) {
      query['colors.name'] = { $regex: req.query.color, $options: 'i' };
    }

    let sortOption = { createdAt: -1 };
    if (req.query.sort) {
      if (req.query.sort === 'price_asc') sortOption = { price: 1 };
      else if (req.query.sort === 'price_desc') sortOption = { price: -1 };
      else if (req.query.sort === 'rating') sortOption = { rating: -1 };
    }

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sortOption)
      .limit(limit)
      .skip(limit * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / limit),
      total: count,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate('category', 'name slug');
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

export const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ featured: true })
      .populate('category', 'name slug')
      .limit(8)
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductsByCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    
    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }

    const limit = parseInt(req.query.limit, 10) || 12;
    const page = parseInt(req.query.page, 10) || 1;

    const count = await Product.countDocuments({ category: category._id });
    const products = await Product.find({ category: category._id })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / limit),
      total: count,
      category,
    });
  } catch (error) {
    next(error);
  }
};
