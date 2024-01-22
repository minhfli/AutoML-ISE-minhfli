"use client";
import {Button} from "@/src/components/ui/button";
import {usePathname, useRouter} from "next/navigation";
import React, {useState} from "react";
import {toast} from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/src/components/ui/dialog"
import {LoaderIcon} from "lucide-react";
import httpStatusCode from "@/src/app/errors/httpStatusCode";
import axios from "axios";


export default function Page() {
    const pathName = usePathname()
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const handleTrain = async () => {
        try {
            setLoading(true)
            const userEmail = localStorage.getItem('userEmail') as string;
            const projectId = pathName.split("/")[2];
            const res = await axios.post('/api/projects/train', {
                userEmail: userEmail,
                projectId: projectId,
            })

            if (res.status === httpStatusCode.OK) {
                const {validation_accuracy, training_evaluation_time} = res.data;
                toast.success(`Train thành công với độ chính xác: ${validation_accuracy}`);
                toast.success("Thời gian train và evaluate" + training_evaluation_time);
                router.push(`/projects/${projectId}/predict`);
            } else {
                toast.error("Train thất bại :(");
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }
    return (
        loading ? (
            <Dialog open={true}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription className="flex justify-center">
                            <LoaderIcon className="w-10 h-10 animate-spin"/>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        ) : (
            <div className="flex justify-center">
                <Button id="train" onClick={handleTrain}> Train </Button>
            </div>
        )
    );
}