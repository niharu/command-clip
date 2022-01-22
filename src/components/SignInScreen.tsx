import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';

export const SignInScreen: React.FC<{isOpen: any, onClose: any, uiConfig: any, firebaseAuth: any}> = ({isOpen, onClose, uiConfig, firebaseAuth}) => {
  return (
    <Modal size="xs" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}