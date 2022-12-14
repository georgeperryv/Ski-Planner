const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema(
  {
    content: String,
    rating: { type: Number, min: 1, max: 5, default: 3 },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: String,
    userAvatar: String
  },
  {
    timestamps: true
  }
)

const resortSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: String,
    userAvatar: String,
    resortName: {
      type: String,
      required: true
    },
    location: String,
    startDate: {
      type: String,
      required: true
    },
    endDate: String,
    passUsed: String,
    budget: Number,
    website: String,
    transportation: String,
    airport: String,
    reviews: [reviewSchema]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Resort', resortSchema)
