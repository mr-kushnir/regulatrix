import Container from '@mui/material/Container'
import React from 'react'

const ContainerLayouts = ({children}) => {

    return <Container maxWidth='xl'>
        {children}
    </Container>
}


export default ContainerLayouts