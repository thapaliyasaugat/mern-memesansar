import { ChatBubbleOutlineOutlined, MoreHoriz, ReplyAll, ThumbUp, ThumbUpOutlined } from "@mui/icons-material"
import { Avatar } from "@mui/material"
import { useEffect, useState } from "react"
import { userRequest } from "../../requestMethod"
import { format } from "timeago.js"
import "./Post.css"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Post = ({ data }) => {
    // console.log("data", data);
    const [like, setlike] = useState(false)
    const { currentuser } = useSelector(state => state.user)
    const navigate = useNavigate()
    const [user, setuser] = useState([])
    useEffect(() => {
        if (data.likes.includes(currentuser._id)) {
            setlike(true)
        }
        const fetchUser = async () => {
            const userData = await userRequest.get(`/users/finduser/${data.userId}`)
            setuser(userData.data)
        }
        fetchUser()
    }, [data])
    const likeClicked = async () => {
        // console.log("like clicked");
        // console.log(data._id);
        await userRequest.put(`/posts/like/${data._id}`)
        setlike(!like)
    }
    const postClicked = async () => {
        navigate(`/post/${data._id}`)
    }
    const shareClicked = async () => {
        await userRequest.put(`/posts/sharepost/${data._id}`);
        window.location.reload(true);
    }
    return (
        <div className="post">
            <div className="post-container">
                <div className="post-top">
                    <div className="post-top-left" onClick={() => navigate(`/profile/${user?._id}`)}>
                        {!user.profilePic ? <Avatar sx={{ width: 56, height: 56 }}>{user.username?.substr(0, 1)}</Avatar> :
                            <Avatar sx={{ width: 56, height: 56 }} src={user?.profilePic} />
                        }
                        <div className="post-top-left-right">
                            <h3>{user.username}</h3>
                            <p>{format(data.createdAt)}</p>
                        </div>
                    </div>
                    <div className="post-top-right">
                        <MoreHoriz />
                    </div>
                </div>
                <div className="post-body" onClick={postClicked}>
                    <div className="post-body-content">
                        {data.desc}
                    </div>
                    <div className="post-body-image">
                        {data.image && <img src={data.image} />}
                    </div>
                </div>
                <div className="post-like-detail">
                    {/* {data.likes.length > 0 ? data.likes.length : "No"} people like this post. */}
                    {data.likes.length > 0 && <p>{data.likes.length} people like this post.</p>}
                </div>
                <div className="post-bottom">
                    <div className="post-bottom-item" onClick={likeClicked}>
                        {!like ? <ThumbUpOutlined className="post-bottom-sign post-bottom-like" />
                            : <ThumbUp className="post-bottom-sign post-bottom-like" />}</div>
                    <div className="post-bottom-item" onClick={postClicked}>
                        <p>{data.comments.length > 0 ? data.comments.length : ""}</p>
                        <ChatBubbleOutlineOutlined className="post-bottom-sign" />
                    </div>
                    <div className="post-bottom-item" onClick={shareClicked}>
                        <p>{data.sharedBy.length > 0 ? data.sharedBy.length : ""}</p>
                        <ReplyAll className="post-bottom-sign" />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Post
