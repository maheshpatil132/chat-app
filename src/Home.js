import React from 'react';
import Sidebar from './Sidebar';
import Chatbody from './Chatbody';
import { useMediaQuery } from 'react-responsive'
const Home = () => {

  const isTabletOrMobile = useMediaQuery({ query: '(min-width: 580px)' })
  return <section className='home'>
    {
      isTabletOrMobile &&  <Sidebar/>
    }
      <Chatbody/>
  </section>;
};

export default Home;
