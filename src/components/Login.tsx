import { Text, Button, Flex, Center } from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react"

import { SignInScreen } from "./SignInScreen";

import firebase from "firebase/compat/app";
import { firebaseConfig } from "../config/config"
import 'firebase/compat/auth';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: "/",
  signInOptions: [
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
}

firebase.initializeApp(firebaseConfig);

export const Login: React.FC<{loading: boolean, isSignedIn: boolean, user: any}> = ({loading, isSignedIn, user}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logout = () => {
    firebase.auth().signOut();
  }

  return (
    <div>
      {loading ?
        <p>ロード中...</p> :
        <>
          {isSignedIn ?
            <>
              <Flex>
                <Center>
                  <Text mr="3">{user !== null && user.displayName}</Text>
                  {/* <Button ml="3" colorScheme="blue" onClick={logout}>ログアウト</Button> */}
                  <Menu>
                    <MenuButton colorScheme="gray" as={Button} >
                      メニュー
                    </MenuButton>
                    <MenuList>
                      <MenuItem>設定</MenuItem>
                      <MenuItem onClick={logout}>ログアウト</MenuItem>
                    </MenuList>
                  </Menu>
                </Center>
              </Flex>
            </>
            :
            <>
              <Button colorScheme="blue" onClick={onOpen}>ログイン</Button>
              <SignInScreen isOpen={isOpen} onClose={onClose} uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </>
          }
        </>
      }
    </div>
  );
}