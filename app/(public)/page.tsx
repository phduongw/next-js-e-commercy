'use client';

//pages/index.tsx
import { Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// The Home component is the landing page where users can create or join chat rooms.
export default function Home() {
    const [roomCode, setRoomCode] = useState<string>();
    const router = useRouter();

    // Function to create a new room with a random room code.
    const handleCreateNewRoom = () => {
        // Generate a random room code with 6 characters.
        const newRoomId = new Date().getTime().toString(36).substring(2, 8);
        router.push(`room/${newRoomId}`); // Redirect the user to the new room's URL.
    };

    // Function to join an existing room using a room code entered by the user.
    const handleRoomJoin = () => {
        // Redirect the user to the room with the provided room code.
        router.push(`room/${roomCode}`);
    };

    return (
        <div className={`flex min-h-screen flex-col items-center justify-between p-24`}>
            <div className='grid gap-6'>
                {/* Button to create a new room */}
                <Button
                    onClick={() => {
                        handleCreateNewRoom();
                    }}
                >
                    Create Room
                </Button>
                <div className='flex gap-4'>
                    {/* Input field to enter a room code */}
                    <Input
                        placeholder='Enter room code'
                        onChange={(e) => {
                            setRoomCode(e.target.value);
                        }}
                    />
                    {/* Button to join a room using a room code */}
                    <Button
                        onClick={() => {
                            handleRoomJoin();
                        }}
                    >
                        Join
                    </Button>
                </div>
            </div>
        </div>
    );
}
