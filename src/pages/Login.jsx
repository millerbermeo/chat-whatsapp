import React from 'react'

function Login() {
  return (
    <div className='w-[100%] h-screen grid place-items-center'>
      <div>
       <div className="max-w-md m-auto  w-96">
        <div
          className="border-t-4 border-blue-600 overflow-hidden rounded shadow-lg"
        >
          <h3 className="text-xl text-center mt-8 mb-8">Bienvenido a<br></br> <span className='font-bold text-3xl'>Negociemos</span></h3>
          <div className="px-4 mb-4">
            <input
              type="text"
              placeholder="Email"
              className="border border-gray rounded w-full p-3"
            />
          </div>
          <div className="px-4 mb-4">
            <input
              type="text"
              placeholder="Contraseña"
              className="border border-gray rounded w-full p-3"
            />
          </div>
          <div className="px-4 mb-4 flex">
            <div className="w-1/2 flex gap-2">
              <input
                type="checkbox"
                className="align-middle cursor-pointer -mt-1"
                id="remember-me"
              />
              <label
                htmlFor="remember-me"
                className="align-middle text-gray-700 text-md cursor-pointer"
                > Recordar</label>
            </div>
            <div className="w-full text-right">
              <a href="#" className="font-semibold no-underline text-black"
                >Olvidaste tu constraseña?</a>
            </div>
          </div>
          <div className="px-4 mb-6">
            <button
              className="border border-blue-500 bg-blue-600 rounded w-full px-4 py-3 text-white font-semibold"
            >
              Ingresar
            </button>
          </div>
          <div className="bg-gray-100 text-center text-gray-700 py-5">
            Crear Cuenta?
            <a href="#" className="font-semibold no-underline text-black"> Signup</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login
