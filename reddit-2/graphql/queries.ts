import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
    query getAllPostsQuery{
        getPostList {
            body
            created_at
            id
            image
            title
            subreddit_id
            username
            comments {
                created_at
                id
                post_id
                text
                username
            }
            subreddit {
                created_at
                id
                topic
            }
            votes {
                created_at
                id
                post_id
                upvote
                username
            }
        }
    }
`

export const GET_SUBREDDIT_BY_TOPIC = gql`
query getSubredditQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
        id
        topic
        created_at
    }
}
`