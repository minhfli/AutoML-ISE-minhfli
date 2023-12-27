"use client"
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Toaster, toast } from 'sonner';
export default function App() {
    return (
        <div>
            <Toaster />
            <Input type="file" >
            </Input>
        </div>
    );
}