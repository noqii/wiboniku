import { NextRequest } from "next/server";
import {z} from 'zod';

const formSchema = z.object({
    url: z.string().min(10).url({
        message: 'Twibbon Field must be an URL',
    }).regex(/https:\/\/(www\.)?twibbonize\.com\/[a-zA-Z0-9]+/gi),
});

export async function POST(request: NextRequest) {
    const json = await request.json();
    const data = await formSchema.safeParseAsync(json);
    if (data.error) {
        return Response.json({
            message: data.error.message,
        }, {
            status: 400,
        });
    }

    const frameName = new URL(data.data.url).pathname.replace(/([\/]+|\s+)/g, '');
    const response = await fetch(`https://api.twibbonize.com/v2/campaign/${encodeURIComponent(frameName)}`, {
        next: {
            revalidate: 3600,
        },
    }).catch(() => undefined);

    const jsondata = await response?.json();
    if (response?.status !== 200) {
        return Response.json({
            message: jsondata.message ?? 'Couldnt fetch',
        }, {
            status: 400,
        });
    }

    return Response.json({
        data: {
            ...jsondata.data,
            frames: jsondata.data.modules.at(0)?.data.frames ?? [],
        },
    });
}