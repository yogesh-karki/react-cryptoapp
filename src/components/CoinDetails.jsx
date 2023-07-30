import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../index";
import axios from "axios";
import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import Chart from "./Chart";

const CoinDetails = () => {
  const params = useParams();
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("eur");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );

        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCoin();
  }, [params.id, currency, days]);

  const switchChartStats = (key) => {
    switch (key) {
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

      case "356d":
        setDays("356d");
        setLoading(true);
        break;

      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        break;
    }
  };

  if (error) return <ErrorComponent message={"Error while fetching coins "} />;
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={"full"} borderWidth={1}>
            <Chart array={chartArray} days={days} currency={currencySymbol} />
          </Box>

          <HStack p={4} wrap={"wrap"}>
            {btns.map((i) => {
              return (
                <Button key={i} onClick={() => switchChartStats(i)}>
                  {i}
                </Button>
              );
            })}
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={4}>
              <Radio value="eur">€</Radio>
              <Radio value="usd">$</Radio>
              <Radio value="inr">₹</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={4} p={"16"} alignItems={"flex-start"}>
            <Text alignSelf={"center"} opacity={0.7} fontSize={"small"}>
              Last Updated on{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}{" "}
            </Text>

            <Image
              src={coin.image.large}
              w={16}
              h={16}
              objectFit={"contain"}
            ></Image>

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>

              <StatHelpText>
                {" "}
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h} %
              </StatHelpText>
            </Stat>

            <Badge
              fontSize={"2xl"}
              bgColor={"blackAlpha.800"}
              color={"#fff"}
            >{`#${coin.market_cap_rank}`}</Badge>

            <CustomBar
              high={`${currencySymbol} ${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol} ${coin.market_data.low_24h[currency]}`}
            />

            <Box w={"full"} padding={4}>
              <Item
                title={"Max Supply"}
                value={coin.market_data.max_supply}
              ></Item>

              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              ></Item>

              <Item
                title={"Market Capital"}
                value={`${currencySymbol} ${coin.market_data.market_cap[currency]}`}
              ></Item>

              <Item
                title={"All Time Low"}
                value={`${currencySymbol} ${coin.market_data.atl[currency]}`}
              ></Item>

              <Item
                title={"All Time High"}
                value={`${currencySymbol} ${coin.market_data.ath[currency]}`}
              ></Item>
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

export default CoinDetails;

const CustomBar = ({ high, low }) => {
  return (
    <VStack w={"full"}>
      <Progress w={"full"} colorScheme={"teal"} value={50} />

      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={low} colorScheme={"red"} />
        <Text fontSize={"sm"}>24H range </Text>
        <Badge children={high} colorScheme={"green"} />
      </HStack>
    </VStack>
  );
};

const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
      <Text fontFamily={"Bebs Neue"} letterSpacing={"widest"}>
        {title}
      </Text>
      <Text>{value}</Text>
    </HStack>
  );
};
