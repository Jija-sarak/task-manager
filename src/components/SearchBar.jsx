function SearchBar({ searchText, setSearchText, setCurrentPage }) {
  return (
    <input
      type="text"
      placeholder="Search by title..."
      value={searchText}
      onChange={e => {
        setSearchText(e.target.value);
        setCurrentPage(1);
      }}
    />
  );
}

export default SearchBar;
