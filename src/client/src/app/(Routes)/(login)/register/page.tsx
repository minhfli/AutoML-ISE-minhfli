"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/src/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form"
import Link from "next/link"


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    repeatPassword: z.string().min(8, {
        message: "Repeat password must match.",
    }),
}).refine(data => data.password === data.repeatPassword, {
    message: "Password must be matched.",
    path: ["repeatPassword"],
});

export default function RegisterForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            repeatPassword: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    const renderField = (name: "username" | "password" | "repeatPassword", label: string, description: string, type = 'text') => (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input type={type} autoComplete="off" placeholder={`Enter your ${label.toLowerCase()}`} {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors[name]?.message}</FormMessage>
                </FormItem>
            )}
        />
    );
    return (
        <div className="card bordered max-w-md mx-auto my-4 bg-base-100 shadow-xl">
            <div className="card-body">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} method="POST" className="space-y-4">
                        {renderField("username", "Email address or phone number", "Please enter a valid email or phone number.")}
                        {renderField("password", "Password", "Password must be at least 8 characters.", "password")}
                        {renderField("repeatPassword", "Repeat Password", "Repeat password must match.", "password")}
                        <div>
                            <button className="btn btn-primary w-full">Register</button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>

    )
}


