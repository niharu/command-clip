import { List } from "@chakra-ui/react";
import { Clip } from "./Clip";
import { ClipItem } from "./ClipItem";

export const Clips: React.FC<{clips: Clip[]}> = ({clips}) => {
  return (
    <>
      {clips.length !== 0 && (
        <>
          <List w="full" mt="3" spacing={-8}>
            {clips.map((clip: Clip) => (
              <ClipItem
                key={clip.id}
                clip={clip}
              />
            ))}
          </List>
        </>
      )}
    </>
  );
};