// -- IMPORTS

import { createCappedImage, createCoveredImage } from "senselogic-pika";
import { bunnyService } from "./bunny_service.ts";
import { supabaseService } from "./supabase_service.ts";

// -- TYPES

export class FileService
{
    // -- INQUIRIES

    getFileUrl(
        filePath
        )
    {
        if ( filePath.startsWith( "/bunny/" ) )
        {
            return bunnyService.getFileUrl( filePath.substring( 7 ) );
        }
        else if ( filePath.startsWith( "/supabase/" ) )
        {
            return supabaseService.getFileUrl( filePath.substring( 10 ) );
        }
        else
        {
            return filePath;
        }
    }

    // -- OPERATIONS

    async copyFile(
        sourceFile,
        targetFilePath,
        targetFileIsOverwritten = false
        )
    {
        if ( targetFilePath.startsWith( "/bunny/" ) )
        {
            return await bunnyService.copyFile(
                sourceFile,
                targetFilePath.substring( 7 ),
                targetFileIsOverwritten
                );
        }
        else if ( targetFilePath.startsWith( "/supabase/" ) )
        {
            return await supabaseService.copyFile(
                sourceFile,
                targetFilePath.substring( 10 ),
                targetFileIsOverwritten
                );
        }
        else
        {
            if ( typeof sourceFile !== "string" )
            {
                throw new Error(
                    "Local file copy requires sourceFile to be a file path string"
                    );
            }

            return await Deno.copyFile( sourceFile, targetFilePath );
        }
    }

    // ~~

    async removeFile(
        targetFilePath
        )
    {
        if ( targetFilePath.startsWith( "/bunny/" ) )
        {
            return await bunnyService.removeFile( targetFilePath.substring( 7 ) );
        }
        else if ( targetFilePath.startsWith( "/supabase/" ) )
        {
            return await supabaseService.removeFile( targetFilePath.substring( 10 ) );
        }
        else
        {
            return await Deno.remove( targetFilePath );
        }
    }

    // ~~

    async copyImageFile(
        sourceImageFile,
        targetFilePath,
        targetFileIsOverwritten = false
        )
    {
        let preloadImage = createCappedImage( sourceImageFile, 360, 720, "avif", 30 );
        let preloadImageFilePath = targetFilePath + ".preload.avif";
        await this.copyFile(
            preloadImage,
            preloadImageFilePath,
            targetFileIsOverwritten
            );

        let tinyImage = createCappedImage( sourceImageFile, 480, 960, "avif", 60 );
        let tinyImageFilePath = targetFilePath + ".tiny.avif";
        await this.copyFile( tinyImage, tinyImageFilePath, targetFileIsOverwritten );

        let smallImage = createCappedImage( sourceImageFile, 640, 1280, "avif", 60 );
        let smallImageFilePath = targetFilePath + ".small.avif";
        await this.copyFile(
            smallImage,
            smallImageFilePath,
            targetFileIsOverwritten
            );

        let mediumImage = createCappedImage( sourceImageFile, 960, 1920, "avif", 60 );
        let mediumImageFilePath = targetFilePath + ".medium.avif";
        await this.copyFile(
            mediumImage,
            mediumImageFilePath,
            targetFileIsOverwritten
            );

        let wideImage = createCappedImage( sourceImageFile, 1280, 2560, "avif", 60 );
        let wideImageFilePath = targetFilePath + ".wide.avif";
        await this.copyFile( wideImage, wideImageFilePath, targetFileIsOverwritten );

        let largeImage = createCappedImage( sourceImageFile, 1920, 1920, "avif", 60 );
        let largeImageFilePath = targetFilePath;
        await this.copyFile(
            largeImage,
            largeImageFilePath,
            targetFileIsOverwritten
            );

        let bigImage = createCappedImage( sourceImageFile, 2560, 2560, "avif", 60 );
        let bigImageFilePath = targetFilePath + ".big.avif";
        await this.copyFile( bigImage, bigImageFilePath, targetFileIsOverwritten );

        let hugeImage = createCappedImage( sourceImageFile, 3840, 3840, "avif", 60 );
        let hugeImageFilePath = targetFilePath + ".huge.avif";
        await this.copyFile( hugeImage, hugeImageFilePath, targetFileIsOverwritten );

        let metaImage = createCoveredImage( sourceImageFile, 1200, 630, "jpeg", 85 );
        let metaImageFilePath = targetFilePath + ".meta.jpg";
        await this.copyFile( metaImage, metaImageFilePath, targetFileIsOverwritten );
    }

    // ~~

    async removeImageFile(
        targetFilePath
        )
    {
        let preloadImageFilePath = targetFilePath + ".preload.avif";
        await this.removeFile( preloadImageFilePath );

        let tinyImageFilePath = targetFilePath + ".tiny.avif";
        await this.removeFile( tinyImageFilePath );

        let smallImageFilePath = targetFilePath + ".small.avif";
        await this.removeFile( smallImageFilePath );

        let mediumImageFilePath = targetFilePath + ".medium.avif";
        await this.removeFile( mediumImageFilePath );

        let wideImageFilePath = targetFilePath + ".wide.avif";
        await this.removeFile( wideImageFilePath );

        let largeImageFilePath = targetFilePath;
        await this.removeFile( largeImageFilePath );

        let bigImageFilePath = targetFilePath + ".big.avif";
        await this.removeFile( bigImageFilePath );

        let hugeImageFilePath = targetFilePath + ".huge.avif";
        await this.removeFile( hugeImageFilePath );

        let metaImageFilePath = targetFilePath + ".meta.jpg";
        await this.removeFile( metaImageFilePath );
    }

    // ~~

    async convertVideoFile(
        sourceVideoFile,
        targetFilePath,
        width,
        targetFileIsOverwritten = false
        )
    {
        let temporaryFilePath = await Deno.makeTempFile( { suffix: ".mp4" } );

        try
        {
            let command = new Deno.Command(
                "ffmpeg",
                {
                    args:
                    [
                        "-y",
                        "-i",
                        sourceVideoFile,
                        "-vf",
                        `scale=${ width }:-2`,
                        "-c:v",
                        "libx264",
                        "-crf",
                        "30",
                        "-preset",
                        "slow",
                        "-c:a",
                        "aac",
                        "-movflags",
                        "+faststart",
                        temporaryFilePath
                    ],
                    stdout: "piped",
                    stderr: "piped"
                }
                );

            let { code } = await command.output();

            if ( code === 0 )
            {
                await this.copyFile(
                    temporaryFilePath,
                    targetFilePath,
                    targetFileIsOverwritten
                    );
            }
            else
            {
                throw new Error( `Video conversion failed: ${ targetFilePath }` );
            }
        }
        finally
        {
            try
            {
                await Deno.remove( temporaryFilePath );
            }
            catch
            {
                // Ignore temp file deletion errors
            }
        }
    }

    // ~~

    async copyVideoFile(
        sourceVideoFile,
        targetFilePath,
        targetFileIsOverwritten = false
        )
    {
        let smallVideoFilePath = targetFilePath + ".small.mp4";
        await this.convertVideoFile(
            sourceVideoFile,
            smallVideoFilePath,
            640,
            targetFileIsOverwritten
            );

        let wideVideoFilePath = targetFilePath + ".wide.mp4";
        await this.convertVideoFile(
            sourceVideoFile,
            wideVideoFilePath,
            1280,
            targetFileIsOverwritten
            );

        let largeVideoFilePath = targetFilePath;
        await this.convertVideoFile(
            sourceVideoFile,
            largeVideoFilePath,
            1920,
            targetFileIsOverwritten
            );
    }

    // ~~

    async removeVideoFile(
        targetFilePath
        )
    {
        let smallVideoFilePath = targetFilePath + ".small.mp4";
        await this.removeFile( smallVideoFilePath );

        let wideVideoFilePath = targetFilePath + ".wide.mp4";
        await this.removeFile( wideVideoFilePath );

        let largeVideoFilePath = targetFilePath;
        await this.removeFile( largeVideoFilePath );
    }
}

// -- VARIABLES

export let fileService = new FileService();
