// import React, { useState, useEffect } from 'react';
// import { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } from '../../services/product/productApi';
// import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
// import { HiXMark } from 'react-icons/hi2';
// import { IoCheckmarkCircle, IoWarning } from 'react-icons/io5';

// function GetProducts({searchTerm}) {
//   const { data: productsData, error, isLoading, refetch } = useGetProductsQuery();
//   const [createProduct, { isLoading: isCreating, isSuccess: createSuccess, isError: createError }] = useCreateProductMutation();
//   const [updateProduct, { isLoading: isUpdating, isSuccess: updateSuccess, isError: updateError }] = useUpdateProductMutation();
//   const [deleteProduct, { isLoading: isDeleting, isSuccess: deleteSuccess, isError: deleteErrorApi }] = useDeleteProductMutation();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null);

//   const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category: '',
//     size: '',
//     color: '',
//     stock: '',
//     image: '',
//   });

//   const [formErrors, setFormErrors] = useState({});
//   const [deleteError, setDeleteError] = useState(null);
//   const [alert, setAlert] = useState(null); 

//   useEffect(() => {
//     if (currentProduct) {
//       setFormData({
//         name: currentProduct.name,
//         description: currentProduct.description,
//         price: currentProduct.price,
//         category: currentProduct.category,
//         size: currentProduct.size,
//         color: currentProduct.color,
//         stock: currentProduct.stock,
//         image: currentProduct.image,
//       });
//     } else {
//       setFormData({ 
//         name: '',
//         description: '',
//         price: '',
//         category: '',
//         size: '',
//         color: '',
//         stock: '',
//         image: '',
//       });
//     }
//   }, [currentProduct, isModalOpen]);

//   useEffect(() => {
//     if (alert && alert.type === 'success') {
//       const timer = setTimeout(() => {
//         setAlert(null);
//       }, 3000); 
//       return () => clearTimeout(timer);
//     }
//   }, [alert]);

//   useEffect(() => {
//     if (deleteSuccess) {
//         if (!isDeleting) {
//             refetch(); 
//             closeDeleteConfirmModal(); 
//             setAlert({ type: 'success', message: `Product "${productToDelete?.name || 'item'}" deleted successfully!` });
//             setProductToDelete(null); 
//         }
//     }
//     if (deleteErrorApi && !isDeleting) {
//         setDeleteError('Failed to delete product. Please try again.');
//         setAlert({ type: 'error', message: 'Failed to delete product. Please try again.' });
//     }
//   }, [deleteSuccess, deleteErrorApi, isDeleting, refetch, productToDelete]);

//   useEffect(() => {
//     if ((createSuccess && !isCreating) || (updateSuccess && !isUpdating)) {
//         refetch(); 
//         closeModal(); 
//         const action = currentProduct ? 'updated' : 'added';
//         setAlert({ type: 'success', message: `Product "${formData.name}" ${action} successfully!` });
//     }
//     if ((createError && !isCreating) || (updateError && !isUpdating)) {
//         setFormErrors({ api: 'Failed to save product. Please try again.' });
//         setAlert({ type: 'error', message: 'Failed to save product. Please try again.' });
//     }
//   }, [createSuccess, updateSuccess, createError, updateError, isCreating, isUpdating, currentProduct, formData.name, refetch]);


//   const openCreateModal = () => {
//     setCurrentProduct(null);
//     setIsModalOpen(true);
//     setFormErrors({});
//     setAlert(null); 
//   };

//   const openEditModal = (product) => {
//     setCurrentProduct(product);
//     setIsModalOpen(true);
//     setFormErrors({});
//     setAlert(null); 
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentProduct(null);
//     setFormErrors({});
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.name) errors.name = 'Product name is required.';
//     if (!formData.description) errors.description = 'Description is required.';
//     if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) < 0) errors.price = 'Valid price is required.';
//     if (!formData.category) errors.category = 'Category is required.';
//     if (!formData.size) errors.size = 'Size is required.';
//     if (!formData.color) errors.color = 'Color is required.';
//     if (!formData.stock || isNaN(formData.stock) || parseInt(formData.stock) < 0) errors.stock = 'Valid stock quantity is required.';
//     if (!formData.image) errors.image = 'Image URL is required.';
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       if (currentProduct) {
//         await updateProduct({ id: currentProduct._id, product: formData });
//       } else {
//         await createProduct(formData);
//       }
//     } catch (err) {
//       console.error('Failed to save product (from handleSubmit):', err);
//     }
//   };

//   const handleDeleteClick = (product) => {
//     setProductToDelete(product);
//     setShowDeleteConfirmModal(true);
//     setDeleteError(null);
//     setAlert(null); 
//   };

//   const closeDeleteConfirmModal = () => {
//     setShowDeleteConfirmModal(false);
//     setProductToDelete(null);
//     setDeleteError(null);
//   };

//   const confirmDelete = async () => {
//     if (!productToDelete) return;

//     try {
//       const response = await deleteProduct(productToDelete._id);
//       console.log("delete response ", response);
//     } catch (err) {
//       console.error('Failed to delete product (from confirmDelete):', err);
//     }
//   };

//   const products = productsData?.data || [];

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
//         <p className="ml-4 text-xl text-gray-700">Loading products...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-50 to-indigo-100 text-red-600 text-lg font-medium">
//         <p>Error fetching products: {error.message || 'Something went wrong!'}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Product Catalog</h1>
//           <button
//             onClick={openCreateModal}
//             className="flex items-center bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg shadow-lg hover:from-green-600 hover:to-teal-700 transition duration-300 transform hover:scale-105"
//           >
//             <FaPlus className="mr-2 text-xl" /> Add New Product
//           </button>
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

//         {products.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
//               <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
//                 <tr>
//                   <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Product ID</th>
//                   <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Product Name</th>
//                   <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Category</th>
//                   <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Price</th>
//                   <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Stock</th>
//                   <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {products.map((product, index) => (
//                   <tr key={product._id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition-colors duration-200 ease-in-out`}>
//                     <td className="py-4 px-6 text-gray-800 font-mono text-sm">{product._id}</td>
//                     <td className="py-4 px-6 text-gray-800 font-medium">{product.name}</td>
//                     <td className="py-4 px-6 text-gray-700">{product.category}</td>
//                     <td className="py-4 px-6 text-green-700 font-semibold">${product.price?.toFixed(2)}</td>
//                     <td className="py-4 px-6 text-gray-900 font-semibold">{product.stock}</td>
//                     <td className="py-4 px-6 flex items-center space-x-2">
//                       <button
//                         onClick={() => openEditModal(product)}
//                         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center shadow-md transition duration-200 transform hover:scale-105"
//                       >
//                         <FaEdit className="mr-2" /> Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteClick(product)}
//                         className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg flex items-center shadow-md transition duration-200 transform hover:scale-105"
//                       >
//                         <FaTrashAlt className="mr-2" /> Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="text-center text-gray-600 text-xl py-10">
//             <p>No products found. Click "Add New Product" to get started!</p>
//           </div>
//         )}
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl relative transform scale-100 animate-fade-in-up">
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200"
//             >
//               <HiXMark className="h-8 w-8" />
//             </button>
//             <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
//               {currentProduct ? 'Edit Product' : 'Add New Product'}
//             </h2>

//             {formErrors.api && (
//               <p className="text-red-600 text-center mb-4">{formErrors.api}</p>
//             )}

//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {formErrors.name && <p className="text-red-500 text-xs italic mt-1">{formErrors.name}</p>}
//               </div>
//               <div>
//                 <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
//                 <input
//                   type="text"
//                   id="category"
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.category ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {formErrors.category && <p className="text-red-500 text-xs italic mt-1">{formErrors.category}</p>}
//               </div>
//               <div>
//                 <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price ($)</label>
//                 <input
//                   type="number"
//                   id="price"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   step="0.01"
//                   className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.price ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {formErrors.price && <p className="text-red-500 text-xs italic mt-1">{formErrors.price}</p>}
//               </div>
//               <div>
//                 <label htmlFor="stock" className="block text-gray-700 text-sm font-bold mb-2">Stock Quantity</label>
//                 <input
//                   type="number"
//                   id="stock"
//                   name="stock"
//                   value={formData.stock}
//                   onChange={handleChange}
//                   className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.stock ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {formErrors.stock && <p className="text-red-500 text-xs italic mt-1">{formErrors.stock}</p>}
//               </div>
//               <div>
//                 <label htmlFor="size" className="block text-gray-700 text-sm font-bold mb-2">Size</label>
//                 <input
//                   type="text"
//                   id="size"
//                   name="size"
//                   value={formData.size}
//                   onChange={handleChange}
//                   className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.size ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {formErrors.size && <p className="text-red-500 text-xs italic mt-1">{formErrors.size}</p>}
//               </div>
//               <div>
//                 <label htmlFor="color" className="block text-gray-700 text-sm font-bold mb-2">Color</label>
//                 <input
//                   type="text"
//                   id="color"
//                   name="color"
//                   value={formData.color}
//                   onChange={handleChange}
//                   className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.color ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {formErrors.color && <p className="text-red-500 text-xs italic mt-1">{formErrors.color}</p>}
//               </div>
//               <div className="md:col-span-2">
//                 <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
//                 <input
//                   type="text"
//                   id="image"
//                   name="image"
//                   value={formData.image}
//                   onChange={handleChange}
//                   className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.image ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {formErrors.image && <p className="text-red-500 text-xs italic mt-1">{formErrors.image}</p>}
//               </div>
//               <div className="md:col-span-2">
//                 <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows="4"
//                   className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.description ? 'border-red-500' : 'border-gray-300'}`}
//                 ></textarea>
//                 {formErrors.description && <p className="text-red-500 text-xs italic mt-1">{formErrors.description}</p>}
//               </div>

//               <div className="md:col-span-2 flex justify-center mt-4">
//                 <button
//                   type="submit"
//                   disabled={isCreating || isUpdating}
//                   className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-8 py-3 rounded-lg shadow-xl hover:from-indigo-700 hover:to-purple-800 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                 >
//                   {(isCreating || isUpdating) && (
//                     <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
//                   )}
//                   {currentProduct ? 'Update Product' : 'Create Product'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showDeleteConfirmModal && productToDelete && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative transform scale-100 animate-fade-in-up">
//             <button
//               onClick={closeDeleteConfirmModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200"
//             >
//               <HiXMark className="h-8 w-8" />
//             </button>
//             <h2 className="text-2xl font-bold text-red-700 mb-4 text-center">Confirm Deletion</h2>
//             <p className="text-gray-700 text-lg mb-6 text-center">
//               Are you sure you want to delete the product "<span className="font-semibold text-gray-900">{productToDelete.name}</span>"?
//               This action cannot be undone.
//             </p>

//             {deleteError && (
//               <p className="text-red-600 text-center mb-4">{deleteError}</p>
//             )}

//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={closeDeleteConfirmModal}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
//                 disabled={isDeleting}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                 disabled={isDeleting} // Crucially controlled by RTK Query's isDeleting state
//               >
//                 {isDeleting && ( // Spinner only shows when isDeleting is true
//                   <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
//                 )}
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default GetProducts;




import React, { useState, useEffect } from 'react';
import { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } from '../../services/product/productApi';
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2';
import { IoCheckmarkCircle, IoWarning } from 'react-icons/io5';

function GetProducts({ searchTerm }) {
  const { data: productsData, error, isLoading, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: isCreating, isSuccess: createSuccess, isError: createError }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating, isSuccess: updateSuccess, isError: updateError }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting, isSuccess: deleteSuccess, isError: deleteErrorApi }] = useDeleteProductMutation();

  // State to hold the filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    size: '',
    color: '',
    stock: '',
    image: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [deleteError, setDeleteError] = useState(null);
  const [alert, setAlert] = useState(null); 

  const products = productsData?.data || [];

  // Effect to filter products based on the search term
  useEffect(() => {
    const lowercasedFilter = searchTerm ? searchTerm.toLowerCase() : "";

    if (!lowercasedFilter) {
      setFilteredProducts(products); // If no search term, show all products
    } else {
      const filteredData = products.filter(product => {
        // Search in product name, category, and description
        const nameMatch = product.name?.toLowerCase().includes(lowercasedFilter);
        const categoryMatch = product.category?.toLowerCase().includes(lowercasedFilter);
        const descriptionMatch = product.description?.toLowerCase().includes(lowercasedFilter);
        return nameMatch || categoryMatch || descriptionMatch;
      });
      setFilteredProducts(filteredData);
    }
  }, [searchTerm, products]); // Re-run when search term or products list changes

  useEffect(() => {
    if (currentProduct) {
      setFormData({
        name: currentProduct.name,
        description: currentProduct.description,
        price: currentProduct.price,
        category: currentProduct.category,
        size: currentProduct.size,
        color: currentProduct.color,
        stock: currentProduct.stock,
        image: currentProduct.image,
      });
    } else {
      setFormData({ 
        name: '',
        description: '',
        price: '',
        category: '',
        size: '',
        color: '',
        stock: '',
        image: '',
      });
    }
  }, [currentProduct, isModalOpen]);

  useEffect(() => {
    if (alert && alert.type === 'success') {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [alert]);

  useEffect(() => {
    if (deleteSuccess) {
        if (!isDeleting) {
            refetch(); 
            closeDeleteConfirmModal(); 
            setAlert({ type: 'success', message: `Product "${productToDelete?.name || 'item'}" deleted successfully!` });
            setProductToDelete(null); 
        }
    }
    if (deleteErrorApi && !isDeleting) {
        setDeleteError('Failed to delete product. Please try again.');
        setAlert({ type: 'error', message: 'Failed to delete product. Please try again.' });
    }
  }, [deleteSuccess, deleteErrorApi, isDeleting, refetch, productToDelete]);

  useEffect(() => {
    if ((createSuccess && !isCreating) || (updateSuccess && !isUpdating)) {
        refetch(); 
        closeModal(); 
        const action = currentProduct ? 'updated' : 'added';
        setAlert({ type: 'success', message: `Product "${formData.name}" ${action} successfully!` });
    }
    if ((createError && !isCreating) || (updateError && !isUpdating)) {
        setFormErrors({ api: 'Failed to save product. Please try again.' });
        setAlert({ type: 'error', message: 'Failed to save product. Please try again.' });
    }
  }, [createSuccess, updateSuccess, createError, updateError, isCreating, isUpdating, currentProduct, formData.name, refetch]);


  const openCreateModal = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
    setFormErrors({});
    setAlert(null); 
  };

  const openEditModal = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
    setFormErrors({});
    setAlert(null); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
    setFormErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Product name is required.';
    if (!formData.description) errors.description = 'Description is required.';
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) < 0) errors.price = 'Valid price is required.';
    if (!formData.category) errors.category = 'Category is required.';
    if (!formData.size) errors.size = 'Size is required.';
    if (!formData.color) errors.color = 'Color is required.';
    if (!formData.stock || isNaN(formData.stock) || parseInt(formData.stock) < 0) errors.stock = 'Valid stock quantity is required.';
    if (!formData.image) errors.image = 'Image URL is required.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (currentProduct) {
        await updateProduct({ id: currentProduct._id, product: formData });
      } else {
        await createProduct(formData);
      }
    } catch (err) {
      console.error('Failed to save product (from handleSubmit):', err);
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirmModal(true);
    setDeleteError(null);
    setAlert(null); 
  };

  const closeDeleteConfirmModal = () => {
    setShowDeleteConfirmModal(false);
    setProductToDelete(null);
    setDeleteError(null);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const response = await deleteProduct(productToDelete._id);
      console.log("delete response ", response);
    } catch (err) {
      console.error('Failed to delete product (from confirmDelete):', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
        <p className="ml-4 text-xl text-gray-700">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-50 to-indigo-100 text-red-600 text-lg font-medium">
        <p>Error fetching products: {error.message || 'Something went wrong!'}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Product Catalog</h1>
          <button
            onClick={openCreateModal}
            className="flex items-center bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg shadow-lg hover:from-green-600 hover:to-teal-700 transition duration-300 transform hover:scale-105"
          >
            <FaPlus className="mr-2 text-xl" /> Add New Product
          </button>
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

        {products.length > 0 ? (
          filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  <tr>
                    <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Product ID</th>
                    <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Product Name</th>
                    <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Category</th>
                    <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Price</th>
                    <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Stock</th>
                    <th className="py-3 px-6 text-left text-lg font-semibold tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product, index) => (
                    <tr key={product._id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition-colors duration-200 ease-in-out`}>
                      <td className="py-4 px-6 text-gray-800 font-mono text-sm">{product._id}</td>
                      <td className="py-4 px-6 text-gray-800 font-medium">{product.name}</td>
                      <td className="py-4 px-6 text-gray-700">{product.category}</td>
                      <td className="py-4 px-6 text-green-700 font-semibold">${product.price?.toFixed(2)}</td>
                      <td className="py-4 px-6 text-gray-900 font-semibold">{product.stock}</td>
                      <td className="py-4 px-6 flex items-center space-x-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center shadow-md transition duration-200 transform hover:scale-105"
                        >
                          <FaEdit className="mr-2" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product)}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg flex items-center shadow-md transition duration-200 transform hover:scale-105"
                        >
                          <FaTrashAlt className="mr-2" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-600 text-xl py-10">
              <p>No products match your search "{searchTerm}".</p>
            </div>
          )
        ) : (
          <div className="text-center text-gray-600 text-xl py-10">
            <p>No products found. Click "Add New Product" to get started!</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl relative transform scale-100 animate-fade-in-up">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200"
            >
              <HiXMark className="h-8 w-8" />
            </button>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
              {currentProduct ? 'Edit Product' : 'Add New Product'}
            </h2>

            {formErrors.api && (
              <p className="text-red-600 text-center mb-4">{formErrors.api}</p>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.name && <p className="text-red-500 text-xs italic mt-1">{formErrors.name}</p>}
              </div>
              <div>
                <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.category ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.category && <p className="text-red-500 text-xs italic mt-1">{formErrors.category}</p>}
              </div>
              <div>
                <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price ($)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.price ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.price && <p className="text-red-500 text-xs italic mt-1">{formErrors.price}</p>}
              </div>
              <div>
                <label htmlFor="stock" className="block text-gray-700 text-sm font-bold mb-2">Stock Quantity</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.stock ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.stock && <p className="text-red-500 text-xs italic mt-1">{formErrors.stock}</p>}
              </div>
              <div>
                <label htmlFor="size" className="block text-gray-700 text-sm font-bold mb-2">Size</label>
                <input
                  type="text"
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.size ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.size && <p className="text-red-500 text-xs italic mt-1">{formErrors.size}</p>}
              </div>
              <div>
                <label htmlFor="color" className="block text-gray-700 text-sm font-bold mb-2">Color</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.color ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.color && <p className="text-red-500 text-xs italic mt-1">{formErrors.color}</p>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.image ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.image && <p className="text-red-500 text-xs italic mt-1">{formErrors.image}</p>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.description ? 'border-red-500' : 'border-gray-300'}`}
                ></textarea>
                {formErrors.description && <p className="text-red-500 text-xs italic mt-1">{formErrors.description}</p>}
              </div>

              <div className="md:col-span-2 flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-8 py-3 rounded-lg shadow-xl hover:from-indigo-700 hover:to-purple-800 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {(isCreating || isUpdating) && (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                  )}
                  {currentProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirmModal && productToDelete && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative transform scale-100 animate-fade-in-up">
            <button
              onClick={closeDeleteConfirmModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200"
            >
              <HiXMark className="h-8 w-8" />
            </button>
            <h2 className="text-2xl font-bold text-red-700 mb-4 text-center">Confirm Deletion</h2>
            <p className="text-gray-700 text-lg mb-6 text-center">
              Are you sure you want to delete the product "<span className="font-semibold text-gray-900">{productToDelete.name}</span>"?
              This action cannot be undone.
            </p>

            {deleteError && (
              <p className="text-red-600 text-center mb-4">{deleteError}</p>
            )}

            <div className="flex justify-center space-x-4">
              <button
                onClick={closeDeleteConfirmModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={isDeleting} // Crucially controlled by RTK Query's isDeleting state
              >
                {isDeleting && ( // Spinner only shows when isDeleting is true
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetProducts;