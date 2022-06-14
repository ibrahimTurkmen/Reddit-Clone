import { gql } from "@apollo/client";

export const ADD_POST = gql`
mutation AddPostMutation(
    $body: String!
    $image: String!
    $subreddit_id: ID!
    $title: String!
    $username: String!
) {
    insertPost(
        body: $body
        image:$image
        subreddit_id:$subreddit_id
        title: $title
        username: $username
    ){
        body
        created_at
        id
        image
        title
        username
        subreddit_id
    }
}
`


export const ADD_SUBREDDIT = gql`
mutation AddSubredditMutation($topic: String!){
    insertSubreddit(topic: $topic) {
        id
        topic
        created_at
    }
}

`