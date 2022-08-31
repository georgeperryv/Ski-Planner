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
    resortName: {
      type: String,
      required: true
    },
    location: String,
    startDate: Date,
    endDate: Date,
    passUsed: String,
    budget: Number,
    website: String,
    transporation: String,
    airport: String,
    reviews: [reviewSchema]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Resort', resortSchema)
