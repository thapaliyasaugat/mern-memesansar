import "./Register.css"
import { Link } from 'react-router-dom'
import { useRef } from "react"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import { publicRequest } from "../../requestMethod"
const Register = () => {
    const navigate = useNavigate();
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const btnClick = async (e) => {
        e.preventDefault();
        if (password.current.value === confirmPassword.current.value) {
            const data = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                publicRequest.post('/auth/register', data)
                navigate("/")
            } catch (error) {
                toast("Something went wrong.")
            }
        } else {
            toast.error("password's doesn't match")
        }
    }

    return (
        <div className="register">
            <div className="register-container">
                <div className="register-title">
                    MemeSansar
                </div>
                <div className="register-form">
                    <label>User Name</label>
                    <input type="text" required ref={username} />
                    <label>Email address</label>
                    <input type="email" required ref={email} />
                    <label>Password</label>
                    <input type="password" required ref={password} min={6} />
                    <label>Confirm Password</label>
                    <input type="password" required ref={confirmPassword} min={6} />
                </div>
                <button className="register-button" onClick={btnClick}>Register</button>
                <p>Already have an account? <Link className="registerLink" to="/">Login Now</Link> </p>
            </div>
        </div>
    )
}

export default Register