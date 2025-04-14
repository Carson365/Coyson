import React, { useEffect, useState } from 'react';
import Navbar from '../Components/SearchNavbar';
import SearchList from '../Components/SearchList';

function Search() {
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState(input);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [input]);

  return (
    <div>
      <Navbar onSearchChange={setInput} />
      <div id="body">
        <SearchList input={debouncedInput} />
      </div>
    </div>
  );
}

export default Search;