'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'

const CreatePoem = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    poem: '',
    tag: ''
  })

  const handleCreatePoem = async e => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch('api/poem/new', {
        method: 'POST',
        body: JSON.stringify({
          poem: post.poem,
          userId: session?.user.id,
          tag: post.tag
        })
      })

      if (res.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleCreatePoem}
    />
  )
}

export default CreatePoem