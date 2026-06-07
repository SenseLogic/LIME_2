// -- TYPES

class BunnyService
{
    // -- ATTRIBUTES

    apiKey: string | undefined;
    baseUrl: string | undefined;
    storageName: string | undefined;

    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.baseUrl = Deno.env.get( "LIME_PROJECT_BUNNY_STORAGE_URL" );
        this.storageName = Deno.env.get( "LIME_PROJECT_BUNNY_STORAGE_NAME" );
        this.apiKey = Deno.env.get( "LIME_PROJECT_BUNNY_STORAGE_KEY" );
    }

    // -- INQUIRIES

    getFileUrl(
        filePath
        )
    {
        return this.baseUrl + "/" + this.storageName + "/" + filePath;
    }

    // ~~

    async uploadFile(
        localFile,
        storageFilePath
        )
    {
        try
        {
            let response = await fetch(
                this.getFileUrl( storageFilePath ),
                {
                    method: "PUT",
                    headers:
                    {
                        "AccessKey": this.apiKey ?? "",
                        "Content-Type": "application/octet-stream"
                    },
                    body: localFile
                }
                );

            if ( !response.ok )
            {
                throw new Error( "Failed to upload file: " + response.statusText );
            }

            let data = null;

            try
            {
                let text = await response.text();

                if ( text.length > 0 )
                {
                    data = JSON.parse( text );
                }
            }
            catch
            {
                // Ignore empty / non-JSON responses
            }

            return data;
        }
        catch ( error )
        {
            console.error( "Error uploading file to Bunny CDN:", error );

            return null;
        }
    }

    // ~~

    async copyFile(
        localFile,
        storageFilePath,
        _storageFileIsOverwritten = false
        )
    {
        let fileData;

        if ( typeof localFile === "string" )
        {
            fileData = await Deno.readFile( localFile );
        }
        else
        {
            fileData = localFile;
        }

        // Note: Bunny CDN doesn't support overwrite flag in PUT requests
        // Files are automatically overwritten if they exist
        return await this.uploadFile( fileData, storageFilePath );
    }

    // ~~

    async removeFile(
        storageFilePath
        )
    {
        try
        {
            let response = await fetch(
                this.getFileUrl( storageFilePath ),
                {
                    method: "DELETE",
                    headers:
                    {
                        "AccessKey": this.apiKey ?? ""
                    }
                }
                );

            if ( !response.ok )
            {
                throw new Error( "Failed to remove file: " + response.statusText );
            }

            let data = null;

            try
            {
                let text = await response.text();

                if ( text.length > 0 )
                {
                    data = JSON.parse( text );
                }
            }
            catch
            {
                // Ignore empty / non-JSON responses
            }

            return data;
        }
        catch ( error )
        {
            console.error( "Error removing file from Bunny CDN:", error );

            return null;
        }
    }
}

// -- VARIABLES

export let bunnyService = new BunnyService();
