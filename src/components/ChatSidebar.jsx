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
            <div className="w-full lg:w-[450px] xl:w-[500px] 2xl:w-[650px] h-screen lg:h-[80vh] lg:z-20 bg-gray-200 border-r flex flex-col items-center border-gray-300 shadow-lg p-3">
                <div className='flex justify-start 2xl:justify-center gap-[5px] items-center w-full'>
                    <div className='w-[45px]'>
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

                    <div className="flex my-2 w-full relative bg-white h-9 justify-start overflow-hidden">
                        <input className='w-full absolute h-[100%] pl-2 outline-none' type="search" name="" id="" placeholder="Buscar..." />
                        <p className='opacity-0 -z-10'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, laborum voluptate molestias unde corrupti error at aspernatur laudantium optio quasi delectus quo nihil ea aperiam quos dolore adipisci, voluptatem quisquam. Libero perspiciatis quidem, illo laborum iusto impedit velit voluptates enim voluptatibus molestiae facere esse doloremque deleniti maiores eligendi eveniet laudantium ipsam, omnis exercitationem corrupti, nesciunt aliquam! Nam consequuntur officia perferendis sed, distinctio tempore repellendus maxime cumque consequatur. Animi ex, neque perspiciatis, aliquam eos corporis dolor vero error explicabo ipsum, molestias itaque eius ea fuga sit tempora! Ex earum nobis quasi veritatis autem, alias cumque ullam porro? Minus quis fugiat harum!</p>
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



                <div className='w-full h-[75%] overflow-auto z-1 mt-3 bg-white rounded-xl'>
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
