import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teachersSchema = new Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 70 },
  slug: { type: String, required: true, minlength: 1, maxlength: 100 },
  createdAt: { type: Date, default: Date.now, required: true },
  schoolId: { type: Schema.Types.ObjectId, ref: 'Schools' },
  schoolName: { type: String, required: true, minlength: 1, maxlength: 70 },
  schoolSlug: { type: String, required: true, minlength: 1, maxlength: 100 },
  rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
  numberOfReviews: { type: Number, default: 0, required: true, min: 0 },
  takesAttendance: { type: Number, default: 0, required: true, min: 0 },
  wouldTakeAgain: { type: Number, default: 0, required: true, min: 0 },
  zeroToTwo: { type: Number, default: 0, required: true, min: 0 },
  threeToFive: { type: Number, default: 0, required: true, min: 0 },
  sixToEight: { type: Number, default: 0, required: true, min: 0 },
  nineToEleven: { type: Number, default: 0, required: true, min: 0 },
  twelveToFourteen: { type: Number, default: 0, required: true, min: 0 },
  fifteenToSeventeen: { type: Number, default: 0, required: true, min: 0 },
  eighteenToTwenty: { type: Number, default: 0, required: true, min: 0 },
});

export default mongoose.model('Teachers', teachersSchema);
