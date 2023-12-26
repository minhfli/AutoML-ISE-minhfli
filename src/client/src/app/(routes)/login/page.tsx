import Image from "next/image";
import logo from "@/public/logo.png"
import { Button } from "@/src/components/ui/button";
export default function LoginForm() {
    return (
        <>
            <div className="flex justify-center items-center w-full h-screen">
                <div className="flex flex-col justify-center items-center gap-4">
                    <div className="flex justify-center items-center">
                        <Image src={logo} alt="logo" width={50} height={50} />
                        <h1 className="text-4xl font-bold text-center">Login</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="flex flex-col justify-center items-center gap-4">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" className="w-80 h-10 px-3 py-1 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300" />
                        </div>
                        <div className="flex flex-col justify-center items-center gap-4">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" className="w-80 h-10 px-3 py-1 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300" />
                        </div>
                    </div>
                    <Button className="w-80 h-10">Login</Button>
                </div>
            </div>
        </>
    )
}