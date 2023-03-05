import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      flexDir="column"
      p={3}
      bg="rgba(204, 204, 204, 9%)"
      width="100%"
      borderWidth="1px"
      backgroundSize="cover"
      backgroundAttachment="fixed"
      position="sticky"
    >
      <SingleChat
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
        backgroundAttachment="scroll"
      />
    </Box>
  );
};

export default Chatbox;
