import { useEffect, useContext } from 'react';
import axios from 'axios';
import { DataContext } from '../contexts/DataContext';

export const useFetchData = (endpoint, currentPage) => {
  const { setData, filters, setTotalPages, pageSize } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Define columns for users and products
        const userColumns = 'id,firstName,lastName,age,gender,email,phone,username,birthDate,bloodGroup,eyeColor,address';
        const productColumns = 'id,title,description,category,price,discountPercentage,rating,stock,brand,sku,warrantyInformation,availabilityStatus,thumbnail';

        // Determine if any filter is applied
        const activeFilters = Object.keys(filters).filter(key => filters[key]);
        const filterKey = activeFilters[0];
        const filterValue = filters[filterKey];

        let url = `https://dummyjson.com/${endpoint}`;
        let params = {
          limit: pageSize,
          skip: (currentPage - 1) * pageSize,
          ...(endpoint === 'users' && { select: userColumns }), // Only apply select for users
          ...(endpoint === 'products' && { select: productColumns }) // Only apply select for products
        };

        if (filterKey && filterValue) {
          if (endpoint === 'users') {
            if (filterKey === 'name') {
              // Use the search endpoint for name
              url = `https://dummyjson.com/${endpoint}/search?q=${filterValue}`;
            } else {
              // Use the filtering endpoint for other filters
              const formattedKey = filterKey.replace(/([a-z])([A-Z])/g, '$1.$2').toLowerCase();
              url = `https://dummyjson.com/${endpoint}/filter?key=${formattedKey}&value=${filterValue}`;
            }
          } else if (endpoint === 'products') {
            if (filterKey === 'title') {
              // Use the search endpoint for title
              url = `https://dummyjson.com/products/search?q=${filterValue}`;
            } else if (filterKey === 'category') {
              // Use the category endpoint
              url = `https://dummyjson.com/products/category/${filterValue}`;
            } else if (filterKey === 'brand') {
              // Use the brand endpoint
              url = `https://dummyjson.com/products/brand/${filterValue}`;
            }
          }
        }

        console.log("Request URL:", url);
        console.log("Request Params:", params);

        const response = await axios.get(url, { params });

        console.log("Fetched data:", response.data);

        const fetchedData = endpoint === 'users' ? response.data.users : response.data.products;

        setData(fetchedData);
        setTotalPages(Math.ceil(response.data.total / pageSize));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [endpoint, filters, currentPage, pageSize, setData, setTotalPages]);
};
