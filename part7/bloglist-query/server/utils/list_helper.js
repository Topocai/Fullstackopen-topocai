const dummy = (blogs) => {
    return 1
}

const totalLikes = (initialBlogs) => {
    const blogs = initialBlogs.length ? initialBlogs : [initialBlogs]
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (mostLiked, blog) => {
        return mostLiked.likes > blog.likes ? mostLiked : blog
    }

    const mostLiked = blogs.reduce(reducer, blogs[0])
    delete mostLiked.__v
    delete mostLiked._id
    delete mostLiked.likes
    return mostLiked
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}