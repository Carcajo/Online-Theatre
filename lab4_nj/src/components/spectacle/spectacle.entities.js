import mongoose from 'mongoose';

/*class Spectacle {
    constructor(title, summary, Duration, screenwriter_id, genre_id) {
      //this.id = crypto.randomUUID();
      this.title = title;
      this.summary = summary;
      this.Duration = Duration;
      this.screenwriter_id = screenwriter_id;
      this.genre_id = genre_id;
    }
  
    toJSON() {
      return {
        id: this.id,
        title: this.title,
        Duration: this.Duration,
        screenwriter_id: this.screenwriter_id,
        genre_id: this.genre_id
      };
    }
  }*/

  const SpectacleSchema = new mongoose.Schema({
    id: Number,
    title: String,
    summary: String,
    Duration: {
      type: Number,
      min: 0
    },
    cost: {
      type: Number,
      min: [0, 'Price cannot be negative']
    },
    screenwriter_id: Number,
    genre_id: Number,
    imgUrl: String
  });

  SpectacleSchema.options.toJSON = {
    transform: function(doc, ret, options) {
      delete ret._id;
      delete ret.__v;
      return ret;
  }
  };
  
  const Spectacle = mongoose.model('Spectacle', SpectacleSchema);

  export default Spectacle;