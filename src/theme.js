// theme.js
import { ColorModeScript } from '@chakra-ui/react';

const customTheme = ColorModeScript({
    colors: {
        primary: {
            500: '#319795', // Example color
        },
    },
    fonts: {
        heading: 'Arial, sans-serif',
        body: 'Arial, sans-serif',
    },
    // Add any other custom configurations here
});

export default customTheme;
