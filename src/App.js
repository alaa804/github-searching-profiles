import React ,{  useState , useEffect , Fragment }  from 'react'
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import NotFound from './components/pages/NotFound';
import './App.css';
import axios from 'axios';

const  App = () => {
const [users , setUsers] = useState([]);
const [user , setUser] = useState({});
const [repos, setRepos] = useState([]);
const [loading , setLoading] = useState(false);
const [alert , setAlert] = useState(null);


 useEffect(() => {
  setLoading(true)
  const FetchUsers = async () => {
  const { data } = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    setUsers(data)
  }
  FetchUsers()
   setLoading(false)
 },[])


    //  Search Github Users
   const searchUsers = async text => {
   setLoading(true)
     const { data } = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

   setUser(data.items)
   setLoading(false)

   }

  //  Get Users repos
   const getUserRepos = async username => {
         setLoading(true)
     const { data } = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

 setRepos(data)
 setLoading(false)
   }

// GET a single Github user
const getUser = async username => {
 setLoading(true)
     const { data } = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
setUser(data)
setLoading(false)
}


// Clear users from state
const clearUsers = () => {
 setUsers([])
 setLoading(false)
}

// set GithubAlert 
const showAlert = (msg , type , timeout = 3000) => {
 setAlert({ msg , type  });

setTimeout(() =>  setAlert(null) , timeout )
}

  return (
 <Router>
    <div className="App">
      <Navbar />
      <div className='container'>
        <Alert alert={alert} />
         <Switch>
           <Route exact path='/' render={props => (
             <Fragment>
                    <Search 
                      searchUsers={searchUsers} 
                      clearUsers={clearUsers} 
                      showClear={users.length > 0 ? true : false} 
                      showAlert={showAlert}
                      />
                    <Users loading = {loading} users ={users}/>
             </Fragment>
           )} />
           <Route exact path='/about' component={About} />
          <Route exact path = '/user/:login' render={props => (
            <User
             {...props}
             getUser={getUser} 
             user={user}
             getUserRepos={getUserRepos}
             repos={repos}
             loading={loading}/>
          )} />
          <Route component={NotFound} />
         </Switch>
     </div>
    </div> 
</Router> 
   );

}

export default App;
