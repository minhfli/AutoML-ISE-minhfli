"use client";
import { toast } from "sonner"

import { Button } from "@/src/components/ui/button"

export default function SonnerDemo() {
  return (
    <Button
      variant= "destructive"
      onClick={() =>
        toast("Event has been created", {
          description: new Date().toLocaleDateString(),
          action: {
            label: "Undo",
            onClick: () => console.log(),
          },
        })
      }
    >
      Show Toast
    </Button>
  )
}
