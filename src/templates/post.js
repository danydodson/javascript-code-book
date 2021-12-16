import React from 'react'
import { Link, graphql } from 'gatsby'
import PropTypes from 'prop-types'

const PostTemplate = ({ data }) => {

  const { frontmatter, html } = data.markdownRemark
  const { title, date, tags } = frontmatter

  return (
    <div className='blog-post-container'>
      <div className='blog-post'>
        <div><Link to='/'>Home</Link></div>
        <h1>{title}</h1>
        <h2>{date}</h2>
        <div>
          {tags &&
            tags.length > 0 &&
            tags.map((tag, i) => (
              <Link
                key={i}
                to={`/tags/${tag}/`}
                className='tag'
              >
                #{tag}
              </Link>
            ))}
        </div>
        <div
          className='blog-post-content'
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

PostTemplate.propTypes = {
  data: PropTypes.object
}

export default PostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(
      frontmatter: { slug: { eq: $slug } }
    ) {
      html
      frontmatter {
        title
        slug
        tags
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
