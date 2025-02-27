import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  codelink: {
    type: String,
    required: true
  },
  livelink: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false,
});

const PortfolioModel = mongoose.model("Portfolio", PortfolioSchema);
export default PortfolioModel;
