'use client'

import { useState, useEffect } from 'react'

import PoemCard from './PoemCard'

const PoemCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 poem_layout'>
      {data.map(post => (
        <PoemCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [allPosts, setAllPosts] = useState([])

  // Search states
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([])

  const fetchPosts = async () => {
    const response = await fetch('/api/poem')
    const data = await response.json()

    setAllPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const filterPoems = searchtext => {
    const regex = new RegExp(searchtext, 'i') // 'i' flag for case-insensitive search
    return allPosts.filter(
      item =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.poem)
    )
  }

  const handleSearchChange = e => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPoems(e.target.value)
        setSearchedResults(searchResult)
      }, 500)
    )
  }

  const handleTagClick = tagName => {
    setSearchText(tagName)

    const searchResult = filterPoems(tagName)
    setSearchedResults(searchResult)
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Poems */}
      {searchText ? (
        <PoemCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <PoemCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed
