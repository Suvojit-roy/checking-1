import React,{useEffect, useState} from "react";
import { Button, Jumbotron,Spinner } from "react-bootstrap";
import { Link,useParams } from "react-router-dom";


const Success=(props)=>{

const {id}=useParams();

const [userImg,setUserImg]=useState('');
const [userData,setUserData]=useState('');

//fetch data passed from home using state in history.push 
useEffect(() => {
    fetch(`/add/fetchDetails/${id}`,
          {
            method:'GET',

          }).then(res=>res.json())
          .then(res=>
            {
                //fetched user data is saved to the corresponding fields 
                setUserData(res.data);
                setUserImg(res.data.image.replace("public", ""));
            })
          .catch(err=>{
            alert(err.error);
          })
}, [])



//displays user data in jumbotron
return(
    <>
    {userData?<Jumbotron 
    style={{width:"60%",
    border:"2px solid green",
    margin:'10px auto',
    left:'10%',
    borderRadius:'10px',
    }}>
    <h1>You have registered successfully</h1>
    <br/>
    <p>
        Your registration details are:
        <p className="modalText">
            <img src={userImg} alt="ID Card" className="success-img"></img>
            <h4><span>Registration ID:</span>{userData._id}</h4>
            <h4><span>Name:</span>{userData.name}</h4>
            <h4><span>Organisation Name:</span>{userData.orgName}</h4>
            <h4><span>Employee ID:</span>{userData.empID}</h4>
        </p>
        <Link to={`/cafepage/${id}`}>
        <Button variant="primary">Browse Cafe Menu</Button>
        </Link>
        
    </p>
    </Jumbotron>:<Spinner animation="border" role="status" className="spinner"/>}
    </>
)

}

export default Success