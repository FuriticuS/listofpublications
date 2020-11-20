import React, {useEffect, useState} from 'react';
import Filter from "./Components/Filter/Filter";
import {block} from 'bem-cn';
import axios from "axios";
import {fetchPosts, fetchUsers} from "./Components/Service";

import './app.scss';

import loader from './img/spinner.gif';

const cn = block('container');


function App() {

    const [posts, setPosts] = useState([]);
    const [name, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAPI = async () => {
            setPosts(await fetchPosts())
            setUsers(await fetchUsers())
            setIsLoading(false);
        }
        fetchAPI();
    }, []);

    //name author
    const nameList = name.map((item, index) => {
        return (
            <div key={index} id={item.id} className="col-lg-4 col-md-4 col-sm-6 mb-3">
                <div className={cn("posts")}>
                    {item.name}
                </div>
            </div>
        )
    })

    //posts
    const postsList = posts.map((item, index) => {
        return (
            <div key={index} className="col-lg-4 col-md-4 col-sm-6 mb-3">
                <div className={cn("posts")}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                </div>
            </div>
        )
    })

    // search
    const [query, setQuery] = useState('');
    const [result, setResult] = useState('');
    const url = `http://jsonplaceholder.typicode.com/users?name=${query}`;
    useEffect(() => {
        const fetchAPI = async () => {
            let result = await axios(url);

            setResult(result.data.map((items) => {
                    return items.name;
                }
            ))

            setUsers(result.data);
            return result.data;
        }
        fetchAPI();
    }, [query]);

    return (
        <div className={cn()}>

            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 offset-lg-4 offset-md-4 offset-sm-0">
                    <Filter getQuery={(q) => setQuery(q)} result={result}/>
                </div>
            </div>


            {
                isLoading
                    ? <img className={cn("loader")} src={loader} alt="load"/>
                    : <div className="row">
                        {postsList}
                        {nameList}
                    </div>
            }

        </div>
    );
}

export default App;
