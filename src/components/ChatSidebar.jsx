import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ModalChat from './ModalChat';
import ModalAgenda from './ModalAgenda';

const ChatSidebar = ({ onClicEnDiv }) => {

    const [data, setData] = useState([]);


    const [numeroSeleccionado, setNumeroSeleccionado] = useState(null);

    const handleClick = (numberw) => {
        // Aquí puedes hacer lo que necesites con el número seleccionado
        console.log('Número seleccionado:', numberw);
        // Puedes guardar el número en el estado si es necesario
        setNumeroSeleccionado(numberw);
        // También puedes pasarlo a otro componente aquí o realizar otras acciones
    };

    const formatFecha = (fechaCompleta) => {
        const fecha = new Date(fechaCompleta);
        return fecha.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const MostrarTodos = () => {
        alert("Filtrar Mostrar Todos")
    }

    const MostrarNoLeidos = () => {
        alert("Filtrar Mostrar No Leidos")
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/chats_no_respondidos.php');
                // Mapea los datos y formatea la fecha
                const formattedData = response.data.map(item => ({
                    ...item,
                    fecha: formatFecha(item.fecha),
                }));
                console.log(data)
                setData(formattedData);
            } catch (error) {
                console.error('Error al obtener datos de la API:', error);
            }
        };

        fetchData();

    }, []);

    return (
        <>
            <div className="w-full lg:w-[650px] xl:w-[600px] 2xl:w-[700px] h-screen lg:h-[80vh] lg:z-20 bg-gray-200 border-r flex flex-col items-center border-gray-300 shadow-lg p-3">
                <div className='flex justify-start 2xl:justify-center gap-[20px] items-center w-full'>
                    <div className='w-[45px]'>
                        <img src="logo.png" alt="" />
                    </div>
                    <div className='w-[50%]'>
                        <ModalAgenda />
                    </div>
                    <div className='w-[50%]'>
                        <ModalChat />
                    </div>
                </div>

                <div className='bg-[#fff] h-8 my-2 w-full'>

                    <div className="relative mb-3" data-te-input-wrapper-init>
                        <input
                            type="search"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleSearch2"
                            placeholder="Type query" />
                        <label
                            htmlFor="exampleSearch2"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.2rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >Search</label>
                    </div>

                </div>

                <div className='w-full h-10 flex justify-center gap-3'>
                    <div className='w-[50%] bg-gray-800 hover:bg-gray-900 grid place-content-center font-bold text-white rounded cursor-pointer' onClick={MostrarTodos}>
                        <span>TODOS</span>
                    </div>
                    <div className='w-[50%] bg-slate-500 hover:bg-slate-800 grid place-content-center font-bold text-white rounded cursor-pointer' onClick={MostrarNoLeidos}>
                        <span>NO LEIDOS</span>
                    </div>

                </div>



                <div className='w-full h-[75%] overflow-auto custom-scrollbar2 lg:-z-10 mt-3 bg-white rounded-xl'>
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className='flex gap-2 w-full py-2 border-b border-gray-300 relative justify-center items-center hover:bg-gray-300 cursor-pointer p-2 rounded-t'
                            onClick={() => {
                                handleClick(item.numberw);
                                onClicEnDiv(item.numberw);
                            }}
                        >
                            <div className='w-[50px]'>
                                <img src="user.webp" alt="" />
                            </div>

                            <div className='w-full h-12 overflow-hidden relative pt-6'>
                                <span className='absolute top-1 tex-xs font-semibold h-6 overflow-hidden text-gray-800'>
                                    {item.name ? item.name : 'Usuario'}
                                </span>
                                <span className='text-[#5f6368] text-[13.5px]'>
                                    {item.men}
                                </span>
                            </div>

                            <div className='flex translate-y-[-14px] h-2 gap-1'>
                                <div className="bg-gray-800 hover:bg-black text-white font-bold w-5 h-5 flex justify-center items-center rounded-full">
                                    <i className="fa-solid fa-gear text-xs"></i>
                                </div>
                                <div className="bg-green-500 hover:bg-green-600 text-white font-bold w-5 h-5 flex justify-center items-center rounded-full">
                                    <i className="fa-solid fa-bell text-xs"></i>
                                </div>
                                <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-5 h-5 flex justify-center items-center rounded-full">
                                    <i className="fa-solid fa-paper-plane text-xs"></i>
                                </div>
                            </div>
                            <span className='absolute right-2 bottom-0 text-[12px]'>
                                {item.fecha}
                            </span>
                        </div>


                    ))}
                </div>
            </div>
        </>
    );
};

export default ChatSidebar;
