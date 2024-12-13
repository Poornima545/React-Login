import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Adbello from '../../assets/logo.png';
import './style.css'
// import { error } from 'console';


function Login() {
    const { register, handleSubmit, formState, reset } = useForm()
    const { errors } = formState;

    //it handles the form submission
    const onSubmit = (data) => {
        alert('Form is Submitted')
        console.log(data);
        reset();
    };

    return (
        <div id='login-container'>
            <img src={Adbello} alt='adbello logo' className='logo' />
            <form onSubmit={handleSubmit(onSubmit)} className='input-grp'>
                <input
                    type='email'
                    placeholder='Email'
                    {...register('email', {
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Invalid email'
                        }
                    })}
                    required
                />
                {errors.email && <div className='error'>{errors.email.message}</div>}
                <br />
                <input type='password'
                    placeholder='Password'
                    {...register('password', {
                        required: 'Password is required',
                        pattern: {
                            value: /^.{6,}$/,
                            message: 'Password must contain at least 6 characters'
                        }
                    })}
                    required
                />
                {errors.password && <div className='error'>{errors.password.message}</div>}
                <br />
                <p className='forgot-password'>
                    <Link to='/forgot-password'>Forgot Password?</Link>
                </p>
                <button type='submit' className='login-btn'>Login</button>
                <p className='register-link'>
                    Not a member yet? <Link to="/register">Register</Link>
                </p>
            </form>
        </div >
    )
}


export default Login;

