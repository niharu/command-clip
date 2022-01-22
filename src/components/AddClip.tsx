import { Button, Text, Textarea, useDisclosure } from "@chakra-ui/react";

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { useRef, useState } from "react";

import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { Tag } from "./Tag";

export const AddClip: React.FC<{ addClip: any, addTags: any, tags: Tag[], handleChangeTags: any }> = ({ addClip, addTags, tags, handleChangeTags }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [clipTags, setClipTags] = useState<Tag[]>([]);

  const [newTags, setNewTags] = useState<Tag[]>([]);

  const commandRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);

  const handleChangeCategory = (selectedTags: any) => {
    setClipTags(selectedTags.map((tag: any) => { return { value: tag.value, label: tag.label }; }));
    setNewTags(selectedTags.filter((tag: any) => tag.__isNew__).map((tag: any) => { return { value: tag.value, label: tag.label }; }));
  };

  const handleClickSave = () => {
    if (commandRef !== null && descriptionRef !== null && commandRef.current !== null && descriptionRef.current !== null) {
      addClip(clipTags.map((tag: Tag) => tag.value), commandRef.current.value, descriptionRef.current.value);
      addTags(newTags);
      handleChangeTags(tags, ...newTags);
      console.log("AddClip handleClickSave tags:", tags);
      commandRef.current.value = "";
      descriptionRef.current.value = "";
    }
  }

  return (
    <>
      <Button onClick={onOpen}>Add clip</Button>
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Tags</Text>
            <CreatableSelect
              options={tags}
              isMulti
              onChange={handleChangeCategory}
            />
            <Text mt="3">Command</Text>
            <Textarea ref={commandRef} />
            <Text mt="3">Description</Text>
            <Textarea ref={descriptionRef} />
            <Button mt="3" onClick={handleClickSave}>Save</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};