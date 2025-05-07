import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';

function Manager() {

    const ref = useRef(null);
    const passRef = useRef(null);
    const [form, setform] = useState({
        site: "",
        password: "",
        username: "",

    });

    const [passwordArray, setpasswordArray] = useState([]);
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const showPassword = () => {
        if (ref.current.src.includes('icon/show2.png')) {
            passRef.current.type = 'text';
            ref.current.src = 'icon/Hide.png';
        }
        else {
            ref.current.src = 'icon/show2.png';
            passRef.current.type = 'password';

        }
    }



    const savePassword = () => {
        if (form.site.length && form.password.length && form.username.length) {
            setpasswordArray([...passwordArray, { ...form, id: nanoid() }]);
            localStorage.setItem('password', JSON.stringify([...passwordArray, { ...form, id: nanoid() }]));
            form = {
                site: "",
                password: "",
                username: "",
            }
        }
        console.log(localStorage.getItem('password'));
    }

    useEffect(() => {
        const password = JSON.parse(localStorage.getItem('password'));
        if (password) setpasswordArray(password);

    }, [])

    const copyToClipboard = (text) => {
        //  console.log("Copying:", text); // Debugging
        toast.success("Copied to Clipboard");
        navigator.clipboard.writeText(text);
    };

    const deleteItem = (id) => {
        let c = confirm("Are you sure you want to delete this password?");
        if (c) {
            setpasswordArray(passwordArray.filter((curr) => curr.id !== id));
            localStorage.setItem('password', JSON.stringify(passwordArray.filter((curr) => curr.id !== id)));
        }
    }

    const editItem = (id) => {
        setform(passwordArray.filter((curr) => curr.id === id)[0]);

        setpasswordArray(passwordArray.filter((curr) => curr.id !== id));

    }
    const getHostname = (url) => {
        try {
            const { hostname } = new URL(url);
            return hostname.replace('www.', ''); // Remove 'www.' if present
        } catch (error) {
            return url; // Fallback to the original URL if parsing fails
        }
    };







    return (
        <>
            <ToastContainer autoClose={2000} />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className="container  mycontainer md:min-h-153 min-h-197 w-full">
                <h1 className='text-4xl font-bold text-center '>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
                <div className=' flex flex-col items-center p-4 mx-auto gap-3 text-black '>
                    <input value={form.site} onChange={handleChange} className=" bg-white rounded-full border  focus:border-green-700 focus:outline-1 border-green-500 w-full p-4 py-1" type="text" name="site" id="1" placeholder='Enter Website Url' />
                    <div className=' md:flex-row flex flex-col w-full gap-8 py-3'>
                        <input value={form.username} onChange={handleChange} className=" bg-white  focus:border-green-700  focus:outline-1  rounded-full border border-green-500 w-full p-4 py-1" type="text" name="username" id="2" placeholder='Enter Username' />
                        <div className='relative'>
                            <input ref={passRef} value={form.password} onChange={handleChange} className=" bg-white rounded-full border  focus:border-green-700 focus:outline-1 border-green-500 w-full p-4 py-1" type="password" name="password" id="3" placeholder='Enter Password' />
                            <span className='absolute right-0 py-1 cursor-pointer' onClick={showPassword} ><img ref={ref} width={23} className='pt-1 pr-1' src="./icon/show2.png" alt="" /></span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='border-1 border-green-900 flex gap-2 justify-center items-center bg-green-500 hover:bg-green-600 rounded-full px-6 py-1 w-fit '> <lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover"
                    >
                    </lord-icon> Add Password</button>
                </div>

                <div className="password">
                    <h2 className='font-bold text-2xl py-4'>Your Password</h2>
                    {passwordArray.length === 0 ? (<div className='py-4 font-bold text-red-500'> No Password Added </div>) : (

                        <table className="table-auto w-full overflow-hidden rounded-lg shadow-lg ">
                            <thead className='bg-green-800 w-full text-white '>
                                <tr>
                                    <th className='py-2' >Site Url</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100' width = "100%">{
                                passwordArray.map((curr) => {
                                    return (
                                        <tr>
                                            <td className=' md:min-w-32 text-center py-2 border-1 border-white'><a target='blank' href={curr.site}>{getHostname(curr.site)}</a> <div onClick={() => copyToClipboard(curr.site)} className=' inline-block px-2 hover:inverted-colors:to-black cursor-pointer' ><img className='w-4 h-4 hover:scale-110 transition-all delay-80' width={0.5} src="/icon/copy.png" alt="" /></div></td>
                                            <td className='md:min-w-32 text-center py-2 border border-white'>{curr.username} <div onClick={() => copyToClipboard(curr.username)} className='inline-block px-2 hover:inverted-colors:to-black cursor-pointer' 
                                                ><img className='w-4 h-4 hover:scale-110 transition-all delay-80' width={0.5} src="/icon/copy.png" alt="" /></div></td>
                                            <td className='md:min-w-32 text-center py-2 border border-white'>{curr.password} <div onClick={() => copyToClipboard(curr.password)} className='inline-block px-2 hover:inverted-colors:to-black cursor-pointer' ><img className='w-4 h-4 hover:scale-110 transition-all delay-80' width={0.5} src="/icon/copy.png" alt="" /></div></td>

                                            <td className='flex justify-center gap-5 md:min-w-32 text-center py-2 border border-white'>
                                                <img onClick={() => editItem(curr.id)} className='w-5 hover:scale-110  transition-all delay-80' src="/icon/pencil.png" alt="" />
                                                <img onClick={() => deleteItem(curr.id)} className='w-5 hover:scale-110 transition-all delay-80' src="/icon/bin.png" alt="" />
                                            </td>
                                        </tr>
                                    )
                                })

                            }

                            </tbody>
                        </table>

                    )}
                </div>

            </div>
        </>
    )
}

export default Manager
