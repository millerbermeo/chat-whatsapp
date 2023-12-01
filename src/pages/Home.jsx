import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatSidebar from '../components/ChatSidebar';
import Navbar from '../components/Navbar';
import ChatMenssage from '../components/ChatMenssage';

function Home() {
    const [numeroSeleccionado, setNumeroSeleccionado] = React.useState(null);

    const handleClick = (numberw) => {
      setNumeroSeleccionado(numberw);
    };
  return (
    <>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 w-full pl-4 lg:pl-16 lg:p-14 pt-0 lg:pt-4 pr-5 ml-1 pb-0">
          <Navbar />
          <div className='w-full flex flex-col lg:flex-row overflow-hidden rounded-lg mt-2 lg:mt-5 border'>
            <ChatSidebar onClicEnDiv={handleClick} />
            <ChatMenssage numeroSeleccionado={numeroSeleccionado} />
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
