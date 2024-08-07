import { createAnswer } from "@/services/openai/config.js";





export async function POST(req: Request) {

    const res = await req.json();
    // const formData = await req.formData()
    // const name = formData.get('message')
    const answer = await createAnswer(res);


    return Response.json({answer})
}
