// -- IMPORTS

import { compileString } from "sass";

// -- CONSTANTS

const scssInputPath = "./styles/main.scss";
const cssOutputPath = "./static/styles/main.css";

// -- FUNCTIONS

async function compileSCSS(
    )
{
    try
    {
        let scssFileContent = await Deno.readTextFile( scssInputPath );

        let compilationResult = compileString(
            scssFileContent,
            {
                style: "compressed",
                loadPaths: [ "./styles" ]
            }
            );

        await Deno.writeTextFile( cssOutputPath, compilationResult.css );

        console.log(
            `✅ SCSS compiled successfully: ${ scssInputPath } → ${ cssOutputPath }`
            );
    }
    catch ( scssCompilationError )
    {
        console.error( `❌ SCSS compilation failed:`, scssCompilationError );

        Deno.exit( 1 );
    }
}

// ~~

async function watchSCSS(
    )
{
    console.log( "👀 Watching SCSS files for changes..." );

    let scssWatcher = Deno.watchFs( "./styles" );

    for await ( let scssFileEvent of scssWatcher )
    {
        if ( scssFileEvent.kind === "modify"
             || scssFileEvent.kind === "create" )
        {
            console.log(
                `📝 SCSS file changed: ${ scssFileEvent.paths[ 0 ] }`
                );

            await compileSCSS();
        }
    }
}

// -- STATEMENTS

await Deno.mkdir( "./static/styles", { recursive: true } );

if ( Deno.args.includes( "--watch" ) )
{
    await compileSCSS();
    await watchSCSS();
}
else
{
    await compileSCSS();
}
