/**
 * GitHub API utility for creating issues
 */

const GITHUB_API_BASE_URL = 'https://api.github.com/'

/**
 * Create a GitHub issue
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string} title - Issue title
 * @param {string} body - Issue body
 * @param {string} token - GitHub personal access token
 * @returns {Promise<Object>} Created issue data
 */
export async function createGitHubIssue(owner, repo, title, body, token) {
  const url = `${GITHUB_API_BASE_URL}repos/${owner}/${repo}/issues`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      title,
      body,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to create issue: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

/**
 * Create a test issue with title "test" and body "test"
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string} token - GitHub personal access token
 * @returns {Promise<Object>} Created issue data
 */
export async function createTestIssue(owner, repo, token) {
  return createGitHubIssue(owner, repo, 'test', 'test', token)
}
