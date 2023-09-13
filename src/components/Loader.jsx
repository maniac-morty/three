import React from 'react';
import { Center, Spinner, Box } from "@chakra-ui/react";

const Loader = () => {
  console.log("hhh");
  return (
    <Center height="100vh"> {/* Center the content vertically and horizontally */}
      <Box>
        <Spinner size="xl" thickness="4px" color="blue.500" /> {/* Adjust the spinner size and color */}
      </Box>
    </Center>
  );
}

export default Loader;
