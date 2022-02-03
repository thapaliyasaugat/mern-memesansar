import React, { useState } from "react";
import "./Navbar.css"
import { Badge } from "@mui/material"
import { Home, Mail, MenuRounded, Notifications } from "@mui/icons-material"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/apiCalls"
import { useDispatch, useSelector } from "react-redux";
const Navbar = () => {
    const [navBtn, setNavbtn] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const dispatch = useDispatch();
    const { currentuser } = useSelector(state => state.user)
    const logoutClicked = () => {
        logout(dispatch)
    }
    const navigate = useNavigate();
    const profileClicked = () => {
        navigate(`/profile/${currentuser._id}`)
    }
    return (
        <div className="navbar">
            <div className="navbar-container">
                <Link to="/home" className="navbar-left">
                    MemeSansar
                </Link>
                <div className={!navBtn ? "navbar-right" : "navbar-right navbar-right-small"}>
                    <Link to="/home" className="navbar-right-content">
                        <Home className="nav-icon" />
                    </Link>
                    <div className="navbar-right-content">
                        <Badge badgeContent={2} color="info">
                            <Mail className="nav-icon" />
                        </Badge>
                    </div>
                    <div className="navbar-right-content">
                        <Notifications className="nav-icon" />
                    </div>
                    <div className="navbar-right-content">
                        <Button
                            onClick={handleClick}
                            style={{ fontSize: '1.2rem', color: 'var(--dark)' }}
                        >
                            {currentuser.username}
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}

                        >
                            <MenuItem onClick={handleClose}><span onClick={profileClicked}>Profile</span></MenuItem>
                            {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                            <MenuItem onClick={handleClose}><span onClick={logoutClicked}>Logout</span></MenuItem>
                        </Menu>
                    </div>

                </div>
                <div className="navbar-right-right" onClick={() => setNavbtn(!navBtn)}>
                    <MenuRounded className="nav-icon nav-menu" />
                </div>
            </div>
        </div>
    )
}

export default Navbar
