'use client';

//pages/room/[roomid].tsx
import React from 'react'
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux';
import UserComponent from '@/components/UserComponent';
import {RootState} from "@/store/store";

// Dynamically import the ChatComponent for optimized loading
const ChatComponent = dynamic(() => import('@/components/ChatComponent'));

const IndividualRoom = () => {
    // Retrieve the username from the Redux store
    const username = useSelector<RootState, string>((state) => state.user?.username);

    return (
        <div
            className={`flex min-h-screen flex-col items-center justify-between p-24 bg-slate-400`}
        >
            {/* Conditionally render UserComponent or ChatComponent based on the presence of a username */}
            {username === "" ? <UserComponent /> : <ChatComponent />}
        </div>
    );
}

export default IndividualRoom;
