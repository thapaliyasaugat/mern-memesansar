import { useEffect, useState } from "react"
import { userRequest } from "../../requestMethod"
import Post from "../post/Post"
const ProfilePost = ({ userid }) => {
    const [myPost, setMyPost] = useState([])
    useEffect(() => {
        const fetchpost = async () => {
            const posts = await userRequest.get(`posts/profile/${userid}`);
            setMyPost(posts.data.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }))
        }
        fetchpost()
    }, [userid])
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

export default ProfilePost
