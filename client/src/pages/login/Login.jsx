import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import { useRef } from "react"
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import { Google } from '@mui/icons-material';
import { GoogleLogin } from 'react-google-login';
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const email = useRef();
    const password = useRef();
    const { currentuser, loading, error } = useSelector(state => state.user)
    const btnClick = (e) => {
        e.preventDefault();
        try {
            const data = {
                email: email.current.value,
                password: password.current.value
            }
            login(dispatch, data);

        } catch (error) {
            toast("Something went wrong.");
        }

    }
    const successresponseGoogle = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        console.log(token);
        console.log(result);

        try {

        } catch (error) {
            console.log(error)
            toast("Error signing in with google");
        }
    }
    const failureresponseGoogle = (error) => {
        console.log(error);
        console.log("google login unsuccessfull.")

    }
    return (

        <div className="login">
            <div className="login-container">
                <div className="login-title">
                    MemeSansar
                </div>
                <div className="login-form">
                    <label>Email address</label>
                    <input type="email" required ref={email} />
                    <label>Password</label>
                    <input type="password" required ref={password} />
                </div>
                <button className="login-button" onClick={btnClick}>{!loading ? "Login" : "loading..."}</button>
                {error && <p style={{ color: "#ee2727" }}>Error Logging in.</p>}
                <p>You don't have an account? <Link className="loginLink" to="/register"> Register Now</Link></p>
                <h3 style={{ margin: "20px 0" }}>OR</h3>

                <GoogleLogin
                    clientId="542043003230-2ho424qv0j97dav2l50sigu347qv3055.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <button className="googleLogin" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <Google />
                            <p>Signin with Google</p>
                        </button>
                    )}
                    onSuccess={successresponseGoogle}
                    onFailure={failureresponseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
    )
}

export default Login
