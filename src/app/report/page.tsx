import { Suspense } from "react";
import Repo from "@/components/report"
export default function Report(){
    return(
        <>
            <Suspense fallback={<>loadding......</>}>
                <Repo/>
            </Suspense>
        </>
    )
}