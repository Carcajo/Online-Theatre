import mongoose from 'mongoose';

const ScreenwriterSchema = new mongoose.Schema({
  id: Number,
  name: String
});

ScreenwriterSchema.options.toJSON = {
  transform: function(doc, ret, options) {
    delete ret._id;
    delete ret.__v;
    return ret;
}
};

const Screenwriter = mongoose.model('Screenwriter', ScreenwriterSchema);

export default Screenwriter;