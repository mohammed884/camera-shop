import React,{useState , useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './footer';
import Loading from './loading';
import '../style/account.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';


export default function Account() {

    let [user , setUser] = useState([]);
    let [loading , setLoading] = useState(true);
    const history = useHistory()
    useEffect(() =>
    {
        fetch('http://localhost:8000/user' , {
            method:'GET',
            credentials:'include',
        })
        .then(res => res.json())
        .then(res => {res.isLogin ? setUser([res.user]) : history.push('/login')})
        .catch(err => console.log(err));
        setLoading(false)
    } , []);
    // {res.status === 401 ? setMsg(res) : res.status === 401 ? setUser([]) : setUser(res)}
    if (loading) return(<Loading/>)
    
    const handleLogout = () =>
    {
        fetch(`http://localhost:8000/user/logout` , {
            method:'POST',
            credentials:'include',
        })
        .then(res => history.push('/home'))
        .catch(res => console.log(res));
    } 

    return (
        
        <div className="account-container">
            <div className="max-tech"><h1>Welcome {user.map(user => user.name)} <FontAwesomeIcon icon={faUser}/></h1></div>
            <div className="max-account">
                <div className="top-border"></div>
                <div className="grid-account">
                    <div className="account-dash">
                        {typeof user[0] !== 'undefined' && user[0].isAdmin === true ? <a href="/admin/panel">Admin Panel</a> : ''}
                        <button onClick={handleLogout}>Edit <FontAwesomeIcon icon={faSignOutAlt} style={{transform:'rotate(180deg)'}}/></button>
                        <button onClick={handleLogout}>Logout <FontAwesomeIcon icon={faSignOutAlt} style={{transform:'rotate(180deg)'}}/></button>
                    </div>
                    <div className="account-info">
                        {user.map(user =>
                            <div className="account-info">
                                <div>{user.name}</div>
                                <div>{user.email}</div>
                                
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
