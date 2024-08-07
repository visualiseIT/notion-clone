"use client";

import {Dialog, DialogContent, DialogFooter, DialogHeader} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
//import { useSettings } from "@/hooks/use-setting";
import {useOpenAIBot} from "@/hooks/use-openai-bot";
import {useState} from "react";
import {Bot} from "lucide-react";


export const OpenAIBotModal = () => {
    const settings = useOpenAIBot();
    const [answer, setAnswer] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);


    async function fetcher(data: { [k: string]: FormDataEntryValue; }) {
        try {
            setLoading(true);


            const response = await fetch("/api/gpt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                setAnswer(result.answer);
            } else {
                console.error("Bad Response");
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
            <DialogContent>
                <DialogHeader className="border-b pb-3">
                    <h2 className="text-lg font-medium">My Chat Bot</h2>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                        <Label>Appearance</Label>
                        <span className="text-[0.8rem] text-muted-foreground">Chat to OpenAI chat bot here:</span>
                    </div>
                    {/*<ModeToggle/>*/}


                </div>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        // @ts-ignore
                        const formData = new FormData(event.target);
                        const data = Object.fromEntries(formData);
                        fetcher(data);
                    }}
                >
                    <label htmlFor="persona">Persona:</label>
                    <input
                        type="text"
                        id="persona"
                        name="persona"
                        defaultValue="Jarvis"
                    />
                    <hr/>
                    <label htmlFor="message">Question:</label>
                    <br/>
                    <textarea
                        id="message"
                        name="message"
                        defaultValue="Can you help me expand my notes with relavent information?"
                        style={{width:"450px"}}
                    />
                    <br/>
                    <br/>
                    <button style={{float:'right', marginRight:15}}>Ask <Bot style={{display:'inline', marginTop:'-7px'}}></Bot></button>
                </form>
                {/*{loading ? <p>loading..</p> : <p>{answer?.answer.content ?? "Answer will appear here.."}</p>}*/}
                <DialogFooter>
                    {loading ? <p>loading..</p> : <p>{answer?.content ?? "Answer will appear here.."}</p>}
                </DialogFooter>
            </DialogContent>

        </Dialog>
    );
};
