import { useState } from 'react';
import './style.css'
import profile_icon from 'assets/profileimage.png'

const Profile = () => {
    const [editing, setEditing] = useState(false);

  return (
    <div className='container'>
        <button className='edit-button' onClick={()=> {setEditing(!editing)}}>
            {editing ? 'Save' : 'Edit'}
            </button>
        <div className='header_image'>
            <img src={profile_icon} alt=''/>
            <input type="file" name='file' id='file' />
            <label htmlFor="file">CHOOSE PIC</label>
        </div>
        <div className='form'>
            <form>
            <label htmlFor="firstname">First Name</label> 
                    <input 
                        type="text"
                        className={!editing ? 'cursor-not-allowed' : '' }
                        disabled={!editing}
                        name="firstname"
                        id="firstname"
                        placeholder="Enter First Name"
                        required 
                    /> 
                    <br /><br /> 
                    <label htmlFor="lastname">Last Name</label> 
                    <input 
                        type="text"
                        className={!editing ? 'cursor-not-allowed' : '' }
                        disabled={!editing}
                        name="lastname"
                        id="lastname"
                        placeholder="Enter Last Name"
                        required 
                    /> 
                    <br /><br /> 
                    <label htmlFor="username">Username</label> 
                    <input 
                        type="text"
                        className={!editing ? 'cursor-not-allowed' : '' }
                        disabled={!editing}
                        name="username"
                        id="username"
                        placeholder="Enter Username"
                        required 
                    /> 
                    <br /><br /> 
                    <label htmlFor="email">Enter Email </label> 
                    <input 
                        type="email"
                        className={!editing ? 'cursor-not-allowed' : '' }
                        disabled={!editing}
                        name="email"
                        id="email"
                        placeholder="Enter Email"
                        required
                    />
                    <br /><br /> 
                    <label htmlFor="phone_number">Contact</label> 
                    <input 
                        type="phone_number"
                        className={!editing ? 'cursor-not-allowed' : '' }
                        disabled={!editing}
                        name="phone_number"
                        id="phone_number"
                        placeholder="Enter Mobile number"
                        required 
                    /> 
                    <br /><br /> 
                    <label htmlFor="address">Enter Address </label> 
                    <input 
                        type="address"
                        className={!editing ? 'cursor-not-allowed' : '' }
                        disabled={!editing}
                        name="address"
                        id="address"
                        placeholder="Enter Address"
                        required
                    />
                    <br /><br /> 
                    <label htmlFor="favorite_genres">Enter Favorite genres </label> 
                    <input 
                        type="favorite_genres"
                        className={!editing ? 'cursor-not-allowed' : '' }
                        disabled={!editing}
                        name="favorite_genres"
                        id="favorite_genres"
                        placeholder="Enter favorite genres"
                        required
                    />
                    <br /><br /> 
                    <label htmlFor="bio" >Enter Bio </label> 
                    <textarea className={!editing ? 'cursor-not-allowed' : '' }
                        disabled={!editing}></textarea>
                    <br /><br /> 
                    <div className='submit'> 
                    <button>Submit</button>
                    </div>
                    
            </form>
        </div>
    </div>
  )
}

export default Profile;
