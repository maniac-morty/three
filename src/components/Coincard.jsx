import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
  Container,
  Grid,
  Image,
  Heading,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react"; // Added Flex for centering
import Loader from "./Loader";
import Errorcomponent from "./Errorcomponent";
import { Link } from "react-router-dom";

const Coincard = ({ id,img,name,price,symbol,currencysymbol="₹" }) => (
        <Link to={`/coins/${id}`} rel="noopener noreferrer">
          <Box
            bg="white"
            p={6} // Adjust padding to make the box larger
            borderRadius="lg"
            shadow="md"
            transition="transform 0.3s"
            _hover={{
              transform: "scale(1.05)",
            }}
          >
            <Flex
              flexDirection="column"
              alignItems="center" // Center-align items horizontally
              justifyContent="center" // Center-align items vertically
              textAlign="center" // Center-align text within the box
              height="100%" // Set the height to fill the box
            >
              <Image
                src={img}
                w={"16"} // Adjust the width and height to make the image larger
                h={"16"}
                objectFit={"contain"}
                alt={"Exchange"}
              />
              <Heading size={"lg"} noOfLines={1}> {/* Adjust the heading size */}
                {symbol}
                <Text noOfLines={1}>{price ? `${currencysymbol}${price}` : "NA"}</Text>

              </Heading>
              
                
            </Flex>
          </Box>
        </Link>
      );
      
      
  


export default Coincard;