// // import React from 'react';
// // import { HiMagnifyingGlass } from 'react-icons/hi2';

// // function Topbar() {
// //   let [ search, setSearch ] = React.useState('');
// //   return (
// //     <nav className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-10 rounded-b-xl">
// //       <div className="text-3xl font-extrabold text-indigo-700 tracking-wide select-none">
// //         Product<span className="text-purple-600">_Ecom</span>
// //       </div>
// //       <div className="relative flex items-center bg-gray-100 rounded-lg px-4 py-2 w-full max-w-md shadow-inner">
// //         <HiMagnifyingGlass className="text-gray-500 text-xl mr-3" />
// //         <input
// //           type="text"
// //           placeholder="Search anything..."
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //           className="bg-transparent outline-none flex-grow text-gray-800 placeholder-gray-500 text-lg"
// //         />
// //       </div>
// //     </nav>
// //   );
// // }

// // export default Topbar;


// import React from 'react';
// import { HiMagnifyingGlass } from 'react-icons/hi2';
// import { Router } from 'react-router-dom';

// function Topbar({ onSearchChange }) { 
//   const [search, setSearch] = React.useState('');
//   const router = Router();
//   const handleSearchChange = (e) => {
//     const newSearchTerm = e.target.value;
//     setSearch(newSearchTerm);
//     onSearchChange(newSearchTerm); 
//     router.navigate(`/admin/search?query=${encodeURIComponent(newSearchTerm)}`);
//   };

//   return (
//     <nav className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-10 rounded-b-xl">
//       <div className="text-3xl font-extrabold text-indigo-700 tracking-wide select-none">
//         Product<span className="text-purple-600">_Ecom</span>
//       </div>
//       <div className="relative flex items-center bg-gray-100 rounded-lg px-4 py-2 w-full max-w-md shadow-inner">
//         <HiMagnifyingGlass className="text-gray-500 text-xl mr-3" />
//         <input
//           type="text"
//           placeholder="Search anything..."
//           value={search}
//           onChange={handleSearchChange} 
//           className="bg-transparent outline-none flex-grow text-gray-800 placeholder-gray-500 text-lg"
//         />
//       </div>
//     </nav>
//   );
// }

// export default Topbar;


import React from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
// 1. Import 'useNavigate' instead of 'Router'
import { useNavigate } from 'react-router-dom';

function Topbar() { 
  const [search, setSearch] = React.useState('');
  
  // 2. Initialize the navigate function using the useNavigate hook
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearch(newSearchTerm);

    // It's good practice to check if the prop was actually passed
    if (onSearchChange) {
      onSearchChange(newSearchTerm); 
    }
    
    // 3. Call the navigate function directly
    // This will update the URL in the address bar
    // navigate(`/admin/search?query=${encodeURIComponent(newSearchTerm)}`);
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