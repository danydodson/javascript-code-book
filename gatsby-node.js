exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const postTemplate = require.resolve(`./src/templates/post.js`)
  const tagTemplate = require.resolve(`./src/templates/tag.js`)

  const response = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/posts/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
              tags
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  if (response.errors) {
    reporter.panicOnBuild(`🙅 🚫 → ${response.errors}`)
    return Promise.reject(response.errors)
  }

  console.info(JSON.stringify(response, null, 2))

  const posts = response.data.postsRemark.edges

  posts.forEach(({ node }) => {
    createPage({
      path: `/posts/${node.frontmatter.slug}/`,
      component: postTemplate,
      context: {
        slug: node.frontmatter.slug
      }
    })
  })

  const tags = response.data.tagsGroup.group

  tags.forEach((tag) => {
    createPage({
      path: `/tags/${tag.fieldValue}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue
      }
    })
  })
}
