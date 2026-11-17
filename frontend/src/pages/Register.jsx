import { useState } from "react"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { ToastContainer } from "react-toastify"
import { useFetch } from "../hooks/useFetch"

export const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { fetchDataBackend, loading } = useFetch()

    const registerUser = async (dataForm) => {
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000"
        const result = await fetchDataBackend(`${baseUrl}/api/registro`, dataForm, "POST")
        if (result) {
            navigate("/login")
        }
    }


    return (
        <div className="flex flex-col sm:flex-row h-screen">
            <ToastContainer/>

            <div className="w-full sm:w-1/2 h-screen bg-white flex justify-center items-center">


                <div className="md:w-4/5 sm:w-full">

                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">Bienvenido(a)</h1>

                    <small className="text-gray-400 block my-4 text-sm">Por favor ingresa tus datos</small> 
                    
                    {/* Formulario */}
                    <form onSubmit={handleSubmit(registerUser)}>

                        {/* Campo nombre */}
                        <div className="mb-3">
                            <label className="mb-1 block text-sm font-semibold">
                                Nombre <span className="text-red-500">* Campo obligatorio</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Ingresa tu nombre"
                                aria-invalid={errors.nombre ? "true" : "false"}
                                className={`block w-full rounded-md border py-1 px-1.5 text-gray-500 ${errors.nombre ? "border-red-500" : "border-gray-300"}`}
                                {...register("nombre", { required: "El nombre es obligatorio" })}
                            />
                            {errors.nombre && <p className="mt-1 text-sm text-red-500">{errors.nombre.message}</p>}
                        </div>


                        {/* Campo apellido */}
                        <div className="mb-3">
                            <label className="mb-1 block text-sm font-semibold">
                                Apellido <span className="text-red-500">* Campo obligatorio</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Ingresa tu apellido"
                                aria-invalid={errors.apellido ? "true" : "false"}
                                className={`block w-full rounded-md border py-1 px-1.5 text-gray-500 ${errors.apellido ? "border-red-500" : "border-gray-300"}`}
                                {...register("apellido", { required: "El apellido es obligatorio" })}
                            />
                            {errors.apellido && <p className="mt-1 text-sm text-red-500">{errors.apellido.message}</p>}
                        </div>


                        {/* Campo dirección */}
                        <div className="mb-3">
                            <label className="mb-1 block text-sm font-semibold">
                                Dirección <span className="text-red-500">* Campo obligatorio</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Ingresa tu dirección de domicilio"
                                aria-invalid={errors.direccion ? "true" : "false"}
                                className={`block w-full rounded-md border py-1 px-1.5 text-gray-500 ${errors.direccion ? "border-red-500" : "border-gray-300"}`}
                                {...register("direccion", { required: "La dirección es obligatoria" })}
                            />
                            {errors.direccion && <p className="mt-1 text-sm text-red-500">{errors.direccion.message}</p>}
                        </div>
                        

                        {/* Campo celular */}
                        <div className="mb-3">
                            <label className="mb-1 block text-sm font-semibold">
                                Celular <span className="text-red-500">* Campo obligatorio</span>
                            </label>
                            <input
                                type="text"
                                inputMode="tel"
                                placeholder="Ingresa tu celular"
                                aria-invalid={errors.celular ? "true" : "false"}
                                className={`block w-full rounded-md border py-1 px-1.5 text-gray-500 ${errors.celular ? "border-red-500" : "border-gray-300"}`}
                                {...register("celular", {
                                    required: "El celular es obligatorio",
                                    pattern: {
                                        value: /^\d{7,15}$/,
                                        message: "Ingresa un celular válido"
                                    }
                                })}
                            />
                            {errors.celular && <p className="mt-1 text-sm text-red-500">{errors.celular.message}</p>}
                        </div>


                        {/* Campo correo electrónico */}
                        <div className="mb-3">
                            <label className="mb-1 block text-sm font-semibold">
                                Correo electrónico <span className="text-red-500">* Campo obligatorio</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Ingresa tu correo electrónico"
                                aria-invalid={errors.email ? "true" : "false"}
                                className={`block w-full rounded-md border py-1 px-1.5 text-gray-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                {...register("email", {
                                    required: "El correo electrónico es obligatorio",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Ingresa un correo electrónico válido"
                                    }
                                })}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                        </div>



                        {/* Campo Contraseña */}
                        <div className="mb-3">
                            
                            <label className="block text-sm font-semibold mb-1">
                                Contraseña <span className="text-red-500">* Campo obligatorio</span>
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="************"
                                    aria-invalid={errors.password ? "true" : "false"}
                                    className={`w-full rounded-md border px-3 py-2 pr-10 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                                    {...register("password", {
                                        required: "La contraseña es obligatoria",
                                        minLength: {
                                            value: 6,
                                            message: "La contraseña debe tener al menos 6 caracteres"
                                        }
                                    })}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                        </div>


                        {/* Botón Register */}
                        <div className="mb-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-gray-500 text-slate-300 border py-2 w-full rounded-xl mt-5
                                hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white disabled:opacity-50"
                            >
                                {loading ? "Registrando..." : "Registrarse"}
                            </button>
                        </div>


                    </form>


                    {/* Enlace para iniciar sesión si ya tiene una cuenta */}
                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p>¿Ya posees una cuenta?</p>
                        <Link to="/login" className="py-2 px-5 bg-gray-500 text-slate-300 border rounded-xl hover:scale-110 
                        duration-300 hover:bg-gray-900">Iniciar sesión</Link>
                    </div>

                </div>

            </div>

            {/* Imagen */}
            <div className="w-full sm:w-1/2 h-1/3 sm:h-screen bg-[url('/public/images/dogregister.jpg')] bg-no-repeat 
                bg-cover bg-center sm:block hidden">
            </div>

        </div>
    )
}
