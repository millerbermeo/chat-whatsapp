import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ChatMenssage({ numeroSeleccionado }) {
  const [mensajes, setMensajes] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [scrollRef, setScrollRef] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();
        formData.append('numberw', numeroSeleccionado);

        const response = await axios.post(
          'http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/chats_principal.php',
          formData
        );

        setMensajes(response.data);

        // Desplazar hacia abajo después de cargar los mensajes
        if (scrollRef && scrollRef.scrollTop === 0) {
          scrollRef.scrollTop = scrollRef.scrollHeight;
        }
      } catch (error) {
        console.error('Error al realizar la petición:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [numeroSeleccionado, scrollRef]);

  const renderMedia = (mensaje) => {
    if (mensaje.tipo_media === 'image') {
      return (
        <img
          src={mensaje.url}
          alt="Imagen"
          className="max-w-[200px] h-auto object-contain cursor-pointer"
          onClick={() => setFullscreenImage(mensaje.url)}
        />
      );
    } else if (mensaje.tipo_media === 'document') {
      return (
        <a target='_blank' href={mensaje.url} download>
          <button className="bg-[#005187] hover:bg-[#005187]/80 text-white font-bold px-4 py-2 rounded">
            {mensaje.men}
          </button>
        </a>
      );
    } else if (mensaje.tipo_media === 'video') {
      return (
        <video controls className="w-[200px] h-auto object-contain cursor-pointer">
          <source src={mensaje.url} type="video/mp4" />
          <source src={mensaje.url} type="video/webm" />
          <source src={mensaje.url} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      );
    } else if (mensaje.tipo_media === 'voice') {
      return (
        <audio controls className="cursor-pointer w-[200px]">
          <source src={mensaje.url} type="audio/mp3" />
          Your browser does not support the audio tag.
        </audio>
      );
    } else if (mensaje.tipo_media === 'sticker') {
      // Handle sticker rendering (ajusta el código según tu implementación de stickers)
      return (
        <img
          src={mensaje.url}
          alt="Sticker"
          className="max-w-[100px] h-auto object-contain cursor-pointer"
          onClick={() => setFullscreenImage(mensaje.url)}
        />
      );
    } else {
      return <div>{mensaje.men}</div>;
    }
  };

  const handleReloadPage = () => {
    window.location.reload();
  };

  return (
    <>
      <div className='w-full h-[78vh] md:h-[80vh] shadow-lg relative'>
        <div className="w-full h-[90%] overflow-y-scroll custom-scrollbar3 bg-[#fff] py-5 px-4 md:px-12" style={{ backgroundImage: "url('background2.png')", backgroundSize: "cover" }} ref={(ref) => setScrollRef(ref)}>
          <ul className="">
            {mensajes.map((mensaje, index) => (
              <li
                key={index}
                className={`flex items-end justify-${mensaje.b1 === '2' ? 'end' : 'start'} py-2 gap-2`}
              >
                {mensaje.b1 === '2' ? (
                  <>
                    <div className="text-[#fff] bg-[#84b6f4] rounded-lg p-2 text-right">
                      {renderMedia(mensaje)}
                    </div>
                    <img src="user.webp" alt="" className="w-10 h-10 rounded-full mr-2 hidden md:block" />
                  </>
                ) : (
                  <>
                    <img src="user.webp" alt="" className="w-10 h-10 rounded-full mr-2 hidden md:block" />
                    <div className="text-gray-800 bg-gray-100 rounded-lg p-2">{renderMedia(mensaje)}</div>
                  </>
                )}
              </li>
            ))}
            {fullscreenImage && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90  z-50 flex items-center justify-center" onClick={() => setFullscreenImage(null)}>
                <img
                  src={fullscreenImage}
                  alt="Imagen a pantalla completa"
                  className="w-96 h-auto"
                />
              </div>
            )}
          </ul>
        </div>
        <div className='w-full sticky h-14 bg-gray-200 bottom-0 mt-10'>
          <div className="w-[90%] mx-auto p-2 gap-2 flex">
            <button onClick={handleReloadPage} className='md:hidden' type='submit'>
              <div className='w-[40px] h-[40px] bg-[#000] rounded-[25px] text-white flex justify-center items-center text-2xl'>
                <i className="fa-solid fa-chevron-left"></i>
              </div>
            </button>
            <div className="relative w-full text-gray-600">
              <input
                className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Escribe algo..."
              />
            </div>
            <button type='submit'>
              <div className='w-[40px] h-[40px] bg-green-500 rounded-[25px] text-white flex justify-center items-center text-2xl'>
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatMenssage;
