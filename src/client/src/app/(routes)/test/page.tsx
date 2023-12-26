"use client";
import * as React from "react"
import { Button } from "@/src/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select"
export default function Index() {
    const form = new FormData();
    form.append("name", "test");
    form.append("framework", "text-classification");
    form.append("model-search", "automatic");
    form.append("description", "test");
    form.append("language", "english");
    console.log(form.get("name"));


    return (
        <>
            <div className="flex justify-center items-center">
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
                                    <Input id="name" placeholder="Name of your project" autoComplete="off"/>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="framework">Task</Label>
                                    <Select>
                                        <SelectTrigger id="framework">
                                            <SelectValue placeholder="Text Classification" />
                                        
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="Text Classification">Text Classification</SelectItem>
                                            <SelectItem value="Image classfication">Image Classfication</SelectItem>
                                            <SelectItem value="Object detection">Object Detection</SelectItem>
                                            <SelectItem value="Tabular Data Classification">Tabular Data Classification</SelectItem>
                                            <SelectItem value="Text Generation">Text Generation</SelectItem>
                                            <SelectItem value="Question Answering">Question Answering</SelectItem>
                                            <SelectItem value="Summarization">Summarization</SelectItem>
                                            <SelectItem value="Tabular Data Regression">Tabular Data Regression</SelectItem>
                                            <SelectItem value="LLM Finetuning">LLM Finetuning</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="framework">Models Search</Label>
                                    <Select>
                                        <SelectTrigger id="framework">
                                            <SelectValue placeholder="Automatic" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
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
                        <Button>Create Project</Button>
                    </CardFooter>
                </Card>
            </div>
        </>

    )
}

// import { useState } from 'react';

// export default function ImageClassificationComponent() {
//     const [value, setValue] = useState('image');

//     return (
//         <div className="p-4">
//             <ToggleGroup.Root
//                 type="single"
//                 value={value}
//                 onValueChange={setValue}
//                 className="flex gap-2"
//             >
//                 <ToggleGroup.Item
//                     value="vision"
//                     title="Vision"
//                     className={`${value === 'vision' ? 'bg-blue-500 text-white' : 'bg-gray-100'
//                         } p-2`}
//                 >
//                     Vision
//                 </ToggleGroup.Item>
//                 <ToggleGroup.Item
//                     value="text"
//                     title="Text"
//                     className={`${value === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-100'
//                         } p-2`}
//                 >
//                     Text
//                 </ToggleGroup.Item>
//                 <ToggleGroup.Item
//                     value="tabular"
//                     title="Tabular"
//                     className={`${value === 'tabular' ? 'bg-blue-500 text-white' : 'bg-gray-100'
//                         } p-2`}
//                 >
//                     Tabular
//                 </ToggleGroup.Item>
//             </ToggleGroup.Root>
//             {value === 'vision' && (
//                 <div className="mt-4">
//                     <div className="flex items-center">
//                         <span className="mr-2 text-green-500">✔</span>
//                         <h2 className="text-lg font-semibold">Image Classification</h2>
//                     </div>
//                     <p className="text-sm text-gray-600 mt-1">
//                         Image Classification is the task of classifying images into an arbitrary number of groups.
//                     </p>
//                 </div>
//             )}
//         </div>
//     );
// }
