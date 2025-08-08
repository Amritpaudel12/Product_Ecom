// import React, { useState, useEffect } from 'react';
// import { useGetAllUsersQuery } from '../../services/user/userApi';
// import { FaEye } from 'react-icons/fa';
// import { HiXMark } from 'react-icons/hi2'; 
// import { IoCheckmarkCircle, IoWarning } from 'react-icons/io5';

// function Users({searchTerm}) {
//   const { data: usersData, error, isLoading, refetch } = useGetAllUsersQuery();
//     console.log("users data ", usersData);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null); 

//   const [alert, setAlert] = useState(null);

//   useEffect(() => {
//     if (alert && alert.type === 'success') {
//       const timer = setTimeout(() => {
//         setAlert(null);
//       }, 3000); 
//       return () => clearTimeout(timer);
//     }
//   }, [alert]);

//   const openViewModal = (user) => {
//     setCurrentUser(user);
//     setIsViewModalOpen(true);
//     setAlert(null); 
//   };

//   const closeViewModal = () => {
//     setIsViewModalOpen(false);
//     setCurrentUser(null);
//   };

//   const users = usersData?.data || [];

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
//         <p className="ml-4 text-xl text-gray-700">Loading users...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-red-100 text-red-600 text-lg font-medium">
//         <p>Error fetching users: {error.message || 'Something went wrong!'}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-100 min-h-screen">
//       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Registered Users</h1>
//         </div>

//         {alert && (
//           <div
//             className={`flex items-center justify-between p-4 mb-6 rounded-lg shadow-md transition-all duration-300 ease-in-out ${
//               alert.type === 'success'
//                 ? 'bg-green-100 border border-green-400 text-green-700'
//                 : 'bg-red-100 border border-red-400 text-red-700'
//             }`}
//             role="alert"
//           >
//             <div className="flex items-center">
//               {alert.type === 'success' ? (
//                 <IoCheckmarkCircle className="h-6 w-6 mr-3 text-green-500" />
//               ) : (
//                 <IoWarning className="h-6 w-6 mr-3 text-red-500" />
//               )}
//               <span className="font-semibold text-lg">{alert.message}</span>
//             </div>
//             <button
//               onClick={() => setAlert(null)}
//               className={`${
//                 alert.type === 'success' ? 'text-green-700' : 'text-red-700'
//               } hover:opacity-75 transition-opacity duration-200`}
//             >
//               <HiXMark className="h-6 w-6" />
//             </button>
//           </div>
//         )}

//         {users.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
//               <thead className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
//                 <tr>
//                   <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">User ID</th>
//                   <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Username</th>
//                   <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Email</th>
//                   <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Role</th>
//                   <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Registered On</th>
//                   <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {users.map((user, index) => (
//                   <tr key={user._id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-teal-50 transition-colors duration-200 ease-in-out`}>
//                     <td className="py-4 px-6 text-gray-800 font-mono text-sm">{user._id}</td>
//                     <td className="py-4 px-6 text-gray-800 font-medium">{user.username}</td>
//                     <td className="py-4 px-6 text-gray-700">{user.email}</td>
//                     <td className="py-4 px-6 text-gray-700 capitalize">{user.isAdmin ? 'Admin' : 'User'}</td>
//                     <td className="py-4 px-6 text-gray-700">{new Date(user.createdAt).toLocaleDateString()}</td>
//                     <td className="py-4 px-6 flex items-center space-x-2">
//                       <button
//                         onClick={() => openViewModal(user)}
//                         className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg flex items-center shadow-md transition duration-200 transform hover:scale-105"
//                       >
//                         <FaEye className="mr-2" /> View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="text-center text-gray-600 text-xl py-10">
//             <p>No registered users found.</p>
//           </div>
//         )}
//       </div>

//       {/* View User Modal */}
//       {isViewModalOpen && currentUser && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative transform scale-100 animate-fade-in-up">
//             <button
//               onClick={closeViewModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200"
//             >
//               <HiXMark className="h-8 w-8" />
//             </button>
//             <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">User Details</h2>
            
//             <div className="space-y-4">
//               <div className="bg-gray-50 p-3 rounded-lg shadow-sm flex justify-between items-center">
//                 <span className="text-gray-600 font-semibold">Username:</span>
//                 <span className="text-gray-800 font-medium">{currentUser.username}</span>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg shadow-sm flex justify-between items-center">
//                 <span className="text-gray-600 font-semibold">Email:</span>
//                 <span className="text-gray-800 font-medium">{currentUser.email}</span>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg shadow-sm flex justify-between items-center">
//                 <span className="text-gray-600 font-semibold">Role:</span>
//                 <span className="text-gray-800 font-medium capitalize">{currentUser.role || 'user'}</span>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg shadow-sm flex justify-between items-center">
//                 <span className="text-gray-600 font-semibold">Registered On:</span>
//                 <span className="text-gray-800 font-medium">{new Date(currentUser.createdAt).toLocaleDateString()}</span>
//               </div>
//             </div>
            
//             <div className="mt-8 text-center">
//               <button
//                 onClick={closeViewModal}
//                 className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Users;


import React, { useState, useEffect } from 'react';
import { useGetAllUsersQuery } from '../../services/user/userApi';
import { FaEye } from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2'; 
import { IoCheckmarkCircle, IoWarning } from 'react-icons/io5';

function Users({searchTerm}) {
  const { data: usersData, error, isLoading, refetch } = useGetAllUsersQuery();
  
  // State to hold the list of users after filtering
  const [filteredUsers, setFilteredUsers] = useState([]);
  
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); 
  const [alert, setAlert] = useState(null);

  // The original, unfiltered list of users from the API
  const users = usersData?.data || [];

  // Effect to filter users whenever the search term or the original user list changes
  useEffect(() => {
    const lowercasedFilter = searchTerm ? searchTerm.toLowerCase() : "";
    
    if (!lowercasedFilter) {
      // If the search term is empty, show all users
      setFilteredUsers(users);
    } else {
      // Otherwise, filter the users based on the search term
      const filteredData = users.filter((user) => {
        return (
          user.username.toLowerCase().includes(lowercasedFilter) ||
          user.email.toLowerCase().includes(lowercasedFilter)
        );
      });
      setFilteredUsers(filteredData);
    }
  }, [searchTerm, users]); // This effect depends on searchTerm and the user list

  useEffect(() => {
    if (alert && alert.type === 'success') {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const openViewModal = (user) => {
    setCurrentUser(user);
    setIsViewModalOpen(true);
    setAlert(null); 
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setCurrentUser(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="ml-4 text-xl text-gray-700">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100 text-red-600 text-lg font-medium">
        <p>Error fetching users: {error.message || 'Something went wrong!'}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Registered Users</h1>
        </div>

        {alert && (
          <div
            className={`flex items-center justify-between p-4 mb-6 rounded-lg shadow-md transition-all duration-300 ease-in-out ${
              alert.type === 'success'
                ? 'bg-green-100 border border-green-400 text-green-700'
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}
            role="alert"
          >
            <div className="flex items-center">
              {alert.type === 'success' ? (
                <IoCheckmarkCircle className="h-6 w-6 mr-3 text-green-500" />
              ) : (
                <IoWarning className="h-6 w-6 mr-3 text-red-500" />
              )}
              <span className="font-semibold text-lg">{alert.message}</span>
            </div>
            <button
              onClick={() => setAlert(null)}
              className={`${
                alert.type === 'success' ? 'text-green-700' : 'text-red-700'
              } hover:opacity-75 transition-opacity duration-200`}
            >
              <HiXMark className="h-6 w-6" />
            </button>
          </div>
        )}

        {users.length > 0 ? (
            // Check if there are any users to display after filtering
            filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
                <tr>
                  <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">User ID</th>
                  <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Username</th>
                  <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Email</th>
                  <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Role</th>
                  <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Registered On</th>
                  <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Render the filtered users */}
                {filteredUsers.map((user, index) => (
                  <tr key={user._id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-teal-50 transition-colors duration-200 ease-in-out`}>
                    <td className="py-4 px-6 text-gray-800 font-mono text-sm">{user._id}</td>
                    <td className="py-4 px-6 text-gray-800 font-medium">{user.username}</td>
                    <td className="py-4 px-6 text-gray-700">{user.email}</td>
                    <td className="py-4 px-6 text-gray-700 capitalize">{user.isAdmin ? 'Admin' : 'User'}</td>
                    <td className="py-4 px-6 text-gray-700">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-6 flex items-center space-x-2">
                      <button
                        onClick={() => openViewModal(user)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg flex items-center shadow-md transition duration-200 transform hover:scale-105"
                      >
                        <FaEye className="mr-2" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          ) : (
            // This message is shown when the search term doesn't match any users
            <div className="text-center text-gray-600 text-xl py-10">
                <p>No users found for search term: "{searchTerm}"</p>
            </div>
          )
        ) : (
          // This message is shown when there are no users at all
          <div className="text-center text-gray-600 text-xl py-10">
            <p>No registered users found.</p>
          </div>
        )}
      </div>

      {/* View User Modal */}
      {isViewModalOpen && currentUser && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative transform scale-100 animate-fade-in-up">
            <button
              onClick={closeViewModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200"
            >
              <HiXMark className="h-8 w-8" />
            </button>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">User Details</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm flex justify-between items-center">
                <span className="text-gray-600 font-semibold">Username:</span>
                <span className="text-gray-800 font-medium">{currentUser.username}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm flex justify-between items-center">
                <span className="text-gray-600 font-semibold">Email:</span>
                <span className="text-gray-800 font-medium">{currentUser.email}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm flex justify-between items-center">
                <span className="text-gray-600 font-semibold">Role:</span>
                <span className="text-gray-800 font-medium capitalize">{currentUser.isAdmin ? 'Admin' : 'User'}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm flex justify-between items-center">
                <span className="text-gray-600 font-semibold">Registered On:</span>
                <span className="text-gray-800 font-medium">{new Date(currentUser.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button
                onClick={closeViewModal}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;