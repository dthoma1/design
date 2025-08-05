import React, {useState} from 'react'
import {Box, Button, Text, Flash} from '@primer/components'
import {createTestIssue} from '../utils/github-api'

/**
 * Component for creating a test issue with title "test" and body "test"
 */
export default function IssueCreator() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleCreateIssue = async () => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      // For this demo, we'll use the current repository
      const owner = 'dthoma1'
      const repo = 'design'

      // In a real application, this would come from environment variables or user input
      // For this demo, we're showing the structure but would need a token
      const token = process.env.GITHUB_TOKEN || 'YOUR_GITHUB_TOKEN_HERE'

      if (token === 'YOUR_GITHUB_TOKEN_HERE') {
        throw new Error('GitHub token not configured. Please set GITHUB_TOKEN environment variable.')
      }

      const issue = await createTestIssue(owner, repo, token)
      setResult(issue)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box p={4}>
      <Text as="h2" fontSize={4} mb={3}>
        Create Test Issue
      </Text>

      <Text mb={3}>This will create a GitHub issue with title "test" and body "test".</Text>

      <Button onClick={handleCreateIssue} disabled={isLoading} mb={3}>
        {isLoading ? 'Creating Issue...' : 'Create Test Issue'}
      </Button>

      {error && (
        <Flash variant="danger" mb={3}>
          <Text>{error}</Text>
        </Flash>
      )}

      {result && (
        <Flash variant="success">
          <Text>
            Successfully created issue #{result.number}: "{result.title}"
          </Text>
          <Text>
            <a href={result.html_url} target="_blank" rel="noopener noreferrer">
              View Issue
            </a>
          </Text>
        </Flash>
      )}
    </Box>
  )
}
