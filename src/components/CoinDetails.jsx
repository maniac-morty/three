import React, { useEffect, useState } from "react";
import {
  Text,
  Container,
  Box,
  RadioGroup,
  Radio,
  VStack, // Add missing import
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Flex,
  Button,
} from "@chakra-ui/react";
import Loader from "./Loader";
import axios from "axios";
import { useParams } from "react-router-dom";
import Errorcomponent from "./Errorcomponent";
import { server } from "../index";
// import { Chart } from "chart.js";
import Chart from './Chart'



const CoinDetails = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [page, setPage] = useState(1);
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
  const currencysymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    const btns = ["24h","7d","14d","30d","60d","200d","1y","max"];
    const switchChartStats = (key)=>{
      switch (key)
      {
        case "24h":
          setDays("24h");
          setLoading(true);
          break;

          case "7d":
          setDays("7d");
          setLoading(true);
          break;

          case "14d":
          setDays("14d");
          setLoading(true);
          break;

          case "30d":
          setDays("30d");
          setLoading(true);
          break;

          case "60d":
          setDays("60d");
          setLoading(true);
          break;

          case "200d":
          setDays("200d");
          setLoading(true);
          break;

          case "24h":
          setDays("24h");
          setLoading(true);
          break;

          case "1y":
          setDays("365d");
          setLoading(true);
          break;

          case "max":
          setDays("max");
          setLoading(true);
          break;

          default:
            break;
      }
    }
  const params = useParams();
  useEffect(() => {
    const fetchcoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        setCoin(data);
        console.log(chartData);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchcoin();
  }, [params.id,currency,days]);
  if (error) return <Errorcomponent message={"error while printing"} />;
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={"full"} borderWidth={1} overflow={"auto"}>
            
            <Chart arr = {chartArray} currency = {currencysymbol} days = {days}/>
          </Box>

          <Flex p="4" flexWrap="wrap">
              {
                btns.map((i)=>(
                  <Button key ={i} onClick={()=>switchChartStats(i)} >{i}</Button>
                ))
              }
            </Flex>
          
          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <div>
              <Radio value={"inr"}>INR₹</Radio>
              <Radio value={"usd"}>USD$</Radio>
              <Radio value={"eur"}>EUR€</Radio>
            </div>
          </RadioGroup>

          <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
              Last Updated On{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>
            {coin.image && coin.image.large && (
              <img
                src={coin.image.large}
                alt="Coin Image"
                style={{ width: "52px", height: "52px", objectFit: "contain" }}
              />
            )}
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencysymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
              {`#${coin.market_cap_rank}`}
            </Badge>
            <CustomBar
              high={`${currencysymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencysymbol}${coin.market_data.low_24h[currency]}`}
            />
            <Box w={"full"} p="4">
              <Item title = {"Max Supply"} value ={coin.market_data.max_supply} />
              <Item title = {"Cirulating Supply"} value ={coin.market_data.circulating_supply} />
              <Item title = {"Market Cap"} value ={`${currencysymbol}${coin.market_data.atl[currency]}`} />
              <Item title = {"All Time Low"} value ={`${currencysymbol}${coin.market_data.atl[currency]}`} />
              <Item title = {"All Time Low"} value ={`${currencysymbol}${coin.market_data.ath[currency]}`} />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};
const Item = ({ title, value }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      marginTop: "4",
    }}
  >
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"} >{title}</Text>
    <Text>{value}</Text>
  </div>
);

const CustomBar = ({ low, high }) => (
  <div style={{ width: "100%" }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Badge colorScheme="red">{low}</Badge>
      <Text fontSize="sm">24H Range</Text>
      <Badge colorScheme="green">{high}</Badge>
    </div>
    <Progress value={50} colorScheme="teal" style={{ width: "100%" }} />
  </div>
);
export default CoinDetails;
