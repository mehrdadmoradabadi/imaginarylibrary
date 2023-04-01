import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Header from './Header'
import MainFeaturedPost from './MainFeaturedPost'
import FeaturedPost from './FeaturedPost'
import Footer from './Footer'

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' }
]

const mainFeaturedPost = {
  title: 'Welcome to my Library',
  description:
    "The Imaginary Library is a fictional library created for the purpose of this conversation. As an imaginary library, it doesn't actually exist in the real world. However, we can describe some of its hypothetical features based on common library practices and trends.",
  image: './library.jpg',
  imageText: 'welcome'
}

const featuredPosts = [
  {
    title: 'The Magic of Books: Discover New Worlds Through Reading',
    date: 'Nov 12',
    description:
      "There's nothing quite like getting lost in a good book. Whether it's a thrilling mystery, a heartwarming romance, or a thought-provoking memoir, books have the power to transport us to new worlds and broaden our perspectives.",
    image: './f-book-1.jpg',
    imageLabel: 'Magic of Books'
  },
  {
    title: 'The Brain-Boosting Benefits of Reading',
    date: 'Nov 11',
    description:
      "Reading isn't just a fun pastime - it's also great for your brain! Studies have shown that regular reading can improve cognitive function, increase empathy, and reduce stress.",
    image: './f-book-2.jpg',
    imageLabel: 'Brain-Boosting Benefits of Reading'
  }
]

const theme = createTheme()

export default function Blog() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Imaginary Library" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
      <Footer
        title="Thank you"
        description="Thank you for visiting the Imaginary Library! We hope you found what you were looking for and enjoyed your experience with us. Remember, the library is always here for you, whether you're looking for a good book to read, a virtual event to attend, or a friendly face to talk to. Keep exploring, keep learning, and keep reading!"
      />
    </ThemeProvider>
  )
}
