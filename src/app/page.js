import React from 'react';
import Image from 'next/image';
import ShortenExpress from './components/ShortenExpress';

const HomePage = () => {
  return (
    <div className="">
      <div className="absolute w-full h-screen">
        <Image
          src="/bg.png"
          alt="Background"
          width={1280}
          height={720}
          className="object-cover w-full h-full overflow-hidden opacity-50  "
        />
        </div>
        <ShortenExpress/>
        <a href="https://github.com/orackle/url_shortener">
        <Image class="absolute animate-bounce w-10 h-10 absolute bottom-5 right-5 pointer-cursor" alt="logo" width={32} height={32} src='/dia.svg' title='Coding Challenges by John Crickett, developed by orackle on github' /></a>




      </div>
  );
};

export default HomePage;
