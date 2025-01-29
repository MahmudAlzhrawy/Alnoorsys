import { dbConection } from "@/lib/db";
import { Client } from "@/models/customer";

export async function GET(req, {params} ) {
  const { id } = await params; // الحصول على id مباشرة من params
  try {
    await dbConection();
    const client = await Client.findById(id);
    if (!client) {
      return new Response(JSON.stringify({ message: "Client not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(client), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching client:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function PATCH(req, { params }) {
  const { id } =await params;
  try {
    await dbConection();
    const body = await req.json();
    const { name, price, status, code, lences, frame, phone,totalPrice,remainPrice } = body;

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { name, price, status, code, frame, phone, lences,totalPrice,remainPrice },
      { new: true }
    );

    if (!updatedClient) {
      return new Response(JSON.stringify({ message: "Client not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedClient), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating client:", error);
    return new Response(JSON.stringify({ message: "Error updating client" }), {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    await dbConection();
    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      return new Response(
        JSON.stringify({ message: `No client found with id = ${id}` }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: `Deleted successfully the client with id = ${id}` }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting client:", error);
    return new Response(JSON.stringify({ message: "Error deleting client" }), {
      status: 500,
    });
  }
}
