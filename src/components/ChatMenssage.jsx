import React from 'react'

function ChatMenssage() {

    const EnviarSms = () => {
        alert("Mensaje Enviado")
    }
    return (
        <>
            <div className='hidden z-10 lg:block w-full h-[80vh] shadow-lg relative'>
                <div class="w-full h-[100%] p-5 bg-white rounded-lg overflow-y-scroll shadow-lg">

                    <ul class="divide-y divide-gray-300 pb-14">
                        <li class="flex items-end justify-end py-2 gap-2">
                            <div class="text-blue-600 font-bold bg-blue-100 rounded-lg p-2 text-right">
                                Hola, ¿cómo estás?
                            </div>
                            <img src="user.webp" alt="" class="w-10 h-10 rounded-full mr-2" />
                        </li>
                        <li class="flex items-end justify-start py-2">
                            <img src="user.webp" alt="" class="w-10 h-10 rounded-full mr-2" />
                            <div class="text-gray-800 bg-gray-100 rounded-lg p-2">
                                ¡Hola! Estoy bien, ¿y tú?
                            </div>
                        </li>
                        <li class="flex items-end justify-end py-2 gap-2">
                                <div class="text-blue-600 font-bold bg-blue-100 rounded-lg p-2 text-right" >
                                Todo bien, gracias por preguntar.
                            </div>
                            <img src="user.webp" alt="" class="w-10 h-10 rounded-full mr-2"/>
                        </li>

                        <li class="flex items-end justify-start py-2">
                            <img src="user.webp" alt="" class="w-10 h-10 rounded-full mr-2" />
                            <div class="text-gray-800 bg-gray-100 rounded-lg p-2">
                                ¡Hola! Estoy bien, ¿y tú?
                            </div>
                        </li>
                        <li class="flex items-end justify-end py-2 gap-2">
                                <div class="text-blue-600 font-bold bg-blue-100 rounded-lg p-2 text-right" >
                                Todo bien, gracias por preguntar.
                            </div>
                            <img src="user.webp" alt="" class="w-10 h-10 rounded-full mr-2"/>
                        </li>

                        <li class="flex items-end justify-start py-2">
                            <img src="user.webp" alt="" class="w-10 h-10 rounded-full mr-2" />
                            <div class="text-gray-800 bg-gray-100 rounded-lg p-2">
                                ¡Hola! Estoy bien, ¿y tú?
                            </div>
                        </li>
                        <li class="flex items-end justify-end py-2 gap-2">
                                <div class="text-blue-600 font-bold bg-blue-100 rounded-lg p-2 text-right" >
                                Todo bien, gracias por preguntar.
                            </div>
                            <img src="user.webp" alt="" class="w-10 h-10 rounded-full mr-2"/>
                        </li>

                        <li class="flex items-end justify-start py-2">
                            <img src="user.webp" alt="" class="w-10 h-10 rounded-full mr-2" />
                            <div class="text-gray-800 bg-gray-100 rounded-lg p-2">
                                ¡Hola! Estoy bien, ¿y tú?
                            </div>
                        </li>
                        <li class="flex items-end justify-end py-2 gap-2">
                                <div class="text-blue-600 font-bold bg-blue-100 rounded-lg p-2 text-right" >
                                Todo bien, gracias por preguntar.
                            </div>
                            <img src="user.webp" alt="" class="w-10 h-10 rounded-full mr-2"/>
                        </li>

                        <li class="flex items-end justify-start py-2">
                            <img src="user.webp" alt="" class="w-10 h-10 rounded-full mr-2" />
                            <div class="text-gray-800 bg-gray-100 rounded-lg p-2">
                                ¡Hola! Estoy bien, ¿y tú?
                            </div>
                        </li>
                        <li class="flex items-end justify-end py-2 gap-2">
                                <div class="text-blue-600 font-bold bg-blue-100 rounded-lg p-2 text-right" >
                                Todo bien, gracias por preguntar.
                            </div>
                            <img src="user.webp" alt="" class="w-10 h-10 rounded-full mr-2"/>
                        </li>
                        
                    </ul>

                </div>
                <div className='w-full sticky h-14 bg-gray-200 bottom-0'>
                    <div className="w-[90%] mx-auto p-2 gap-2 flex">
                        <div className="relative w-full text-gray-600">
                            <input className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:border-blue-500" type="text" placeholder="Escribe algo..." />
                        </div>
                        <button type='submit' onClick={EnviarSms}>
                            <div className='w-[40px] h-[40px] bg-green-500 rounded-[25px] text-white flex justify-center items-center text-2xl'>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ChatMenssage
