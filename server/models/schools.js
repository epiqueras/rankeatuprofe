import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schoolsSchema = new Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 70 },
  slug: { type: String, required: true, minlength: 1, maxlength: 100 },
  createdAt: { type: Date, default: Date.now, required: true },
  rZero: { type: Number, default: 0, required: true, min: 0 },
  rOne: { type: Number, default: 0, required: true, min: 0 },
  rTwo: { type: Number, default: 0, required: true, min: 0 },
  rThree: { type: Number, default: 0, required: true, min: 0 },
  rFour: { type: Number, default: 0, required: true, min: 0 },
  rFive: { type: Number, default: 0, required: true, min: 0 },
  numberOfReviews: { type: Number, default: 0, required: true, min: 0 },
  wouldTakeAgain: { type: Number, default: 0, required: true, min: 0 },
  'N/A': { type: Number, default: 0, required: true, min: 0 },
  zeroToTwo: { type: Number, default: 0, required: true, min: 0 },
  threeToFive: { type: Number, default: 0, required: true, min: 0 },
  sixToEight: { type: Number, default: 0, required: true, min: 0 },
  nineToEleven: { type: Number, default: 0, required: true, min: 0 },
  twelveToFourteen: { type: Number, default: 0, required: true, min: 0 },
  fifteenToSeventeen: { type: Number, default: 0, required: true, min: 0 },
  eighteenToTwenty: { type: Number, default: 0, required: true, min: 0 },
});

export default mongoose.model('Schools', schoolsSchema);
