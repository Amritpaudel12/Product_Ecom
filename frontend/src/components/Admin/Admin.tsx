// In your Admin.jsx or the component managing the state
import React,{ useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Topbar from './Topbar';
import Users from './Users';
import GetProducts from './GetProducts';

function Admin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setSearchParams({ query: newSearchTerm });
  };

  useEffect(() => {
    setSearchTerm(searchParams.get('query') || '');
  }, [searchParams]);

  return (
    <div className="admin-layout">
      <Topbar  />
      <main className="p-6">
        <Users searchTerm={searchTerm} />
        <GetProducts searchTerm={searchTerm} />
      </main>
    </div>
  );
}

export default Admin;