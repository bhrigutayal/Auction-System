const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Auction = sequelize.define('Auction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  item_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  starting_price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  bid_increment: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.TEXT,
    defaultValue: 'pending',
  },
  seller_id: {
    type: DataTypes.UUID,
  },
  highest_bid: {
    type: DataTypes.DECIMAL,
  },
  highest_bidder_id: {
    type: DataTypes.UUID,
  }
}, {
  tableName: 'auctions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false, // We don't have an 'updated_at' column
});

module.exports = Auction;

