"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/src/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form"
import Link from "next/link"
import { toast } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"
import { setCookie, getCookie } from 'cookies-next';
import httpStatusCode from "@/src/app/errors/httpStatusCode";

const formSchema = z.object({
    email: z.string().min(2, {
        message: "Email must be at least 2 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    })
})

export default function ProfileForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const router = useRouter();

    const writeCookies = ({ accessToken }: { accessToken: string }) => {
        const cookieOptions = {
            path: '/',
            secure: true,
            sameSite: 'none' as const,
        };
        localStorage.setItem('userEmail', form.getValues('email'));
        setCookie('accessToken', accessToken, cookieOptions);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const result = await axios.post("/api/login", {
                email: values.email,
                password: values.password,
            });

            if (result.status === httpStatusCode.OK) {
                toast.success("Login successful!");
                writeCookies({
                    accessToken: result.data.access_token
                });
                router.push('/projects');
                toast.dismiss();
            } else {
                toast.error("Login failed! Check your form");
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Login failed. Please try again.");
        }
    }

    const renderField = (name: "email" | "password", label: string, description: string, type = 'text') => (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input type={type} autoComplete="off" placeholder={`Enter your ${label.toLowerCase()}`} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
    return (
        <div className="card bordered max-w-md mx-auto my-4 bg-base-100 shadow-xl">
            <div className="card-body">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} method="POST" className="space-y-4">
                        {renderField("email", "Email address or phone number", "Please enter a valid email or phone number.")}
                        {renderField("password", "Password", "Password must be at least 8 characters.", "password")}
                        <div>
                            <button className="btn btn-primary w-full">Log in</button>
                        </div>
                        <div className="text-center">
                            <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm">Forgotten password?</Link>
                        </div>
                        <div className="flex justify-center mt-4">
                            <Link href="/register" className="btn btn-success w-full">Create new account</Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>

    )
}
