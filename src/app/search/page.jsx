 
import axios from 'axios'; 
import SearchPageLayout from '@/components/properties/searchClient';

// Disable ISR/SSG revalidation; always serve static content
export const revalidate = false;  

const SearchPage = async () => {

  //Fetch properties from the API
  const res = await axios.get(
    'https://mira-strapi-dev.q.starberry.com/api/properties/?_limit=50&populate=deep'
  );
  const properties = res.data.data;


  // Pass fetched properties to the client-side layout component
  return <SearchPageLayout properties={properties} />;
};

export default SearchPage;