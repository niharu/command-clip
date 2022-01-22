import { Box, Container, Flex, Spacer } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AddClip } from './components/AddClip';
import { Clips } from './components/Clips';
import { Login } from './components/Login';
import { useAuthState } from './hooks/useAuthState';
import { useClip } from './hooks/useClip';
import Select from 'react-select';
import { IncrementalSearch } from './components/IncrementalSearch';
import { useTag } from './hooks/useTag';
import { Title } from './components/Title';

function App() {
  const {
    searchClips,
    addClip,
    filterClips,
    filteredClips
  } = useClip();

  const { loading, isSignedIn, user } = useAuthState();

  const { tags, filterTags, addTags, searchTags, handleChangeFilterTags, handleChangeTags } = useTag();

  const [searchWord, setSearchWord] = useState('');

  const handleChangeSearchWord = (e: any) => {
    setSearchWord(e.target.value);
    filterClips(e.target.value);
  };

  useEffect(() => {
    searchClips(filterTags);
  }, [filterTags, searchClips]);

  useEffect(() => {
    searchTags();
  }, [searchTags]);

  console.log("tags:", tags);

  return (
    <Container p={{ base: "4", md: "6" }} maxWidth="3xl">
      <Flex mb={3}>
        <Box>
          <Title fontSize={{ base: "2xl", md: "3xl" }} title="command clip" as="h1" mt={1} />
        </Box>
        <Spacer />
        {isSignedIn ?
          <AddClip addClip={addClip} addTags={addTags} tags={tags} handleChangeTags={handleChangeTags} />
          :
          <Box>
            <Login loading={loading} isSignedIn={isSignedIn} user={user} />
          </Box>
        }
      </Flex>
      <Select
        options={tags}
        isMulti
        onChange={handleChangeFilterTags}
      />
      <IncrementalSearch
        mt={3}
        placeholder="検索"
        searchWord={searchWord}
        handleChangeSearchWord={handleChangeSearchWord}
      />
      <Clips clips={filteredClips} />
    </Container>
  );
}

export default App;