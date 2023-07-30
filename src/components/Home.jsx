import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import btc from "../assets/btc.png";

const Home = () => {
  return (
    <Box bg={"blackAlpha.900"} h={"85vh"} w={"full"}>
      <Image
        w={"full"}
        h={"full"}
        objectFit={"contain"}
        src={btc}
        filter={"grayscale(1)"}
      />
      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"white.Alpha700"}
        mt={"-20"}
      >
        CryptoX
      </Text>
    </Box>
  );
};

export default Home;
