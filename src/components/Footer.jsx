import React from 'react';
import { Box, Text, VStack, Avatar, Flex, Wrap, WrapItem } from "@chakra-ui/react";


const Footer = () => {
  return (
    <Flex
      bgColor={"blackAlpha.900"}
      color={"whiteAlpha.700"}
      minH={"48"}
      px={0} // Remove horizontal padding
      py={["16", "8"]}
      justify="space-between" // Push content to the sides
      alignItems="center"
    >
        
      <VStack w="full" alignItems={["center", "flex-start"]}>
        <Text fontWeight={"bold"} textAlign={["center", "left"]} mb="2">
          About Us
        </Text>
        <Text
          fontWeight={"sm"}
          letterSpacing={"widest"}
          textAlign={["center", "left"]}
        >
          We are the best Crypto trading guidance app in India. We provide
          our guidance at a very cheap price.
        </Text>
      </VStack>
      <Wrap alignItems="center">
        <WrapItem>
          <Avatar boxSize={"28"} mb="2" />
        </WrapItem>
        <WrapItem>
          <Text></Text>
        </WrapItem>
      </Wrap>
    </Flex>
  );
}

export default Footer;
