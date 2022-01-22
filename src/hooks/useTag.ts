import { useCallback, useState } from "react"
import * as TagAPI from "../api/TagAPI";
import { Tag } from "../components/Tag";

export const useTag = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [filterTags, setFilterTags] = useState<Tag[]>([]);

  const searchTags = useCallback(() => {
    TagAPI.searchTags().then((resultTags: any) => {
      setTags([...resultTags]);
    });
  },[]);

  const addTags = async (newTags: Tag[])  => {
    await TagAPI.addTags(newTags);
    setTags([...tags, ...newTags]);
  };

  const handleChangeFilterTags = (e: any) => {
    setFilterTags(e);
  };

  const handleChangeTags = (e: any) => {
    setTags(e);
  };

  return {
    tags,
    filterTags,
    searchTags,
    addTags,
    handleChangeFilterTags,
    handleChangeTags
  };
};
