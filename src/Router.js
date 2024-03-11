import React from 'react'
import {Routes,Route} from "react-router-dom";
import { useState } from 'react';
import Register from './components/Login/Register';
import Login from './components/Login/Login';
import { Mypage } from './components/Home/Mypage';
import {Getalldetails} from './components/Admin/Getalldetails';
import Sidebar from './components/Home/Sidebar';
import Chatresponse from './components/Chatbot/Chatresponse';
import GetAllHisotry from './components/Chatbot/GetAllHisotry';
import { Unansweredquestion } from './components/Admin/Unansweredquestion';
import Getbytagid from './components/Admin/Getbytagid';
import { ShowChathistory } from './components/User/ShowChathistory';
import { Updateuser } from './components/Admin/Updateuser';
import { Logout } from './components/Home/Logout';
import Chat from './components/Chatbot/Chat';


const Router=()=>{
    return(
        <div>
            
                <Routes>
                    <Route path='/Mypage' element={<Mypage/>}/>
                    <Route path='/Register' element={<Register/>}/>
                    <Route path='/Login' element={<Login/>}/>
                    <Route path='/Getalldetails' element={<Getalldetails/>}/>
                    <Route path='/Sidebar' element={<Sidebar/>}/>
                    <Route path='/Chatresponse' element={<Chatresponse/>}/>
                    <Route path='/GetAllHistory' element={<GetAllHisotry/>}/>
                    <Route path='/Unansweredquestion/' element={<Unansweredquestion/>}/>
                    <Route path='/Getbytagid/' element={<Getbytagid/>}/>
                    <Route path='/ShowChathistory/:tag_id' element={<ShowChathistory/>}/>
                    <Route path='/Updateuser/:id' element={<Updateuser/>}/>
                    <Route path='/Chat' element={<Chat/>}/>
                    <Route path='/Logout' element={<Logout/>}/>
                </Routes>
            
        </div>
    )
}

export default Router