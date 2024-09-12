import React from 'react';

const useSidebar = (defaultState = false) => {
    const [isSidebarOpen, setIsSideBarOpen] = React.useState(defaultState);
    const openSidebar = () => setIsSideBarOpen(true);
    const closeSidebar = () => setIsSideBarOpen(false);

    const handleChange = () => setIsSideBarOpen(prev => !prev);

    return {
        openSidebar, closeSidebar, handleChange, isSidebarOpen
    }
};

export default useSidebar;
