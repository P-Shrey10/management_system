const express = require('express');
const router = express.Router();

// Import all route files
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const customerRoutes = require('./customerRoutes');
const cartRoutes = require('./cartRoutes');
const orderRoutes = require('./orderRoutes');
const shopkeeperRoutes = require('./shopkeeperRoutes');
const staffRoutes = require('./staffRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/customers', customerRoutes);
router.use('/carts', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/shopkeepers', shopkeeperRoutes);
router.use('/staffs', staffRoutes);

module.exports = router;