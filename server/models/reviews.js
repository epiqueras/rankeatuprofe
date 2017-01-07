import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const gradeArray = [
  'N/A',
  'zeroToTwo',
  'threeToFive',
  'sixToEight',
  'nineToEleven',
  'twelveToFourteen',
  'fifteenToSeventeen',
  'eighteenToTwenty',
];

const reviewsSchema = new Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 70 },
  comment: { type: String, required: true, minlength: 0, maxlength: 150 },
  createdAt: { type: Date, default: Date.now, required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: 'Teachers' },
  rating: { type: Number, required: true, min: 0, max: 5 },
  grade: { type: String, required: true, enum: gradeArray },
  takesAttendance: { type: Boolean, required: true },
  wouldTakeAgain: { type: Boolean, required: true },
});

export default mongoose.model('Reviews', reviewsSchema);
