import React from 'react';

const usePopover = (timeout = 300) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const timeoutID = React.useRef(undefined);
    const openPopover = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setAnchorEl(e.currentTarget);
    };

    const closePopover = () => {
        setAnchorEl(null);
        clearTimeout(timeoutID.current);
    };

    const openMousePopover = (e) => {
        clearTimeout(timeoutID.current);
        timeoutID.current = setTimeout(() => {
            setAnchorEl(e.target);
        }, timeout);

    };

    const open = Boolean(anchorEl);

    return {closePopover, openMousePopover, openPopover, anchorEl, open};
};

export default usePopover;
