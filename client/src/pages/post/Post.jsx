import { ChatBubbleOutlineOutlined, ReplyAll, ThumbUpOutlined } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from "../../components/navbar/Navbar"
import { useLocation } from "react-router-dom"
import { userRequest } from "../../requestMethod"
import "./Post.css"
import { toast } from 'react-toastify'
import { format } from 'timeago.js'

const ShowPost = ({ data }) => {
    const [user, setuser] = useState(null)
    // console.log(data);
    useEffect(() => {
        const fetchUser = async () => {
            const userdata = await userRequest.get(`/users/finduser/${data.userId}`);
            // console.log("userdata", userdata);
            setuser(userdata.data);
        }
        fetchUser()
    }, [data])
    return (
        <div className="post-page-comment">
            <div className="post-page-comment-top">
                <Avatar sx={{ width: 56, height: 56 }}>{user?.username[0]}</Avatar>
                <div className="post-page-comment-userdet">
                    <h3>{user?.username}</h3>
                    <p>{format(data?.createdAt)}</p>
                </div>
            </div>
            <div className="post-page-comment-text">
                {data.text}

            </div>
        </div>
    )
}

const Post = () => {
    const location = useLocation();
    const [post, setPost] = useState(null)
    const [userdata, setuserdata] = useState(null)
    const commentData = useRef()
    useEffect(() => {
        const postId = location.pathname.split("/")[2]
        const fetchPost = async () => {
            const postdata = await userRequest.get(`posts/${postId}`)
            // console.log(postdata.data);
            setPost(postdata.data)
        }
        fetchPost()
    }, [location])
    useEffect(() => {
        const fetchUser = async () => {
            // console.log(post.userId);
            const userData = await userRequest.get(`/users/finduser/${post.userId}`)
            // console.log(userData.data);
            setuserdata(userData.data)
        }
        post && fetchUser()
    }, [post])

    const commentClicked = async () => {
        try {
            await userRequest.post(`/posts/comment/${post._id}`, {
                text: commentData.current.value
            })
            window.location.reload(true); // remaning : component reload-state mgmt 
            toast("comment sucessfull.")
        } catch (error) {
            toast("Error Commenting.")
        }
    }
    return (
        <div className='post-page'>
            <div className="post-page-container">
                <div className="post-page-top">
                    <Navbar />
                </div>
                <div className="post-page-body">
                    <div className="post-page-left">
                        <div className="post-page-left-image">
                            <img src={post?.image ? post.image : "https://previews.123rf.com/images/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016/167492439-no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-comin.jpg"} alt="" />
                        </div>
                        <div className="post-page-bottom">
                            <div className="post-page-bottom-item">

                                <p>{post?.likes.length > 0 && post.likes.length}</p>
                                <ThumbUpOutlined className="post-page-bottom-sign post-page-bottom-like" />
                            </div>
                            <div className="post-page-bottom-item">
                                <p>{post?.comments.length > 0 && post.comments.length}</p>
                                <ChatBubbleOutlineOutlined className="post-page-bottom-sign" />
                            </div>
                            <div className="post-page-bottom-item">
                                <p>3</p>
                                <ReplyAll className="post-page-bottom-sign" />
                            </div>
                        </div>
                    </div>
                    <div div className="post-page-right" >
                        <div className="post-page-right-top">
                            <Avatar sx={{ width: 56, height: 56 }}>{userdata?.username[0]}</Avatar>
                            <div className="post-page-right-top-right">
                                <h3>{userdata?.username}</h3>
                                <p>{format(post?.createdAt)}</p>
                            </div>
                        </div>
                        <div className="post-page-right-text">
                            {post?.desc}
                        </div>
                        <div className="post-page-create-comment">
                            <textarea ref={commentData} placeholder='What do you think about this?' required></textarea>
                            <button onClick={commentClicked}>Comment</button>
                        </div>
                        <h3 style={{ margin: ".4rem 0", color: "var(--gray)" }}>Comments</h3>
                        <div className="post-page-right-comment">
                            {post?.comments.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt))).map((comment) => (
                                <ShowPost data={comment} />
                            ))}
                        </div>

                    </div >
                </div >
            </div >
        </div >
    )
}

export default Post
