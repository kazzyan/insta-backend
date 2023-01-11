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
        createAt: String!
        updateAt: String!    
    }
    type Query {
        seeProfile(username: String!): User
    }
    type Mutation {
        createAccount(username: String!, email: String!, name: String, password: String!): User
    }
`;
