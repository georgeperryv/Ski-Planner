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
      //   validate: {
      //     validator: function (v) {
      //       return (
      //         v && v.getTime() > Date.now() + 24 * 60 * 60 * 1000 // check that there is a date object
      //       )
      //     },
      //     message:
      //       'An event must be at least 1 day from now and not more than 90 days.'
      //   }
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
