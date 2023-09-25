import Poem from '@models/poem'
import { connectToDB } from '@utils/database'

export const GET = async request => {
  try {
    await connectToDB()

    const poems = await Poem.find({}).populate('creator')

    return new Response(JSON.stringify(poems), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all poems', { status: 500 })
  }
}
