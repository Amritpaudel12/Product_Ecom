
import React from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

function Topbar() { 
  const [search, setSearch] = React.useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearch(newSearchTerm);

    if (onSearchChange) {
      onSearchChange(newSearchTerm); 
    }

  };

  const handleSearch = () => {
    navigate(`/admin/search?query=${encodeURIComponent(search)}`);
  }

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-10 rounded-b-xl">
      <div className="text-3xl font-extrabold text-indigo-700 tracking-wide select-none">
        Product<span className="text-purple-600">_Ecom</span>
      </div>
      <div className="relative flex items-center bg-gray-100 rounded-lg px-4 py-2 w-full max-w-md shadow-inner">
        <HiMagnifyingGlass className="text-gray-500 text-xl mr-3" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={handleSearchChange} 
          className="bg-transparent outline-none flex-grow text-gray-800 placeholder-gray-500 text-lg"
        />
        <button className='text-white font-bold h-10 hover:text-amber-100 px-4 bg-blue-800 rounded-lg hover:cursor-pointer' onClick={handleSearch}>Search</button>
      </div>
    </nav>
  );
}

export default Topbar;