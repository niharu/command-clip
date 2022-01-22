import { useCallback, useState } from "react"
import { ulid } from "ulid";
import * as ClipAPI from "../api/ClipAPI";
import { Clip } from "../components/Clip";
import { Tag } from "../components/Tag";

export const useClip = () => {
  const [clips, setClips] = useState<Clip[]>([]);

  const [filteredClips, setFilteredClips] = useState<Clip[]>([]);

  const searchClips = useCallback((tags: Tag[]) => {
    ClipAPI.searchClips(tags).then((resultClips: any) => {
      setClips([...resultClips].reverse());
      setFilteredClips([...resultClips].reverse());
    });
  },[]);

  const addClip = async (tags: string[], command: string, description: string)  => {
    const newClip: Clip = {
      id: ulid(),
      tags : tags,
      command: command,
      description: description
    };

    const addClip = await ClipAPI.addClip(newClip);
    setClips([addClip, ...clips]);
  };

  const filterClips = (searchWord: string) => {
    setFilteredClips(clips.filter((clip: Clip) => {
      return clip.command.search(searchWord) !== -1;
    }));
  };

  return {
    clips,
    searchClips,
    addClip,
    filterClips,
    filteredClips
  };
};