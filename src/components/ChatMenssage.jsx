import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ChatMenssage({ numeroSeleccionado }) {
  const [mensajes, setMensajes] = useState([]);

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
      } catch (error) {
        console.error('Error al realizar la petición:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [numeroSeleccionado]);

  const renderMedia = (mensaje) => {
    if (mensaje.tipo_media === 'image') {
      return <img src={mensaje.url} alt="Imagen" className="w-full max-h-96 object-contain" />;
    } else if (mensaje.tipo_media === 'document') {
      return (
        <a target='_blank' href={mensaje.url} download>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded">
            {mensaje.men}
          </button>
        </a>
      );
    } else {
      // Puedes agregar más tipos de media según sea necesario
      return <div>{mensaje.men}</div>;
    }
  };

  return (
    <>
      <div className='hidden z-10 lg:block w-full h-[80vh] shadow-lg relative'>
        <div className="w-full h-[100%] overflow-y-scroll custom-scrollbar3 bg-[#fff] py-5 px-12">
          <ul className="pb-14">
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
                    <img src="user.webp" alt="" className="w-10 h-10 rounded-full mr-2" />
                  </>
                ) : (
                  <>
                    <img src="user.webp" alt="" className="w-10 h-10 rounded-full mr-2" />
                    <div className="text-gray-800 bg-gray-100 rounded-lg p-2">{renderMedia(mensaje)}</div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className='w-full sticky h-14 bg-gray-200 bottom-0'>
          <div className="w-[90%] mx-auto p-2 gap-2 flex">
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
