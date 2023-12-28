"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/src/components/ui/button"
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


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    })
})

export default function ProfileForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    const renderField = (name: "username" | "password", label: string, description: string, type = 'text') => (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input type={type} autoComplete="false"  placeholder={`Enter your ${label.toLowerCase()}`} {...field} />
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {renderField("username", "Username", "Username must be at least 2 characters.")}
                        {renderField("password", "Password", "Password must be at least 8 characters.", "password")}
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>

    )
}


