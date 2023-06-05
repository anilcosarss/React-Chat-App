import React, { useEffect, useRef, useState } from 'react'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore"
import { auth, db } from '../firbase-config';
import "../styles/Chat.css";

const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState(""); 
  const [messages,setMessages]= useState([])

  const messagesRef = collection(db, "messages");
  const scrollRef = useRef(null);


useEffect(()=> {
  
  const queryMessages =query(
    messagesRef,
     where("room","==",room),
     orderBy("createdAt"));
  const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
    let messages = [];
    snapshot.forEach((doc) => {
      messages.push({...doc.data(), id: doc.id});
    });

    setMessages(messages)
  });
  return() => unsuscribe();

},[])

useEffect(() => {
  scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
}, [messages]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      img:auth.currentUser.photoURL,
      room,
    });
    setNewMessage("");
  };

  return (
    <div className='chat-app'>
      <div className='header'><h1>Room Name: {room.toUpperCase()}</h1></div>
      
      <div ref={scrollRef} style={{position:'sticky',
      height:"64vh",}} className='messages'>{
      messages.map((message) =>
      <div style={{
        display:"flex" ,
       alignItems:"center" ,
       justifyContent:"center" ,
       gap:"5px",
       padding:"10px 40px"
       }} className='message' key={message.id}>
        <img style={{width:"45px",
      height:"45px",
      borderRadius:"50%"}} src={message.img}/>
        <span className='user'>{message.user}:</span>
        <span>{message.text} </span>
        
        
      </div>
      )}</div>
      <form
        onSubmit={handleSubmit}
        className='new-message-form'>
          
        <input
          className='new-message-input'
          placeholder='Type message here..'
          onChange={(e) => { setNewMessage(e.target.value) }}
          value={newMessage}
        />

        <button
          type='submit'
          className='send-button'>
          Send
        </button>
      </form>

    </div>
  )
}

export default Chat