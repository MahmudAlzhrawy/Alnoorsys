import UpdateClient from "@/components/updateClient";
import { Suspense } from "react";

// تعريف metadata للصفحة
export function generateMetadata() {
  return {
    title: "Update Client",
    description: "Update a client's details in Alnoor System",
  };
}

// استخدام PageProps المدمج مع Next.js
export default function UpdateClientPage({ params }) {
  const { clientId } = params; // استخراج clientId مباشرةً

  return (
    <Suspense fallback={<h1>loading......</h1>}>
      <UpdateClient clientId={clientId} />
    </Suspense>
  );
}
