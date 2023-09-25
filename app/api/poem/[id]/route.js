import Poem from '@models/poem'
import { connectToDB } from '@utils/database'

export const GET = async (request, { params }) => {
  try {
    await connectToDB()

    const poem = await Poem.findById(params.id).populate('creator')
    if (!poem) return new Response('Poem Not Found', { status: 404 })

    return new Response(JSON.stringify(poem), { status: 200 })
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 })
  }
}

export const PATCH = async (request, { params }) => {
  const { poem, tag } = await request.json()

  try {
    await connectToDB()

    // Find the existing poem by ID
    const existingPoem = await Poem.findById(params.id)

    if (!existingPoem) {
      return new Response('Poem not found', { status: 404 })
    }

    // Update the poem with new data
    existingPoem.poem = poem
    existingPoem.tag = tag

    await existingPoem.save()

    return new Response('Successfully updated the Poems', { status: 200 })
  } catch (error) {
    return new Response('Error Updating Poem', { status: 500 })
  }
}

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()

    // Find the poem by ID and remove it
    await Poem.findByIdAndRemove(params.id)

    return new Response('Poem deleted successfully', { status: 200 })
  } catch (error) {
    return new Response('Error deleting poem', { status: 500 })
  }
}
