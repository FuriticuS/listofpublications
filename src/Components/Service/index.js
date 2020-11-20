import axios from 'axios';

const url = 'http://jsonplaceholder.typicode.com';
const users = `${url}/users`;
const posts = `${url}/posts`;

//name-users
export const fetchUsers = async () => {
    try{
        const response = await axios(users)

        response.data.map( users => ({
            id: users.id,
            name: users.name
        }))

        return response.data
    }
    catch(error) {
        console.log(error)
    }
}

//posts
export const fetchPosts = async () => {
    try{
        const response = await axios(posts)

        response.data.map( posts => ({
            userId :posts.userId,
            id: posts.id,
            title: posts.title,
            body: posts.body
        }))

        return response.data
    }
    catch(error) {
        console.log(error)
    }
}
