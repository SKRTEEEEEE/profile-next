"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";

const TestButton = ({className}: {className?:string}) => {
    return (
        <Button variant={"outline"} className={className} onClick={()=> toast.info("You're inside dev🟩", {description: "Good hack time!"})}>
          Click
        </Button>
    );
};

export default TestButton;