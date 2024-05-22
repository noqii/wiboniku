'use client';

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function Home()
{
  const [progress, setProgress] = React.useState(Math.floor(Math.random() * 40));

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(95), 500)
    return () => clearTimeout(timer)
  }, [progress, setProgress]);

  return (
    <section className={cn('md:h-screen', 'md:w-full','md:flex', 'md:flex-col', 'md:justify-center', 'md:items-center')}>
      <section className={cn('flex', 'space-x-2', 'p-5', 'flex-col', 'md:text-center', 'md:align-middle', 'md:justify-center', 'md:items-center')}>
        <h1 className={cn('md:text-8xl', 'text-6xl', 'text-[#006769]', 'font-extrabold', 'font-sans')}>
          Wiboniku
        </h1>
        <p className={cn('text-2xl', 'mt-5', 'font-sans', 'font-normal', 'text-wrap', 'md:w-96')}>
          Alternatif <span className={cn('font-medium', 'text-[#40A578]', 'text-md')}>
            <Link href={'https://twibbonize.com'} target="_blank">
              twibbonize.com
            </Link>
          </span> tanpa watermark dan of course <span className={cn('font-bold', 'font-sans', 'uppercase', 'text-[#40A578]')}>gratis!</span>
        </p>
      </section>
      <section className={cn('flex', 'space-x-4', 'flex-row', 'md:text-center', 'md:align-middle', 'md:justify-center', 'md:items-center', 'ml-6')}>
        <Button className={cn('bg-[#40A578]', 'hover:bg-[#006769]')} asChild size={'lg'}>
          <Link href={'/wibonize'}>
            Wibonize!
          </Link>
        </Button>
        <Button variant={'outline'} className={cn('bg-transparent', 'text-black')} size={'lg'}>
          Login
        </Button>
      </section>
      <section className={cn('mt-12')}>
        <h1 className={cn('ml-5', 'md:text-center', 'text-4xl', 'md:text-6xl', 'font-bold', 'text-[#006769]')}>
          Why <span className={cn('text-[#40A578]')}>Wiboniku</span> ?
        </h1>
        <div className={cn('mt-3', 'md:mt-5')}>
          <p className={cn('md:text-center', 'text-md', 'ml-6')}>
            Because we&apos;re <i>
              open-source, fast, and free
            </i>
          </p>
          <div className={cn('flex', 'flex-row', 'text-center', 'align-middle', 'justify-center', 'items-center', 'mt-3', )}>
            <Progress value={progress} className="w-[85%] md:w-[70%] lg:w-[50%] bg-[#9DDE8B]" />
          </div>
          <p className={cn('text-center', 'mt-5', 'font-light', 'text-wrap')}>
            We are strongly focusing on generate frame image without watermark, and provide free service
          </p>
        </div>
      </section>

      <p className={cn('font-sans', 'text-sm', 'font-light', 'text-center', 'mt-24')}>
        &copy; Hanif Dwy Putra S made with 💓 and hosted on SMAN 3 Palu server
      </p>
    </section>
  )
}