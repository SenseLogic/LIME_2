// -- IMPORTS

import "@std/dotenv/load";

import { App, staticFiles } from "fresh";
import { getApplicationData } from "./application.ts";

// -- STATEMENTS

let applicationData = getApplicationData();

if ( !applicationData )
{
    throw new Error( "Application data not loaded before server start" );
}

export const app = new App()
    .use( staticFiles() )
    .fsRoutes();
