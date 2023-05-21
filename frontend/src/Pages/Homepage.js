import React, { useEffect } from "react";
import {
  Box,
  Container,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom";

const Homepage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      history.push("/chats");
    }
  }, [history]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        m="40px 0 15px 0"
        bg="rgb(255,255,255,0.5)"
        w="100%"
        p={4}
        borderRadius="10px"
        borderWidth="1px"
        boxShadow="rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
      >
        <Box
          display="flex"
          justifyContent="center"
          p={3}
          w="100%"
          m="10px 0 15px 0"
          border="none"
        >
            <Wrap>
            <WrapItem paddingTop="4%">
              <Image
                src="./favicon.png"
                alt="logo"
                width="40px"
                height="40px"
              ></Image>
            </WrapItem>
            <WrapItem>
              <Text fontSize="4xl" fontFamily="Work sans" textAlign="center">
                cHat-BoX
              </Text>
            </WrapItem>
          </Wrap>
        </Box>

        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab _selected={{ bg: "#D4F1F4" }}>Log In</Tab>
            <Tab _selected={{ bg: "#D4F1F4" }}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
