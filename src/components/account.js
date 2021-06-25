import React,{useState , useEffect, useRef} from 'react'
export default function Account() {

    const [user , setUser] = useState([]);
    useEffect(() =>
    {
        fetch('http://localhost:8000/user' , {
            method:'GET',
            credentials:'include',
        })
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.log(err));
    } , []);
    const container = useRef()
    if (typeof user[0] !== 'undefined')
    {
        if (user[0].isAdmin === true)
        {
            const link = document.createElement('a');
            link.href = '/admin/panel';
            link.innerHTML = 'Admin Panel'
            container.current.append(link)
        }
    }
    return (
        <div ref={container}>
            {user.length < 1 ? 'Please Login' : true}
            {user.map(user =>
                <div >
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                </div>
                )}
        </div>
    )
}
