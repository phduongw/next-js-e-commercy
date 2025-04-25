'use client';

//Components/ChatComponent.tsx
import {useParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {Socket, io} from "socket.io-client";
import {DefaultEventsMap} from "@socket.io/component-emitter";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

// Define the backend server URL from environment variables
// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

// Initialize a Socket.io client instance
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

// Define the structure of chat list items
interface ChatListProps {
    message: string;
    username: string;
}

const ChatComponent = () => {
    const roomId = useParams().id
    const [message, setMessage] = useState<string>("");
    const username = useSelector<RootState, string>((state) => state.user.username);
    const [chatList, setChatList] = useState<ChatListProps[] | undefined>();

// Establish a Socket.io connection when the component mounts
    useEffect(() => {
        // Initialize a Socket.io client instance and connect it to the server.
        socket = io('http://localhost:8283');
        socket.on("connect", () => {
            // When the connection is established, this callback function is executed.

            // Join the room with the specified roomId
            socket.emit("join-room", roomId);
        });
    }, []);

// Listen for incoming messages and update the chat list
    useEffect(() => {
        // This code listens for incoming messages from the server.
        socket.on("receive-message", (broadcastMessage: ChatListProps) => {
            // When a message is received, this event is triggered.
            console.log("message: ", broadcastMessage)
            if (broadcastMessage.username !== username) {
                const temp = chatList ?? [];
                // Add the received message to the chat list.
                setChatList([...temp, broadcastMessage]);
            }
        });
    });


// Function to send a message
    const sendMessageHandler = () => {
        // When the user sends a message, this function is called.

        // Emit a "send-message" event to the server with the message and username.
        socket.emit("send-message", {message, username}, roomId);

        const temp = chatList ?? [];
        if (message !== "") {
            // Add the sent message to the chat list.
            setChatList([...temp, {message, username}]);
        }
        setMessage("");
    };

    return (
        <div className='w-1/2 h-[70vh] border bg-slate-100 rounded-xl flex flex-col '>
            <div className='p-3 px-4 flex justify-between'>
                <p>Room id: {roomId}</p>
                <p>username: {username}</p>
            </div>
            <div className='border'/>
            <div className='px-4 h-full'>
                {chatList?.map((item, index) => {
                    if (item.username !== username) {
                        return (
                            <div className='grid' key={index}>
                                <p className='text-black text-lg font-semibold '>
                                    {item.username}
                                </p>
                                <p className='text-sm font-normal p-1 ml-2'>
                  <span className='bg-white px-3 p-1 rounded-sm'>
                    {item.message}
                  </span>
                                </p>
                            </div>
                        );
                    }
                    return (
                        <div className='flex flex-col items-end' key={index}>
                            <p className='text-sm font-normal p-1 mr-2'>
                <span className='bg-white px-3 p-1 rounded-sm'>
                  {item.message}
                </span>
                            </p>
                        </div>
                    );
                })}
            </div>
            <div className='border'/>
            <div className='flex  p-4 '>
                <input
                    placeholder='message'
                    className='w-full focus:outline-none bg-slate-100'
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />
                <a
                    className='cursor-pointer'
                    onClick={() => {
                        sendMessageHandler();
                    }}
                >
                    <h1>Send</h1>
                </a>
            </div>
        </div>
    );
};

export default ChatComponent;
