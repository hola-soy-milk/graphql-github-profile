import { 
  useQuery,
  gql
} from '@apollo/client';

const PROFILE_REQUEST = gql`
query ProfileLookup($username: String!){ 
    user(login: $username) {
      name
      avatarUrl
      repositories(first: 50) {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;

export default function Profile({username}) {
    const { loading, error, data } = useQuery(PROFILE_REQUEST, {variables: {
        username: username
    }});
    if (loading) {
        return <h1>Hey I'm loading, one sec!</h1>
    }
    if (error) {
        return <h1>No bueno! {error.message}</h1>
    }
    return (<>
        <h1>{data.user.name}</h1>
        <img alt="GitHub user's profile photograph"src={data.user.avatarUrl}></img>
        <ul>
            {data.user.repositories.edges.map(({node}) => <li key={node.id}>{ node.name }</li>)}
        </ul>
    </>)
}