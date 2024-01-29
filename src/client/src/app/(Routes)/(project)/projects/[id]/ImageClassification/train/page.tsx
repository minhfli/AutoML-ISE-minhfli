"use client"
import React from "react";
import {Button} from "@/src/components/ui/button";
import {Input} from "@/src/components/ui/input";
import {Label} from "@/src/components/ui/label";
import axios from 'axios';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/src/components/ui/card";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/src/components/ui/select";
import {toast} from 'sonner'
import {usePathname, useRouter} from 'next/navigation';
import httpStatusCode from "@/src/app/errors/httpStatusCode";

type formSchemaType = {
    training_time: string;
};

export default function Index() {
    const router = useRouter();

    const [form, setForm] = React.useState<formSchemaType>({
        training_time : '60',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setForm((prevForm) => ({
            ...prevForm,
            [event.target.id]: event.target.value,
        }))
    };

    const pathName = usePathname();

    async function onSubmit(form: formSchemaType) {
        try {
            const userEmail = localStorage.getItem('userEmail') as string;
            const projectId = pathName.split("/")[2];
            const res = await axios.post("/api/projects/ImageClassification/train", {
                userEmail : userEmail,
                projectId : projectId,
                training_time : form.training_time,
            });
            if (res.status === httpStatusCode.CREATED || res.status === 200) {
                router.push(`/projects/${projectId}/ImageClassification/train/view`);
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

    return (
        <>
            <div className="card flex justify-center items-center">
                <Card className="w-1/3 border-gray-400">

                    <CardHeader className="overflow-auto">
                        <CardTitle>Create new run</CardTitle>
                        <CardDescription>
                            Select a task, language, and how many models you want to train. You will prepare the data in
                            the next step.
                            Because this is still in beta, we recommend you to use a small dataset to start with.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
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
                            </div>
                        </form>
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button
                            onClick={async () => {
                                await onSubmit(form)
                            }}
                        >Submit Training</Button>
                    </CardFooter>
                </Card>
            </div>
        </>

    )
}
