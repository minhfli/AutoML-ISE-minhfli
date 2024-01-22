"use client";
import React from "react";
import {Button} from "@/src/components/ui/button";
import {Input} from "@/src/components/ui/input";
import {Label} from "@/src/components/ui/label";
import axios from 'axios';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/src/components/ui/card";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/src/components/ui/select";
import {toast} from 'sonner'
import {useRouter} from 'next/navigation';
import httpStatusCode from "@/src/app/errors/httpStatusCode";

type formSchemaType = {
    email: string;
    name: string;
    task: string;
    description?: string;
    training_time: string;
};

export default function Index() {
    const router = useRouter();

    const [form, setForm] = React.useState<formSchemaType>({
        email: localStorage.getItem('userEmail') || '',
        name: '',
        description: '',
        task: 'Image Classification',
        training_time: '60'
    });


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setForm((prevForm) => ({
            ...prevForm,
            [event.target.id]: event.target.value,
        }))
    };


    async function onSubmit(form: formSchemaType) {
        try {
            toast.loading("Creating project...");
            const res = await axios.post("/api/projects", {
                email: form.email,
                name: form.name,
                task: form.task,
                description: form.description,
                training_time: form.training_time,
            });
            if (res.status === httpStatusCode.CREATED || res.status === 200) {
                toast.dismiss();
                const {project_name, project_id} = res.data;
                toast.success(`Project ${project_name} created successfully.`);
                router.push(`/projects/${project_id}/data`);
            } else {
                toast.error(`Unexpected response status: ${res.status}`);
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === httpStatusCode.UNAUTHORIZED) {
                    toast.error("User has not logged in yet");
                    router.push('/login');
                } else {
                    toast.error(`Error: ${error.response.status} - ${error.message}`);
                }
            } else {
                toast.error(`Error: ${error.message}`);
            }
        }
    }

    //
    // useEffect(() => {
    //     const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    //         event.returnValue = "Are you sure you want to leave? Your changes may be lost.";
    //     };
    //     window.addEventListener("beforeunload", handleBeforeUnload);
    //     return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    // }, []);


    return (
        <>
            <div className="card flex justify-center items-center">
                <Card className="w-1/3 border-gray-400">

                    <CardHeader className="overflow-auto">
                        <CardTitle>New project</CardTitle>
                        <CardDescription>
                            Select a task, language, and how many models you want to train. You will prepare the data in
                            the next step.
                            Because this is still in beta, we recommend you to use a small dataset to start with.
                        </CardDescription>
                    </CardHeader>

                    {/* This is a single-line comment in JSX */}
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="name">Project name</Label>
                                    <Input id="name" placeholder="Name of your project" autoComplete="off"
                                           spellCheck={false}
                                           onChange={handleInputChange}
                                           required={true}
                                    />

                                </div>
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input id="description" placeholder="Description of your project"
                                           autoComplete="off"
                                           spellCheck={false}
                                           onChange={handleInputChange}
                                           required={true}
                                           type = "text"
                                    />

                                </div>


                                <div className="flex flex-col space-y-1.75">
                                    <Label htmlFor="training_time">Training time (The longer the better)</Label>
                                    <Input id="training_time"
                                           type="number"
                                           placeholder="Enter your training time you expected (s)"
                                           autoComplete="off"
                                           spellCheck={false}
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
                                            defaultValue="Image Classification"
                                    >


                                        <SelectTrigger id="framework">
                                            <SelectValue placeholder="Text Classification"/>
                                        </SelectTrigger>
                                        <SelectContent className="max-h-60 overflow-y-auto" position="popper">
                                            <SelectGroup>
                                                <SelectItem value="Text Classification">Text Classification</SelectItem>
                                                <SelectItem value="Image Classification">Image
                                                    Classification</SelectItem>
                                                <SelectItem value="Object Detection">Object Detection</SelectItem>
                                                <SelectItem value="Tabular Data Classification (Multi-class)">Tabular
                                                    Data Classification (Multi-class)</SelectItem>
                                                <SelectItem value="Text Generation">Text Generation</SelectItem>
                                                <SelectItem value="Question Answering">Question Answering</SelectItem>
                                                <SelectItem value="Summarization">Summarization</SelectItem>
                                                <SelectItem value="Tabular Data Regression">Tabular Data
                                                    Regression</SelectItem>
                                                <SelectItem value="LLM Finetuning">LLM Finetuning</SelectItem>
                                            </SelectGroup>
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
