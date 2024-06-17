import React, { createContext, useContext, useState } from 'react';

// Create the context
export const EventBus = createContext();

// Create the provider component
export const EventBusProvider = ({ children }) => {
    const [events, setEvents] = useState({});

    const emit = (name, data) => {
        if (events[name]) {
            for (let cb of events[name]) {
                cb(data);
            }
        }
    };

    const on = (name, cb) => {
        if (!events[name]) {
            events[name] = [];
        }

        events[name].push(cb);

        return () => {
            events[name] = events[name].filter((callback) => callback !== cb);
        };
    };

    return (
        <EventBus.Provider value={{ emit, on }}>
            {children}
        </EventBus.Provider>
    );
};

// Custom hook to use the EventBus context
export const useEventBus = () => {
    return useContext(EventBus);
};
