import Poem from '@models/poem'
import { connectToDB } from '@utils/database'

export const GET = async (request, { params }) => {
  try {
    await connectToDB()

    const poems = await Poem.find({ creator: params.id }).populate('creator')

    return new Response(JSON.stringify(poems), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch poems created by user', {
      status: 500
    })
  }
}
