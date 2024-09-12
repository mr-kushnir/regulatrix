import React from 'react';
import {Viewer} from '@react-pdf-viewer/core';
import {Worker} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import {Box} from "@mui/material";
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfViewer = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Box style={{
                height: '80vh',
            }}>
                <Viewer
                    theme={{
                        theme: 'dark',
                    }}
                    plugins={[defaultLayoutPluginInstance]}
                    fileUrl="test.pdf"
                    initialPage={0}
                    enableSmoothScroll={true}
                />
            </Box>
        </Worker>
    );
};

export default PdfViewer;