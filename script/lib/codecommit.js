const AWS = require('aws-sdk')
const signatureVersion = 'v4'
AWS.config.region = 'ap-southeast-1'
const codecommit = new AWS.CodeCommit({ signatureVersion })
const codeCommitConfig = require('../../codecommit.config.json')

const {
  pullRequestId,
  repositoryName,
  beforeCommitId,
  afterCommitId
} = codeCommitConfig

if (!pullRequestId || !repositoryName || !beforeCommitId || !afterCommitId) {
  console.error('missing required parameters: ')
  console.log('   pullRequestId: ', pullRequestId)
  console.log('   repositoryName: ', repositoryName)
  console.log('   beforeCommitId: ', beforeCommitId)
  console.log('   afterCommitId: ', afterCommitId)
  return
}

const post = (content = 'content is not given') => {
  const params = {
    afterCommitId,
    beforeCommitId,
    content,
    pullRequestId,
    repositoryName
  }

  return codecommit.postCommentForPullRequest(params).promise()
}

module.exports = {
  post
}
