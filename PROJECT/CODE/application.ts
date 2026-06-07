// -- IMPORTS

import { defineDualTag, defineLineTag, defineTag, getBrowserLanguageCode, getDefaultLanguageCode, getLocalizedText, setDefaultLanguageCode, setLanguageCode, setLanguageSeparator } from "senselogic-lingo";
import { readGsonFileText, readGsonFileValue, writeFileText } from "senselogic-gson-file";

// -- VARIABLES

let applicationData: any = null;

// -- FUNCTIONS

export function readDataFile(
    filePath: string
    )
{
    let textDecoder = new TextDecoder( "utf-8" );
    let applicationDataFile = Deno.readFileSync( filePath );

    return textDecoder.decode( applicationDataFile );
}

// ~~

export function getApplicationData(
    ) : any
{
    if ( applicationData === null )
    {
        try
        {
            // writeFileText( "data/application_data.json", readGsonFileText( "data/application_data.gson", true, readDataFile ) );
            applicationData = readGsonFileValue( "data/application_data.gson", true, readDataFile );
        }
        catch ( error )
        {
            console.error( error );
            throw error;
        }
    }

    return applicationData;
}

// ~~

export function getHeaderMenuData(
    applicationData: any,
    request: any = null
    )
{
    return (
        {
            homePage: applicationData.homePage,
            headerMenu: applicationData.headerMenu,
            languageByCodeMap: applicationData.languageByCodeMap,
            pageUrlByLanguageCodeMap: getPageUrlByLanguageCodeMapFromRequest( request )
        }
        );
}

// ~~

export function getFooterMenuData(
    applicationData: any
    )
{
    return (
        {
            homePage: applicationData.homePage,
            footerMenu: applicationData.footerMenu
        }
        );
}

// ~~

export function getPageUrlByLanguageCodeMap(
    pathWithoutLanguage: string,
    search: string = ""
    ) : Record<string, string>
{
    let pageUrlByLanguageCodeMap: Record<string, string> = {};

    for ( let optionLanguageCode of getLanguageCodeArray() )
    {
        pageUrlByLanguageCodeMap[ optionLanguageCode ]
            = getLanguageCodePath( pathWithoutLanguage, optionLanguageCode ) + search;
    }

    return pageUrlByLanguageCodeMap;
}

// ~~

export function getRequestUrl(
    request: any
    ) : string | null
{
    if ( typeof request === "string" )
    {
        return request;
    }
    else if ( request?.url instanceof URL )
    {
        return request.url.href;
    }
    else if ( request && typeof request.url === "string" )
    {
        return request.url;
    }
    else if ( request instanceof Request )
    {
        return request.url;
    }
    else if ( request?.req instanceof Request )
    {
        return request.req.url;
    }
    else if ( request?.req?.url )
    {
        return request.req.url;
    }
    else
    {
        return null;
    }
}

// ~~

export function getPageUrlByLanguageCodeMapFromRequest(
    request: any
    ) : Record<string, string>
{
    let url = getRequestUrl( request );

    if ( !url )
    {
        return getPageUrlByLanguageCodeMap( "/" );
    }

    let parsedUrl = new URL( url );
    let pathWithoutLanguage = getPathWithoutLanguage( parsedUrl.pathname );

    return getPageUrlByLanguageCodeMap( pathWithoutLanguage, parsedUrl.search );
}

// ~~

export function getLocalizedTextBySlug(
    slug: string
    ) : string
{
    let applicationData = getApplicationData();
    let text = applicationData.textBySlugMap[ slug ];

    if ( typeof text === "string" )
    {
        return getLocalizedText( text );
    }
    else
    {
        return slug;
    }
}

// ~~

export function getLanguageArray(
    ) : Array<{ code: string; name: string; iconPath: string }>
{
    let applicationData = getApplicationData();

    return Object.entries( applicationData.languageByCodeMap ).map(
        ( [ languageCode, languageData ]: [ string, any ] ) =>
        (
            {
                code: languageCode,
                name: languageData.name,
                iconPath: languageData.iconPath
            }
            )
        );
}

// ~~

export function getLanguageCodeArray(
    ) : string[]
{
    let applicationData = getApplicationData();

    return Object.keys( applicationData.languageByCodeMap );
}

// ~~

export function isValidLanguageCode(
    languageCode: string
    ) : boolean
{
    let availableLanguages = getLanguageCodeArray();

    return availableLanguages.includes( languageCode );
}

// ~~

export function getRequestBrowserLanguageCode(
    request: any
    ) : string
{
    let acceptLanguage;

    if ( request && request.headers )
    {
        acceptLanguage = request.headers.get( "Accept-Language" );
    }
    else
    {
        return getDefaultLanguageCode();
    }

    if ( acceptLanguage )
    {
        return getBrowserLanguageCode(
            acceptLanguage,
            getLanguageCodeArray(),
            getDefaultLanguageCode()
            );
    }
    else
    {
        return getDefaultLanguageCode();
    }
}

// ~~

export function getPathLanguageCode(
    pathname: string
    ) : string | null
{
    let pathPartArray = pathname.replace( /^\//, "" ).split( "/" );

    if ( pathPartArray.length > 0 && pathPartArray[ 0 ] !== "" )
    {
        let languageCode = pathPartArray[ 0 ];

        if ( isValidLanguageCode( languageCode ) )
        {
            return languageCode;
        }
    }

    return null;
}

// ~~

export function getPathWithoutLanguage(
    path: string
    ) : string
{
    let languageCode = getPathLanguageCode( path );

    if ( languageCode )
    {
        return "/" + path.replace( /^\//, "" ).split( "/" ).slice( 1 ).join( "/" );
    }
    else
    {
        return path;
    }
}

// ~~

export function getRequestLanguageCode(
    request: any
    ) : string
{
    let url = getRequestUrl( request );

    if ( !url )
    {
        return getDefaultLanguageCode();
    }

    let path = new URL( url ).pathname;
    let languageCode = getPathLanguageCode( path );

    if ( languageCode )
    {
        return languageCode;
    }
    else
    {
        return getRequestBrowserLanguageCode( request );
    }
}

// ~~

export function setRequestLanguageCode(
    request: any,
    languageCode: string | null = null
    ) : string
{
    let resolvedLanguageCode = languageCode || getRequestLanguageCode( request );

    setLanguageCode( resolvedLanguageCode );

    return resolvedLanguageCode;
}

// ~~

export function getLanguageCodePath(
    path: string,
    languageCode: string
    ) : string
{
    if ( !isValidLanguageCode( languageCode ) )
    {
        return path;
    }
    else
    {
        let pathWithoutLanguage = getPathWithoutLanguage( path );

        if ( !pathWithoutLanguage.startsWith( "/" ) )
        {
            pathWithoutLanguage = "/" + pathWithoutLanguage;
        }

        if ( pathWithoutLanguage === "/" )
        {
            return `/${ languageCode }`;
        }
        else
        {
            return `/${ languageCode }${ pathWithoutLanguage }`;
        }
    }
}

// -- STATEMENTS

setLanguageSeparator( "\n¨" );
setDefaultLanguageCode( "en" );

defineLineTag( "! ", "<div class=\"paragraph title-1\">", "</div>" );
defineLineTag( "!! ", "<div class=\"paragraph title-2\">", "</div>" );
defineLineTag( "!!! ", "<div class=\"paragraph title-3\">", "</div>" );
defineLineTag( "!!!! ", "<div class=\"paragraph title-4\">", "</div>" );
defineLineTag( "- ", "<div class=\"paragraph dash-bullet-1\">", "</div>" );
defineLineTag( "  - ", "<div class=\"paragraph dash-bullet-2\">", "</div>" );
defineLineTag( "    - ", "<div class=\"paragraph dash-bullet-3\">", "</div>" );
defineLineTag( "      - ", "<div class=\"paragraph dash-bullet-4\">", "</div>" );
defineLineTag( "* ", "<div class=\"paragraph round-bullet-1\">", "</div>" );
defineLineTag( "  * ", "<div class=\"paragraph round-bullet-2\">", "</div>" );
defineLineTag( "    * ", "<div class=\"paragraph round-bullet-3\">", "</div>" );
defineLineTag( "      * ", "<div class=\"paragraph round-bullet-4\">", "</div>" );
defineLineTag( "° ", "<div class=\"paragraph hollow-bullet-1\">", "</div>" );
defineLineTag( "  ° ", "<div class=\"paragraph hollow-bullet-2\">", "</div>" );
defineLineTag( "    ° ", "<div class=\"paragraph hollow-bullet-3\">", "</div>" );
defineLineTag( "      ° ", "<div class=\"paragraph hollow-bullet-4\">", "</div>" );
defineLineTag( "", "<div class=\"paragraph\">", "</div>" );

defineDualTag( "**", "<b>", "</b>" );
defineDualTag( "%%", "<i>", "</i>" );
defineDualTag( "__", "<u>", "</u>" );
defineDualTag( ",,", "<sub>", "</sub>" );
defineDualTag( "^^", "<sup>", "</sup>" );

defineTag( "~", "&nbsp;" );
defineTag( "¦", "<wbr/>" );
defineTag( "§", "<br/>" );
defineTag( "¶", "<br class=\"linebreak\"/>" );
defineTag( "®", "<sup>®</sup>" );
defineTag( "™", "<sup>™</sup>" );
