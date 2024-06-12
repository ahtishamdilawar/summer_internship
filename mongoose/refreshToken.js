const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const refreshTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const refreshToken = Mongoose.model("RefreshToken", refreshTokenSchema);
module.exports = refreshToken;
