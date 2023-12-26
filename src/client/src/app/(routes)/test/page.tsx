import { Button } from "@/src/components/ui/button";

export default function Index() {
    return (
        <>
            <div className="flex justify-between items-center w-full ...">
                <Button className="bg-white">01</Button>
                <div className="flex justify-center gap-4">
                    <Button className="justify-self-start">02</Button>
                    <Button>03</Button>
                </div>
            </div>
        </>
    );
}
