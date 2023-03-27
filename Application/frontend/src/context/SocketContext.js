
import React, { useEffect, createContext } from 'react';
import io from 'socket.io-client';


export const SocketContext = createContext();
export const SocketProvider = ({...props}) => {
    const socket = io.connect(`http://localhost:8000`);

    useEffect(() => {
        return (() => socket.off());
    }, [socket]);

    const value = {
        socket,
    };

    return (
        <SocketContext.Provider value={value}>
            {props.children}
        </SocketContext.Provider>
    );
}