import "./Profile.css"
import Navbar from "../../components/navbar/Navbar"
import Posts from "../../components/posts/Posts"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { userRequest } from "../../requestMethod"
import ProfilePost from "../../components/profilePost/ProfilePost"
import { useSelector } from "react-redux"
const Profile = () => {
    const location = useLocation();
    const userid = location.pathname.split('/')[2]
    const [user, setuser] = useState(null)
    const { currentuser } = useSelector(state => state.user)
    useEffect(() => {
        const fetchuserdata = async () => {
            const user = await userRequest.get(`/users/finduser/${userid}`);
            setuser(user.data);
        }
        fetchuserdata()
    }, [userid])
    return (
        <div className='profile'>
            <div className="profile-container">
                <div className="profile-top">
                    <Navbar />
                </div>
                <div className="profile-body">
                    <div className="profile-left">
                        <div className="profile-left-image">
                            <img src={user?.ProfilePic ? user?.profilePic : "https://media.istockphoto.com/vectors/photo-coming-soon-image-icon-vector-illustration-isolated-on-white-vector-id1193046541?k=20&m=1193046541&s=612x612&w=0&h=XTXTZG9mJPnczJf_U_k2hJqIxu2kc-eRJ0nW1HiV7-8="} alt="" />
                        </div>
                        <div className="profile-left-detail">
                            <h2>{user?.username}</h2>
                            {/* <h3>bio : users info</h3> */}
                            <h3><span style={{ fontWeight: "bold", textDecoration: "none" }}>Joined at</span> {user?.createdAt.substr(0, 10)}</h3>
                            <p>{user?.followers.length} followers</p>
                            <p>{user?.followings.length} followings</p>
                            {userid === currentuser._id && <span>Update profile</span>}
                        </div>
                    </div>
                    <div className="profile-right">
                        <div className="profile-right-posts">
                            <ProfilePost userid={userid} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
