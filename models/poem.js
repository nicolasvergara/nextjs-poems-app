import { Schema, model, models } from 'mongoose'

const PoemSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  poem: {
    type: String,
    required: [true, 'Poem is required.']
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.']
  }
})

const Poem = models.Poem || model('Poem', PoemSchema)

export default Poem
