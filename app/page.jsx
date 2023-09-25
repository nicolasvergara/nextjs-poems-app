import Feed from '@components/Feed'

const Home = async () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden' />
        <span className='metal_gradient text-center'> Poems</span>
      </h1>
      <p className='desc text-center'>
        Join us to unleash your inner poet. Post and read poems from a global
        community of verse lovers. Start sharing your poetic soul today!
      </p>

      <Feed />
    </section>
  )
}

export default Home
