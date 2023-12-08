import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

function ChatMenssage({ numeroSeleccionado }) {
  const [mensajes, setMensajes] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [scrollRef, setScrollRef] = useState(null);
  const [mostrarDiv, setMostrarDiv] = useState(false);
  const [emojiSelected, setEmojiSelected] = useState(false);
  const tipoArchivoRef = useRef(null);
  const lastMessageRef = useRef(null);
  const [shouldScrollToLast, setShouldScrollToLast] = useState(true);



  const handleEmojiClick = (emoji) => {
    // Agregar el emoji seleccionado al texto del input
    const input = mensajeInputRef.current;
    const cursorPosition = input.selectionStart;
    const textBeforeCursor = input.value.substring(0, cursorPosition);
    const textAfterCursor = input.value.substring(cursorPosition);
    const newText = textBeforeCursor + emoji.native + textAfterCursor;

    // Actualizar el estado del input
    mensajeInputRef.current.value = newText;

    // Mover el cursor después del emoji insertado
    const newCursorPosition = cursorPosition + emoji.native.length;
    mensajeInputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
    mensajeInputRef.current.focus();
    setEmojiSelected(true);
  };

  const toggleDiv = () => {
    setMostrarDiv(!mostrarDiv);
  };

  const mensajeInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      // No se seleccionó ningún archivo
      return;
    }

    // Determinar el tipo de archivo
    let fileType = "";
    if (selectedFile.type.startsWith("image/")) {
      fileType = "image";
    } else if (selectedFile.type.startsWith("video/")) {
      fileType = "video";
    } else {
      // Puedes agregar más condiciones según los tipos de archivo que necesites manejar
      fileType = "document";
    }

    // Almacena el tipo de archivo en una variable de estado o ref
    // Puedes usar setTipoArchivo(fileType) si lo almacenas en un estado

    // Realiza la lógica que necesites con el archivo seleccionado
    console.log('Archivo seleccionado:', selectedFile);

    // Puedes almacenar el tipo de archivo en el estado o ref
    // setTipoArchivo(fileType);
  };

  const enviarMensaje = async () => {
    try {

      setMostrarDiv(false);

      const mensaje = mensajeInputRef.current.value.trim();
      if (mensaje.length === 0 || (mensaje.length === 2 && emojiSelected)) {
        // Si el mensaje está vacío o solo contiene emojis, no enviar nada
        return;
      }

      const type_file = tipoArchivoRef.current || "";

      const formData2 = new FormData();
      formData2.append('numberw', numeroSeleccionado);
      formData2.append('message', mensajeInputRef.current.value);
      formData2.append('type_m', type_file);

      // Espera a que la operación asíncrona se complete
      await axios.post(
        'http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_send_message.php',
        formData2
      );

      mensajeInputRef.current.value = '';
      setShouldScrollToLast(true);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Evitar el salto de línea
      enviarMensaje();
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!numeroSeleccionado) {
          return;
        }
        const formData = new FormData();
        formData.append('numberw', numeroSeleccionado);

        const response = await axios.post(
          'http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/chats_principal.php',
          formData
        );

        // Invertir el orden de los mensajes antes de establecerlos en el estado
        const reversedMessages = response.data.reverse();
        setMensajes(reversedMessages);
        const prevMessagesLength = mensajes.length;

        // Enfocar el último mensaje
        if (lastMessageRef.current && shouldScrollToLast) {
          lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
          setShouldScrollToLast(false); // Desactivar el scroll automático después de la carga inicial
        }

        if (reversedMessages.length > prevMessagesLength) {
          setShouldScrollToLast(true);
        }

      } catch (error) {
        console.error('Error al realizar la petición:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [numeroSeleccionado, scrollRef, mensajes]);

  const renderMedia = (mensaje) => {
    if (mensaje.tipo_media === 'image') {
      return (
        <div className="relative">
          <img
            src={mensaje.url}
            alt="Imagen"
            className="max-w-[200px] h-auto object-contain cursor-pointer"
            onClick={() => setFullscreenImage(mensaje.url)}
          />
          <div className="absolute bottom-2 right-2">
            <a href={mensaje.url} download>
              <button className="bg-[#005187] hover:bg-[#005187]/80 text-white font-bold px-2 py-1 rounded">
                Descargar
              </button>
            </a>
          </div>
        </div>
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

  // style={{ backgroundImage: "url('background2.png')", backgroundSize: "cover" }}

  return (
    <>
      <div className='w-full h-[87vh] md:h-[95vh] shadow-lg relative flex flex-col bg-gray-100'>
        <div className="w-full mt-5 h-[100%] overflow-y-scroll custom-scrollbar3 px-4 md:px-12 bg-gray-100" ref={(ref) => setScrollRef(ref)}>
          <div className='absolute bottom-16 left-[40px] flex items-center flex-col'>

            {mostrarDiv ?
              <Picker data={data} onEmojiSelect={handleEmojiClick} /> : ''}
          </div>
          <ul className="">
            {mensajes.map((mensaje, index) => (
              <li
                key={index}
                className={`flex items-end justify-${mensaje.b1 === '2' ? 'end' : 'start'} py-2 gap-2`}
                ref={index === mensajes.length - 1 ? lastMessageRef : null}
              >
                {mensaje.b1 === '2' ? (
                  <>
                    <div className="text-[#fff] bg-[#84b6f4] max-w-[80%] rounded-lg p-2 text-right">
                      {renderMedia(mensaje)}
                    </div>
                    <i className="fa-solid border border-[#84b6f4] fa-user-tie text-2xl w-10 h-10 grid place-items-center text-[#84b6f4] bg-gray-200 rounded-full"></i>
                  </>
                ) : (
                  <>
                    <i className="fa-solid  border border-gray-300 fa-user text-2xl w-10 h-10 grid place-items-center text-gray-400 bg-[#f1f2f3] rounded-full"></i>
                    <div className="text-gray-800 bg-gray-300 rounded-lg p-2 font-semibold">{renderMedia(mensaje)}</div>
                  </>
                )}
              </li>
            ))}
            {fullscreenImage && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90  z-50 flex items-center justify-center" onClick={() => setFullscreenImage(null)}>
                <img
                  src={fullscreenImage}
                  alt="Imagen a pantalla completa"
                  className="w-[40%] h-auto max-h-[90%]"
                />
              </div>
            )}
          </ul>
        </div>

        <div className='w-full flex items-center justify-center h-14 bg-gray-200 bottom-0'>
          <div className="w-[90%] mx-auto p-2 gap-2 flex">
            <button onClick={handleReloadPage} className='md:hidden' type='submit'>
              <div className='w-[40px] h-[40px] bg-[#000] rounded-[25px] text-white flex justify-center items-center text-2xl'>
                <i className="fa-solid fa-chevron-left"></i>
              </div>
            </button>
            <div className="relative w-full text-gray-600">
              <div className='ml-10 absolute -left-8 top-2'>

                <input
                  id="fileInput"
                  type="file"
                  accept=".pdf, .jpg, .jpeg, .png, .gif, .mp4, .webm, .ogg"
                  onChange={handleFileChange}
                  ref={mensajeInputRef}
                  className="hidden" // Ocultar el input real
                />
                <label htmlFor="fileInput" className="file-input-label">
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                </label>




              </div>
              <div className='ml-10 absolute -left-2 top-2'>
                <button onClick={toggleDiv}>
                  <i className="fa-solid fa-icons"></i>
                </button>
              </div>
              <input
                ref={mensajeInputRef}
                onKeyDown={handleKeyDown}
                className="w-full border-2 border-gray-300 bg-white h-10 px-8 pl-14 pr-16 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Escribe algo..."
              />
            </div>
            <button type='submit' onClick={enviarMensaje}>
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
