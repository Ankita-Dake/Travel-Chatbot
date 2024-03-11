import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Updateuser = () => {
  const { id } = useParams();
  let token = localStorage.getItem("user-token");
  const [updateUserData, setUpdateUserData] = useState({
    name: '',
    email: '',
    phone_number: '',
    user_type: '',
    is_active: '',
  });

  useEffect(() => {
    // Fetch user details and set the state
    axios
      .get(`http://127.0.0.1:8000/users_current/${token}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('user-token')}` }
      })
      .then((res) => {
        const userData = res.data;
        console.log(res.data)
        if(userData!==null){
          setUpdateUserData({
            name: userData.name ,
            email: userData.email || '',
            phone_number: userData.phone_number || '',
            user_type: userData.user_type || '',
            is_active: userData.is_active || '',
            
          });
        }
        
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, []);

  const getNewUserData = (event) => {
    setUpdateUserData({ ...updateUserData, [event.target.name]: event.target.value });
  };

  const onHandleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/update_user/${id}`, updateUserData, {
        headers: { Authorization:`Bearer ${localStorage.getItem('user-token')}` },
      });
      toast.success('User details updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user details');
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 p-4 mt-2 shadow" style={{ border: 'rounded solid 6px', backgroundColor: '#E4F1FF', borderRadius: '10px' }}>
            <h2 className="text-center m-4 fs-3" style={{ fontFamily: 'Apple Chancery', fontWeight: 'bold' }}>Update User</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label" style={{ fontWeight: 'bold' }}>Name</label>
                <input type="text" className="form-control" placeholder="Enter name" name="name" value={updateUserData.name} onChange={getNewUserData} />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{ fontWeight: 'bold' }}>Email</label>
                <input type="text" className="form-control" placeholder="Enter email" name="email" value={updateUserData.email} onChange={getNewUserData} />
              </div>

              <div className="mb-3">
                <label htmlFor="phone_number" className="form-label" style={{ fontWeight: 'bold' }}>Phone Number</label>
                <input type="text" className="form-control" placeholder="Enter phone no." name="phone_number" value={updateUserData.phone_number} onChange={getNewUserData} />
              </div>

              <div className="mb-3">
                <label htmlFor="user_type" className="mb-2" style={{ fontWeight: 'bold' }}>User Type</label>
                <select className="form-control" name="user_type" value={updateUserData.user_type} onChange={getNewUserData}>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="is_active" className="mb-2" style={{ fontWeight: 'bold' }}>Is Active</label>
                <select className="form-control" name="is_active" value={updateUserData.is_active} onChange={getNewUserData}>
                  <option value="True">True</option>
                  <option value="False">False</option>
                </select>
              </div>

              <button onClick={onHandleUpdate} type="submit" className="btn mt-3" style={{ fontWeight: 'bold', borderRadius: '10px', color: 'white', backgroundColor: 'hsl(244, 77%, 14%)' }}>Update User</button>
              <Link to="/" className="btn btn-outline-danger mx-2 mt-3">Cancel</Link>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};

// import { Link } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import React, { useEffect,useState } from "react";

// export const Updateuser = () => {
//     const { id } = useParams();
//     console.log("id:",id);
//     const [userDetails, setUserDetails] = useState([]);
//     const[updateUserData,setUpdateUserData] = useState({
//         name:" "  ,
//         email:"" ,
//         phone_number:"",
//         user_type:"",
//         is_active:"" ,
       
//     });

//     let token = localStorage.getItem("user-token");
//     const config = { headers: { Authorization: `Bearer ${token}` } };
//     console.log("Token --", token);

//     useEffect(()=>{
//         axios({
//              baseURL: `http://127.0.0.1:8000/users_current/${token}`,
//              method: "GET",
//            })
//              .then((res) => {
//                if (res.status === 200) {
//                  console.log("Get Tag by ID res.data:", res.data);
//                  setUserDetails([res.data]);
//                }
//              })
//              .catch((error) => {
//                console.log("ERROR", error);
//                // alert("Error in Tag by ID Data Data");
//              });
     
     
//      }, []);
//   console.log("details---",userDetails)
// console.log(userDetails)
//      const getNewUserData = (event)=>{
//         setUpdateUserData({...updateUserData,[event.target.name]:event.target.value});
//      };
// async function onHandleUpdate(e){
//     e.preventDefault();
//     await axios.put(`http://127.0.0.1:8000/update_user/${id}`,updateUserData,config)
//     .then(res=>{
//         console.log(updateUserData)
//         console.log(res.data);
//         alert("User details updated successfully");

//     }).catch(error=>{
//         console.error("error in update user",error);

//     });
// }
// // 

//   return (
//     <>
//       <div className="container">
//         <div className="row">
//           <div className="col-md-6 offset-md-3 p-4 mt-2 shadow" style={{ border: 'rounded solid 6px', backgroundColor: '#E4F1FF', borderRadius: '10px' }}>
//             <h2 className="text-center m-4 fs-3" style={{ fontFamily: 'Apple Chancery', fontWeight: 'bold' }}>Update User</h2>
//             <form>
//               <div className="mb-3">
//                 <label htmlFor="Name" className="form-label" style={{ fontWeight: 'bold' }}>Name</label>
//                 <input type={"text"} className="form-control" placeholder="Enter name" name="name" value={updateUserData.user_name} onChange={(e) => getNewUserData(e)} />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="Address" className="form-label" style={{ fontWeight: 'bold' }}>Email</label>
//                 <input type={"text"} className="form-control" placeholder="Enter email" name="email" value={updateUserData.user_email} onChange={(e) => getNewUserData(e)} />
//               </div>

//               <div className="mb-3">
//               <label htmlFor="Name" className="form-label" style={{ fontWeight: 'bold' }}>Phone Number</label>
//               <input
//                 type={"text"}
//                 className="form-control"
//                 placeholder="Enter phone no."
//                 name="phone_number"
//                 value={updateUserData.phone}
                
//                 onChange={(e)=>getNewUserData(e)}
//               />
//             </div>
 
//             <div className="mb-3">
//             <label htmlFor="Name" className="mb-2" style={{ fontWeight: 'bold' }}>User Type</label>
//                   <select
//                   className="form-control"
//                    name="user_type"
//                    value={updateUserData.user_type}
//                    onChange={(e)=>getNewUserData(e)}
//                    >
//                     <option value="ADMIN">Admin</option>
//                     <option value="USER">User</option>
//                   </select>
//             </div>


//             <div className="mb-3">
//             <label htmlFor="Name" className="mb-2" style={{ fontWeight: 'bold' }}>Is Active</label>
//                   <select
//                   className="form-control"
//                    name="is_active"
//                    value={updateUserData.is_active}
//                    onChange={(e)=>getNewUserData(e)}
//                    >
//                     <option value="True">True</option>
//                     <option value="False">False</option>
//                   </select>
//             </div>
//               {/* Add similar responsive form inputs for Phone No. and Designation */}
//               <button onClick={onHandleUpdate} type="submit" className="btn mt-3" style={{ fontWeight: 'bold', borderRadius: '10px', color: 'white', backgroundColor: 'hsl(244, 77%, 14%)' }}>Update User</button>
//               <Link className="btn btn-outline-danger mx-2 mt-3">Cancel</Link>
//             </form>

//             <ToastContainer />
//           </div>
//         </div>
//       </div>
//     </>

//   )
// }
