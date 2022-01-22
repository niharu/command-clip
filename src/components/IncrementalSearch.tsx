import { Input } from "@chakra-ui/input";

export const IncrementalSearch: React.FC<{ mt: number, placeholder: string, searchWord: string, handleChangeSearchWord: any }> = ({ mt, placeholder, searchWord, handleChangeSearchWord }) => {
  return (
    <Input mt={mt} mb="4" type="text" value={searchWord} placeholder={placeholder} onChange={handleChangeSearchWord} />
  );
}