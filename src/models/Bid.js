const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bid = sequelize.define('Bid', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    auction_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    bidder_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    bid_amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    }
}, {
    tableName: 'bids',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

module.exports = Bid;