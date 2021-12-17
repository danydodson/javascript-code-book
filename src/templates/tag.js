import React from 'react'
import { Link, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TagTemplate = ({ pageContext, data, location }) => {

  const { tag } = pageContext
  const { edges } = data.allMarkdownRemark

  return (
    <StyledTagsContainer>
      <div><Link to='/'>Home</Link></div>
      <h1>
        <span>#{tag}</span>
        <span><Link to='/tags'>View all tags</Link></span>
      </h1>
      <ul>
        {edges.map(({ node }) => {
          const { title, slug, date, tags } = node.frontmatter
          return (
            <li key={slug}>
              <h2><Link to={`/posts/${slug}/`}>{title}</Link></h2>
              <p>
                <time>
                  {new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span>&nbsp;&mdash;&nbsp;</span>
                {tags &&
                  tags.length > 0 &&
                  tags.map((tag, i) => (
                    <Link key={i} to={`/tags/${tag}/`}>
                      #{tag}
                    </Link>
                  ))}
              </p>
            </li>
          )
        })}
      </ul>
    </StyledTagsContainer>
  )
}

TagTemplate.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
  location: PropTypes.object,
}

export default TagTemplate

export const pageQuery = graphql`
  query ($tag: String!) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            slug
            tags
            date
          }
        }
      }
    }
  }
`

const StyledTagsContainer = styled.main`
  max-width: 1000px;  
`
