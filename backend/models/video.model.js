import mongoose, { Schema } from "mongoose";
// Import pagination plugin for handling large sets of video data
import mongooseAggregatepaginata from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    // URL or path to the stored video file
    videoFile: {
      type: String,
      required: true,
    },
    // URL or path to video thumbnail image
    thumbnail: {
      type: String,
      required: true,
    },
    // Reference to the User who uploaded the video
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",  // References the User model
    },
    // Video title
    title: {
      type: String,
      required: true,
    },
    // Video description
    description: {
      type: String,
      required: true,
    },
    // Video length in seconds
    duration: {
      type: Number,
      required: true,
    },
    // View count, starts at 0
    views: {
      type: Number,
      default: 0,
    },
    // Publication status
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,  // Adds createdAt and updatedAt fields
  }
);

// Add pagination plugin for handling video listings
videoSchema.plugin(mongooseAggregatepaginata)

// Create and export the Video model
const Video = mongoose.model("video", videoSchema);
export default Video;
