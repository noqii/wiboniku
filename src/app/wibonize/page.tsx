'use client';

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {useForm} from 'react-hook-form';
import { cn } from "@/lib/utils";
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
    frameUrl: z.string().min(10).url({
        message: 'Twibbon Field must be an URL',
    }),
});

export default function Wibonize() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            frameUrl: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
        <section className={cn('min-h-screen')}>
            <h1 className={cn('md:text-6xl', 'text-4xl', 'text-[#006769]', 'font-extrabold', 'font-sans', 'text-center')}>
                Wibonize
            </h1>
            <p className={cn('text-lg', 'font-sans', 'font-normal', 'text-center', 'text-wrap')}>
                Here you can easily use your twibbonize frame if you already had it on twibbonize.com or create new one with wiboniku by clicking button below
            </p>
            <Tabs defaultValue="account" className="text-center mt-5">
                <TabsList>
                    <TabsTrigger value="twb">Twibbonize frame</TabsTrigger>
                    <TabsTrigger value="wibo">Wiboniku</TabsTrigger>
                </TabsList>
                <TabsContent value="twb">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name="frameUrl" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Frame URL
                                    </FormLabel>
                                    <FormControl className={cn('items-center', 'justify-center', 'z-10')}>
                                        <Input placeholder="Frame URL" {...field} className={cn('w-1/2')} />
                                    </FormControl>
                                    <FormDescription>
                                        Twibbonize.com Frame URL
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </form>
                    </Form>
                </TabsContent>
                <TabsContent value="wibo">

                </TabsContent>
            </Tabs>
        </section>
    )
}