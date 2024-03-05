import React from 'react'
import './Profile.css'
import profile_icon from '../Assets/Profileimage.png'

export const Profile = () => {
  return (
    <div className='container'>
        <div className='header_image'>
            <img src={profile_icon} alt=''/>
        </div>
        <div className='form'>
            <form>
            <label for="firstname">First Name</label> 
                    <input 
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="Enter First Name"
                        required 
                    /> 
                    <br /><br /> 
                    <label for="lastname">Last Name</label> 
                    <input 
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Enter Last Name"
                        required 
                    /> 
                    <br /><br /> 
                    <label for="username">Username</label> 
                    <input 
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter Username"
                        required 
                    /> 
                    <br /><br /> 
                    <label for="email">Enter Email </label> 
                    <input 
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Email"
                        required
                    />
                    <br /><br /> 
                    <label for="phone_number">Contact</label> 
                    <input 
                        type="phone_number"
                        name="phone_number"
                        id="phone_number"
                        placeholder="Enter Mobile number"
                        required 
                    /> 
                    <br /><br /> 
                    <label for="address">Enter Address </label> 
                    <input 
                        type="address"
                        name="address"
                        id="address"
                        placeholder="Enter Address"
                        required
                    />
                    <br /><br /> 
                    <label for="favorite_genres">Enter Favorite genres </label> 
                    <input 
                        type="favorite_genres"
                        name="favorite_genres"
                        id="favorite_genres"
                        placeholder="Enter favorite genres"
                        required
                    />
                    <br /><br /> 
                    <label for="bio">Enter Bio </label> 
                    <textarea></textarea>
                    <br /><br /> 
                    <div className='submit'> 
                    <button>Submit</button>
                    </div>
                    
            </form>
        </div>
    </div>
  )
}
