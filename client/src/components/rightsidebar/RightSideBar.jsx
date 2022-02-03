import { Avatar } from "@mui/material"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { userRequest } from "../../requestMethod"
import { useNavigate } from 'react-router-dom'
import "./RightSideBar.css"

const FriendDetail = ({ detail }) => {
    const [friend, setfriend] = useState(null);
    const [follow, setfollow] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchFriend = async () => {
            const friend = await userRequest(`/users/finduser/${detail}`)
            setfriend(friend.data)
        }
        fetchFriend()
    }, [detail]);
    const followClick = async () => {
        await userRequest.put(`/users/follow/${detail}`)
        // console.log("follow clicked");
        setfollow(!follow)
    }
    return (
        <div className="rightsidebar-item">
            <div className="rightsidebar-item-left" onClick={() => navigate(`/profile/${friend?._id}`)}>
                <Avatar sx={{ width: 56, height: 56 }}>{friend?.username[0]}</Avatar>
                <h3>{friend?.username}</h3>
            </div>
            <div className="rightsidebar-item-right">
                <button className={follow && "rightsidebar-follow-btn"} onClick={followClick}>{!follow ? "follow" : "followed"}</button>
            </div>
        </div>
    )
}

const RightSideBar = () => {
    const [friend, setFriend] = useState([])
    const { currentuser } = useSelector(state => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchFriend = async () => {
            const friends = await userRequest("/users/suggestion");
            setFriend(friends.data);
            // console.log(friends.data);
        }
        fetchFriend()
    }, [])
    return (
        <div className="rightsidebar">
            <div className="rightsidebar-container">
                <div className="rightsidebar-top" onClick={() => navigate(`/profile/${currentuser._id}`)}>
                    <Avatar sx={{ width: 56, height: 56 }}>{currentuser.username[0]}</Avatar>
                    <h3>{currentuser.username}</h3>
                </div>
                <div className="rightsidebar-bottom">
                    <h2>Who to Follow</h2>
                    {friend.map(friend => (
                        <FriendDetail detail={friend} key={friend} />
                    ))}
                    <h4>2022 @Saugat_Thapaliya</h4>
                </div>
            </div>

        </div>
    )
}

export default RightSideBar
