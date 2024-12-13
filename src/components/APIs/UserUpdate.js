import { useNavigate, useParams } from "react-router-dom";
import { getUsers, updateUser } from "./userService";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import './style.css'


function UserUpdate() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const navigate = useNavigate()
    const { id } = useParams()

    const fetchUsers = async () => {
        try {
            const response = await getUsers(id)
            const userData = response.data;
            setValue('email', userData.email)
            setValue('fullName', userData.fullName)
            setValue('reason', userData.reason)
            setValue('phone', userData.phone)
            console.log(userData);
        } catch (error) {
            console.error('There was an error fetching the user!', error);
        }
    }

    useEffect(() => {
        fetchUsers();
    })

    const onSubmit = async (data) => {
        try {
            await updateUser(id, data)
            alert('User Email is Updated')
            navigate('/manage-data')
        } catch (error) {
            console.error('There was an error updating the user!', error);
        }
    }

    return (
        <div className="update-container">
            <h2>Update User</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type='email'
                    className='form-control'
                    placeholder='Your Email'
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
                <input type='text'
                    className='form-control'
                    placeholder="Full Name"
                    {...register('fullName', {
                        required: 'Name is required'
                    })}
                    required
                />
                {errors.fullName && <div className='error'>{errors.fullName.message}</div>}
                <br />
                <select className="form-select"
                    {...register('reason', {
                    })}
                    required
                >
                    <option selected>I'm here to...</option>
                    <option value='1'>Learn to Front-end developer</option>
                    <option value='2'>Learn to Back-end developer</option>
                    <option value='3'>Learn to SQL developer</option>
                </select>
                {errors.reason && <div className='error'>{errors.reason.message}</div>}
                <br />
                <input
                    type='tel'
                    className='form-control'
                    placeholder='Phone Number'
                    {...register('phone', {
                        pattern: {
                            value: /^\d{10}$/,
                            message: 'Phone number must be 10 digits'
                        }
                    })}
                    required
                />
                {errors.phone && <div className='error'>{errors.phone.message}</div>}
                <br />
                <input type='password'
                    className='form-control'
                    id='password'
                    placeholder='Your Password'
                    {...register('password', {
                        pattern: {
                            value: /^.{6,}$/,
                            message: 'Password must contain at least 6 characters'
                        }
                    })}
                    required
                />
                {errors.password && <div className='error'>{errors.password.message}</div>}
                <br />
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>

    )
}

export default UserUpdate;