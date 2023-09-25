'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'

const UpdatePoem = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const poemId = searchParams.get('id')

  const [post, setPost] = useState({ poem: '', tag: '' })
  const [submitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const getPoemDetails = async () => {
      const response = await fetch(`/api/poem/${poemId}`)
      const data = await response.json()

      setPost({
        poem: data.poem,
        tag: data.tag
      })
    }

    if (poemId) getPoemDetails()
  }, [poemId])
  prompt
  const updatePoem = async e => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!poemId) return alert('Missing PoemId!')

    try {
      const response = await fetch(`/api/poem/${poemId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          poem: post.poem,
          tag: post.tag
        })
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePoem}
    />
  )
}

export default UpdatePoem
