import React from "react";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { FormDescription, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";

export const DialogFrameUrl: React.FC<{
    url: string;
    isTwibbonize: boolean;
}> = (props) => {
    const [frameUrl, setFrameUrl] = React.useState<string>();
    const [text, setText] = React.useState<string>();
    const [error, setError] = React.useState<Error>();

    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const canvasref = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        async function fetchData() {
            if (props.isTwibbonize && props.url.length) {
                setError(undefined);
                setText(undefined);
                setFrameUrl(undefined);

                const json = JSON.stringify({
                    url: props.url,
                });
        
                const response = await fetch('/api/twbframe', {
                    method: 'POST',
                    body: json,
                }).catch(() => undefined);
        
                const jsonresp = await response?.json();
        
                if (response?.status !== 200) {
                    const err = new Error(jsonresp.message);
                    err.name = 'NotFound';

                    setError(err);
                    return;
                } else {
                    setFrameUrl(`https://frame.twibbonize.com/${jsonresp.data.frames.at(0)}`);
                    setText(`Frame (${jsonresp.data.campaign.name}) twibbonize.com by ${jsonresp.data.campaign.campaignCreator.name}`);
                }
            }
        }

        fetchData();
    }, [props]);

    const generateBtn = async () => {
        if (frameUrl && fileInputRef.current?.files?.length) {
            const bingkai = new Image();
            const avatar = new Image();

            avatar.src != await fileInputRef.current.files.item(0)?.text();

            console.log(avatar);
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Frame Settings
                </DialogTitle>
                <DialogDescription>
                    Applying your image into twibbon frame
                </DialogDescription>
                <div>
                    {error && (
                        <Alert variant={'destructive'}>
                            <AlertCircle className={cn('h-4', 'w-4')} />
                            <AlertTitle>Error ({error.name})!</AlertTitle>
                            <AlertDescription>
                                {error.message}
                            </AlertDescription>
                        </Alert>
                    )}

                    {text?.length && (
                        text
                    )}
                </div>
                <canvas ref={canvasref} />
                <FormItem>
                    <FormLabel>
                        Foto Wibonize
                    </FormLabel>
                    <Input type="file" placeholder="Gambar yang mau di wibonize" ref={fileInputRef} />
                    <FormDescription>
                        Pastikan ekstensinya berupa {['jpg', 'png', 'jpeg'].map(x => <kbd key={x}>.{x} </kbd>)}
                    </FormDescription>
                </FormItem>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" onClick={generateBtn}>
                        Generate
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}