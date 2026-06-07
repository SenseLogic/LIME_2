// -- IMPORTS

import sharp from "sharp";

// -- FUNCTIONS

export async function readImage(
    imageFilePath
    )
{
    try
    {
        return await Deno.readFile( imageFilePath );
    }
    catch ( error )
    {
        throw error;
    }
}

// ~~

export async function writeImage(
    imageBuffer,
    imageFilePath
    )
{
    try
    {
        await Deno.writeFile( imageFilePath, imageBuffer );
    }
    catch ( error )
    {
        throw error;
    }
}

// ~~

export async function createResizedImage(
    imageBuffer,
    newWidth,
    newHeight,
    quality = 80,
    fit = "cover",
    fileFormat = "avif"
    )
{
    try
    {
        return (
            await sharp( imageBuffer )
                .resize(
                    newWidth,
                    newHeight,
                    {
                        fit: fit as keyof sharp.FitEnum
                    }
                    )
                .toFormat(
                    fileFormat as keyof sharp.FormatEnum,
                    {
                        quality: quality
                    }
                    )
                .toBuffer()
            );
    }
    catch ( error )
    {
        throw error;
    }
}

// ~~

export async function createConstrainedImage(
    imageBuffer,
    minimumWidth = 0,
    maximumWidth = 32768,
    minimumHeight = 0,
    maximumHeight = 32768,
    _quality = 80,
    fileFormat = "avif"
    )
{
    try
    {
        let metadata = await sharp( imageBuffer ).metadata();
        let { width: newWidth, height: newHeight } = metadata;

        if ( newWidth < minimumWidth )
        {
            newHeight = Math.round( newHeight * minimumWidth / newWidth );
            newWidth = minimumWidth;
        }
        else if ( newWidth > maximumWidth )
        {
            newHeight = Math.round( newHeight * maximumWidth / newWidth );
            newWidth = maximumWidth;
        }

        if ( newHeight < minimumHeight )
        {
            newWidth = Math.round( newWidth * minimumHeight / newHeight );
            newHeight = minimumHeight;
        }
        else if ( newHeight > maximumHeight )
        {
            newWidth = Math.round( newWidth * maximumHeight / newHeight );
            newHeight = maximumHeight;
        }

        return (
            await sharp( imageBuffer )
                .resize( newWidth, newHeight )
                .toFormat( fileFormat as keyof sharp.FormatEnum )
                .toBuffer()
            );
    }
    catch ( error )
    {
        throw error;
    }
}

// ~~

export async function createLimitedImage(
    imageBuffer,
    maximumPixelCount,
    quality = 80,
    fileFormat = "avif"
    )
{
    try
    {
        let metadata = await sharp( imageBuffer ).metadata();
        let oldPixelCount = metadata.width * metadata.height;

        if ( oldPixelCount > maximumPixelCount )
        {
            let scaleRatio = Math.sqrt( maximumPixelCount / oldPixelCount );
            let newWidth = Math.max( Math.round( metadata.width * scaleRatio ), 1 );
            let newHeight = Math.max( Math.round( metadata.height * scaleRatio ), 1 );

            return (
                await sharp( imageBuffer )
                    .resize( newWidth, newHeight )
                    .toFormat(
                        fileFormat as keyof sharp.FormatEnum,
                        {
                            quality: quality
                        }
                        )
                    .toBuffer()
                );
        }
        else
        {
            return imageBuffer;
        }
    }
    catch ( error )
    {
        throw error;
    }
}
