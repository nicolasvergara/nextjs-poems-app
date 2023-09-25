import Poem from '@models/poem'
import { connectToDB } from '@utils/database'

export const POST = async request => {
  const { userId, poem, tag } = await request.json()

  try {
    await connectToDB()
    const newPoem = new Poem({ creator: userId, poem, tag })

    await newPoem.save()
    return new Response(JSON.stringify(newPoem), { status: 201 })
  } catch (error) {
    return new Response('Failed to create a new poem', { status: 500 })
  }
}
