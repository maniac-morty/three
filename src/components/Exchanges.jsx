import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import { Container, Grid, Image, Heading, Text, Box, Flex } from '@chakra-ui/react'; // Added Flex for centering
import Loader from './Loader';
import Errorcomponent from './Errorcomponent';

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // Use setError to update the error state

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges?per_page=250`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true); // Use setError to set the error state
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  if (error) return <Errorcomponent message={"popeye its not working "} />;

  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <Grid
          templateColumns="repeat(5, 1fr)" // column adjust krne ke liye box ke bixh mei
          gap={6} // gap adjust karle
        >
          {exchanges.map((i) => (
            <div key={i.id}>
              <Exchangecard
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            </div>
          ))}
        </Grid>
      )}
    </Container>
  );
};

const Exchangecard = ({ name, img, rank, url }) => (
  <a href={url} target={"_blank"} rel="noopener noreferrer">
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
          {rank}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
      </Flex>
    </Box>
  </a>
);

export default Exchanges;
