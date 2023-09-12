

import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import { Container, Grid, Button, RadioGroup, Radio } from "@chakra-ui/react";
import Loader from "./Loader";
import Coincard from "./Coincard";
import Errorcomponent from "./Errorcomponent";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencysymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (newPage) => {
    setPage(newPage);
    setLoading(true);
  };

  const totalPages = 132;
  const maxButtonsToShow = 20;

  const startPage = Math.max(1, page - Math.floor(maxButtonsToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

  const btns = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
        
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, [currency, page]);

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Errorcomponent message={"popeye error its not working"}/>
      ) : (
        <>
          <RadioGroup value = {currency} onChange={setCurrency} p={"8"} >
            <div>
              <Radio value={"inr"}>₹</Radio>
              <Radio value={"usd"}>$</Radio>
              <Radio value={"eur"}>€</Radio>
            </div>
          </RadioGroup>

          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            {coins.map((i) => (
              <div key={i.id}>
                <Coincard
                  id={i.id}
                  key={i.id}
                  name={i.name}
                  price={i.current_price}
                  img={i.image}
                  symbol={i.symbol}
                  currencysymbol={currencysymbol}
                />
              </div>
            ))}
          </Grid>
          <div style={{ width: "100%", overflow: "auto", padding: "8px" }}>
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor="gray.800"
                color="white"
                onClick={() => changePage(item)}
                _hover={{ bgColor: "blackAlpha.900" }}
                _active={{ bgColor: "blackAlpha.900" }}
                _focus={{ boxShadow: "none" }}
                borderRadius="full"
                size="sm"
                marginX="1"
              >
                {item}
              </Button>
            ))}
          </div>
        </>
      )}
    </Container>
  );
};

export default Coins;