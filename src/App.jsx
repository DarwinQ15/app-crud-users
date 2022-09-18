import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import UserForm from './components/UserForm'
import UsersList from './components/UsersList'

function App() {
  const [users, setUser] = useState([])
  const [usersSelect, setUsersSelect] = useState(null)

  useEffect(()=>{
    axios.get('https://users-crud1.herokuapp.com/users/')
    .then((res)=> setUser(res.data))
  },[])

  const getUsers = ()=>{
    axios.get('https://users-crud1.herokuapp.com/users/')
    .then((res)=> setUser(res.data))
  }
  console.log(users);

  const selectUsers = (user)=>{
      setUsersSelect(user)
  }

  const deselectUsers = () => setUsersSelect(null)

  return (
    <div className="App">
      <UserForm getUsers={getUsers} usersSelect={usersSelect} deselectUsers={deselectUsers}/>
      <UsersList getUsers={getUsers} users={users} selectUsers={selectUsers} />
    </div>
  )
}

export default App
