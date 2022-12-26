const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
  let likes = 0;
  for (let i = 0; i < blogs.length; i++) {
    likes += blogs[i].likes
  }
  return likes
}

const mostLikes = (blogs) => {
  let blog = blogs[0]
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > blog.likes) {
      blog = blogs[i]
    }
  }
  return blog
}

module.exports = {
	dummy,
  totalLikes,
  mostLikes
}
