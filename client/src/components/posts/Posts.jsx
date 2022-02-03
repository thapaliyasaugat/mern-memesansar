import { useEffect, useState } from "react"
import { userRequest } from "../../requestMethod"
import "./Posts.css"
import Post from "../post/Post"
const Posts = () => {
    const [myPost, setMyPost] = useState([])
    useEffect(() => {
        const fetchpost = async () => {
            const posts = await userRequest.get("posts/timeline/posts");
            console.log(posts.data);
            setMyPost(posts.data.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }))
        }
        fetchpost()
    }, [])
    return (
        <div className="posts">
            <div className="posts-container">
                {
                    myPost.map(singlePost => (
                        <Post data={singlePost} />
                    ))
                }
            </div>
        </div>
    )
}

export default Posts
