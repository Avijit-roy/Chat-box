import { AddIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getSender, getSenderPic } from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="rgba(204, 204, 204, 9%)"
      w={{ base: "100%", md: "32%" }}
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "20px", md: "15px", lg: "20px" }}
        fontFamily="Work sans"
        fontWeight="bold"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        Messages
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "14px", md: "12px", lg: "15px" }}
            rightIcon={<AddIcon />}
            fontWeight="bold"
            width="75%"
            ml={5}
            boxShadow="rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
            p={5}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        background="white"
        backgroundAttachment="scroll"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll" py={5} mx={5}>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                display="flex"
                bg={selectedChat === chat ? "#E8E8E8" : "white"}
                px={3}
                py={2}
                mb={2}
                h="60px"
                key={chat._id}
                _hover={{
                  boxShadow:
                    "inset -5px -5px 11px #bebebe,inset 5px 5px 11px #ffffff",
                }}
                boxShadow="inset 5px 5px 11px #bebebe,
            inset -5px -5px 11px #ffffff;"
                borderRadius="20px"
              >
                <span>
                  {!chat.isGroupChat ? (
                    <Avatar
                      mr={2}
                      my={2}
                      size="sm"
                      cursor="pointer"
                      name={getSender(loggedUser, chat.users)}
                      src={getSenderPic(loggedUser, chat.users)}
                      border="1px solid #b0b0b0"
                    />
                  ) : (
                    <Avatar
                      mr={2}
                      my={2}
                      size="sm"
                      cursor="pointer"
                      name={chat.chatName}
                      src="https://e1.pxfuel.com/desktop-wallpaper/971/129/desktop-wallpaper-210-sharingan-eye-ideas-blue-sharingan.jpg"
                      border="1px solid #b0b0b0"
                    />
                  )}
                </span>
                <Box>
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && (
                    <Text fontSize="xs">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
