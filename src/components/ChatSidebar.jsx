import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ModalChat from './ModalChat';
import ModalAgenda from './ModalAgenda';

const ChatSidebar = () => {

    const [data, setData] = useState([]);

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
                setData(formattedData);
            } catch (error) {
                console.error('Error al obtener datos de la API:', error);
            }
        };

        fetchData();

    }, []);

    return (
        <>
            <div className="w-full lg:w-[450px] xl:w-[500px] 2xl:w-[650px] h-[80vh] bg-gray-200 border-r flex flex-col items-center border-gray-300 shadow-lg p-3">
                <div className='flex justify-between gap-4 items-center w-full'>
                    <div className='w-[45px] hidden lg:flex'>
                        <img src="logo.png" alt="" />
                    </div>
                    <div>
                        <ModalAgenda />
                    </div>
                    <div>
                        <ModalChat />
                    </div>
                </div>

                <div>

                    <div className="relative flex my-2 w-full">
                        <input type="search" className="bg-purple-white shadow rounded w-[100%] border-0 p-2 pl-8 outline-none lg:w-[350px] 2xl:w-[500px]" placeholder="Buscar Chat..." />
                        <div className="absolute pin-r left-2 pin-t mt-3 mr-4 text-purple-lighter">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
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



                <div className='w-full h-[75%] overflow-auto z-1 mt-3 bg-white rounded-lg'>
                    {data.map((item, index) => (
                        <div key={index} className='flex gap-2 w-full py-2 border-b border-gray-300 relative justify-center items-center hover:bg-gray-300 cursor-pointer p-2 rounded-t'>
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
                                    <i class="fa-solid fa-gear text-xs"></i>
                                </div>
                                <div className="bg-green-500 hover:bg-green-600 text-white font-bold w-5 h-5 flex justify-center items-center rounded-full">
                                <i class="fa-solid fa-bell text-xs"></i>
                                </div>
                                <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-5 h-5 flex justify-center items-center rounded-full">
                                <i class="fa-solid fa-paper-plane text-xs"></i>
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
