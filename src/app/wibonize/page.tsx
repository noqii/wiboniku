'use client';

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {useForm} from 'react-hook-form';
import { cn } from "@/lib/utils";
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DialogFrameUrl } from "@/components/core/DialogFrameUrl";

const formSchema = z.object({
    frameUrl: z.string().min(10).url({
        message: 'Twibbon Field must be an URL',
    }).regex(/https:\/\/(www\.)?twibbonize\.com\/[a-zA-Z0-9]+/gi),
});

export default function Wibonize() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            frameUrl: '',
        },
    });

    return (
        <section className={cn('h-screen', 'w-full','flex', 'flex-col', 'justify-center', 'items-center')}>
            <h1 className={cn('md:text-6xl', 'text-4xl', 'text-[#006769]', 'font-extrabold', 'font-sans', 'text-center')}>
                Wibonize
            </h1>
            <p className={cn('text-lg', 'font-sans', 'font-normal', 'text-center', 'text-wrap')}>
                Here you can easily use your twibbonize frame if you already had it on twibbonize.com or create new one with wiboniku by clicking button below
            </p>
            <Tabs defaultValue="account" className="text-center mt-5 md:w-1/2">
                <TabsList>
                    <TabsTrigger value="twb">Twibbonize frame</TabsTrigger>
                    <TabsTrigger value="wibo">Wiboniku</TabsTrigger>
                </TabsList>
                <TabsContent value="twb">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit((_, event) => {
                            event?.preventDefault();
                        })}>
                            <FormField control={form.control} name="frameUrl" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Frame URL
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Frame URL (e.g. https://twibbonize.com/smantiprestasi)" {...field} className={cn('w-full')} />
                                    </FormControl>
                                    <FormDescription>
                                        Twibbonize.com Frame URL
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <div className={cn('mt-5')}>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button type="submit" className={cn('bg-green-600', 'hover:bg-green-900')} disabled={!form.formState.isValid}>
                                            Generate
                                        </Button>
                                    </DialogTrigger>
                                    <DialogFrameUrl isTwibbonize={!form.getFieldState('frameUrl').invalid} url={form.getValues('frameUrl')} />
                                </Dialog>
                            </div>
                        </form>
                    </Form>
                </TabsContent>
                <TabsContent value="wibo">

                </TabsContent>
            </Tabs>
        </section>
    )
}