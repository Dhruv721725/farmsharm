import React from 'react'

function SearchBar(search, setSearch) {
  const { search: contextSearch, setSearch: setContextSearch } = useAppContext();

  return (
    <input
      value={contextSearch}
      onChange={(e) => setContextSearch(e.target.value)}
    />
  )
}

export default SearchBar