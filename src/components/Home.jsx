import React, { useState, useEffect } from "react"
import axios from 'axios'
import Header from './Header'
import {motion} from "framer-motion";
import {Box,Image,Text} from "@chakra-ui/react";
import btsrc from "../assets/btc.png"
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
const Home = () => {
  const [showSkeleton, setShowSkeleton] = useState(true)
const handleDataError = e => {
  setShowSkeleton(false)
}
const imgg = `https://d1zqyuia6soglw.cloudfront.net/btc.png`
  return (
      <Box bgColor={"blackAlpha.900"} w = {"full"} h = {"85vh"} >

            <motion.div style ={{
              height:"80vh",
            }}
            animate ={{
              translateY:"20px",
            }}
            transition={{
              duration:2,
              repeat: Infinity,
              repeatType :"reverse",
            }}
            >
          
              
        <Image w={"full"} h={"full"} objectFit={"contain"} 
        onError={handleDataError}

        src={(showSkeleton ) ? imgg:btsrc} 
        alt="Bitcoin Image"
        filter={"grayscale(1)"} />
            
            </motion.div>

          <Text fontSize={"6xl"} textAlign={"center"} fontWeight={"thin"} color={"whiteAlpha.700"} mt={"-20"} >
            XCRYPTO
          </Text>
        
      </Box>
  )
}

export default Home
