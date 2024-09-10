import React from 'react';

const useSidebar = () => {
    const [isSidebarOpen, setIsSideBarOpen] = React.useState(true);
    const openSidebar = () => setIsSideBarOpen(true);
    const closeSidebar = () => setIsSideBarOpen(false);

    const handleChange = () => setIsSideBarOpen(prev => !prev);

    return {
        openSidebar, closeSidebar, handleChange, isSidebarOpen
    }
};

export default useSidebar;
