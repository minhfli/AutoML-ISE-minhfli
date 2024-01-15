"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/src/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "@/src/components/ui/select";
import { toast } from 'sonner'
import { useRouter } from 'next/navigation';

type formSchemaType = {
    email: string;
    name: string;
    task: string;
    modelsSearch: string;
};



async function testSubmit(form: formSchemaType) {
    const router = useRouter();
    try {
        const res = await axios.post("/api/project", {
            name : form.name,
            task: form.task,
            modelsSearch: form.modelsSearch,
        });
        console.log(res.status);
        if (res.status === 200) {
            toast.success('Project created successfully.');
            router.push('/data');
        } else {
            toast.error('Something went wrong.');
        }
    } catch (error: any) {
        toast.error(JSON.stringify(error.message));

        // setFeedback('Failed to submit. Please try again later.');
    } finally {
        // setSubmitting(false);
    }
}


export default function Index() {
    const router = useRouter();

    const form: formSchemaType = {
        email: localStorage.getItem('userEmail') || '',
        name: '',
        task: 'Text Classification',
        modelsSearch: 'Automatic'
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        form.name = event.target.value; // ko hieu sao lai bug nen danh phai lam nhu nay
    };


    async function onSubmit(form: formSchemaType) {
        try {
            const res = await axios.post("/api/project", {
                email : form.email,
                name : form.name,
                task: form.task,
                modelsSearch: form.modelsSearch,
            });
            console.log(res.status);
            if (res.status === 201) {
                const { project_name, user_name } = res.data;
                localStorage.setItem("project_name", project_name);
                localStorage.setItem("user_name", user_name);

                toast.success(JSON.stringify(form.name));
                toast.success(JSON.stringify(form.task));
                toast.success(JSON.stringify(form.modelsSearch));
                toast.success('Project created successfully.');
                router.push('/data');
            } else {
                toast.error('Something went wrong.');
            }
        } catch (error: any) {

            if (error.response && error.response.status === 401) {
                toast.error(JSON.stringify("User has not logged in yet"));
                router.push('/login');
            } else {
                toast.error(JSON.stringify(error.message));
            }
            // setFeedback('Failed to submit. Please try again later.');
        } finally {
            // setSubmitting(false);
        }
    }



    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.returnValue = "Are you sure you want to leave? Your changes may be lost.";
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, []);



    return (
        <>
            <div className="card flex justify-center items-center">
                <Card className="w-1/3 border-gray-400">

                    <CardHeader className="overflow-auto">
                        <CardTitle>New project</CardTitle>
                        <CardDescription>
                            Select a task, language, and how many models you want to train. You will prepare the data in the next step.
                            Because this is still in beta, we recommend you to use a small dataset to start with.
                        </CardDescription>
                    </CardHeader>

                    {/* This is a single-line comment in JSX */}
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="name">Project name</Label>
                                    <Input id="name" placeholder="Name of your project" autoComplete="off" spellCheck={false}
                                        onChange={handleInputChange}
                                        required={true}
                                    />

                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="task">Task</Label>
                                    <Select onValueChange={
                                        (value) => {
                                            form.task = value;
                                        }
                                    }
                                        defaultValue="Text Classification"
                                    >


                                        <SelectTrigger id="framework">
                                            <SelectValue placeholder="Text Classification" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-60 overflow-y-auto" position="popper">
                                            <SelectGroup>
                                                <SelectItem value="Text Classification">Text Classification</SelectItem>
                                                <SelectItem value="Image classfication">Image Classification</SelectItem>
                                                <SelectItem value="Object detection">Object Detection</SelectItem>
                                                <SelectItem value="Tabular Data Classification (Multi-class)">Tabular Data Classification (Multi-class)</SelectItem>
                                                <SelectItem value="Text Generation">Text Generation</SelectItem>
                                                <SelectItem value="Question Answering">Question Answering</SelectItem>
                                                <SelectItem value="Summarization">Summarization</SelectItem>
                                                <SelectItem value="Tabular Data Regression">Tabular Data Regression</SelectItem>
                                                <SelectItem value="LLM Finetuning">LLM Finetuning</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="framework">Models Search</Label>
                                    <Select
                                        onValueChange={
                                            (value) => {
                                                form.modelsSearch = value;
                                            }
                                        }

                                    >
                                        <SelectTrigger id="framework">
                                            <SelectValue placeholder="Automatic" />
                                        </SelectTrigger>
                                        <SelectContent position="item-aligned">
                                            <SelectItem value="Automatic">Automatic</SelectItem>
                                            <SelectItem value="Manually">Manually</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </form>
                    </CardContent>

                    {/* This is a single-line comment in JSX */}

                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button
                            onClick={async () => {
                                await onSubmit(form)
                                /*
                                    TODO: Submit form
                                */
                            }}
                        >Create Project</Button>
                    </CardFooter>
                </Card>
            </div>
        </>

    )
}
