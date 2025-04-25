'use client';

// Components/UserComponent.tsx
import { setUser } from "@/store/user-store/userReducer";
import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const UserComponent = () => {
    // State to store the user's username
    const [username, setUsername] = useState<string>();

    // Access the Redux dispatch function
    const dispatch = useDispatch();

    // Function to update the Redux state with the entered username
    const updateUsername = () => {
        dispatch(setUser(username));
    };

    return (
        <div className='w-1/2 h-[70vh] border bg-white rounded-xl flex flex-col items-center justify-center'>
            <div className='w-1/2'>
                <div className='p-3 px-4 flex gap-4'>
                    {/* Input field for entering the username */}
                    <Input
                        placeholder='username'
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                    {/* Button to trigger the username update */}
                    <Button
                        colorScheme='teal'
                        onClick={() => {
                            updateUsername();
                        }}
                    >
                        Join
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserComponent;