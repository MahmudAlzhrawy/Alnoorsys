import ShowClients from "@/components/showClients";
import { Metadata } from "next";
import { Suspense } from "react";

export function  generateMetadata():Metadata {
    return {
        title: "Clients",
        description: "List of all clients in Alnoor System",
    }
}
export default function AllClients(){
    return(
            <Suspense fallback={<h1>Loading ...................</h1>}>
                <ShowClients/>
            </Suspense>
            ) 
}