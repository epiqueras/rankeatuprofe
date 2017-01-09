import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schoolsSchema = new Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 70 },
  slug: { type: String, required: true, minlength: 1, maxlength: 100 },
  createdAt: { type: Date, default: Date.now, required: true },
  rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
  numberOfReviews: { type: Number, default: 0, required: true, min: 0 },
  wouldTakeAgain: { type: Number, default: 0, required: true, min: 0 },
  zeroToTwo: { type: Number, default: 0, required: true, min: 0 },
  threeToFive: { type: Number, default: 0, required: true, min: 0 },
  sixToEight: { type: Number, default: 0, required: true, min: 0 },
  nineToEleven: { type: Number, default: 0, required: true, min: 0 },
  twelveToFourteen: { type: Number, default: 0, required: true, min: 0 },
  fifteenToSeventeen: { type: Number, default: 0, required: true, min: 0 },
  eighteenToTwenty: { type: Number, default: 0, required: true, min: 0 },
  accepted: { type: Boolean, default: false, required: true },
});

export default mongoose.model('Schools', schoolsSchema);
