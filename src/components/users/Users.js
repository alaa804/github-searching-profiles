import React from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner.js'
import PropTypes from 'prop-types'

 const Users = ({  users , loading }) => {
  
return loading ? (<Spinner />) : (
    <div style={userStyle}>
                {users.map((user) => (
                   <UserItem key={user.id} user={user} />
                ))}
            </div>
)
        
}

Users.propTypes = {
    users : PropTypes.array.isRequired,
    loading : PropTypes.bool.isRequired,
}  

const userStyle= {
    display: 'grid',
    gridTemplateColumns: 'repeat(3 , 1fr)',
    gridgap : '1rem'
}


export default Users
