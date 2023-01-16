import { gql } from "apollo-server";

export default gql`
    type User {
        id: Int!
        username:  String!
        email:     String!
        name:      String
        location:  String
        password:  String!
        avatarURL: String
        githubUsername:  String
        followers: [User]
        following: [User]
        totalFollowers: Int!
        totalFollowing: Int!
        isFollowing: Boolean!
        isMe: Boolean!
        createAt: String!
        updateAt: String!    
    }
`;
