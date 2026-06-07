// -- IMPORTS

import { Head } from "fresh/runtime";
import { HttpError } from "fresh";
import { define } from "../utils.ts";

// -- FUNCTIONS

export default define.page(
    function ErrorPage(
        props
        )
    {
        let error = props.error;

        if ( error instanceof HttpError
             && error.status === 404 )
        {
            return (
                <>
                    <Head>
                        <title>404 - Page not found</title>
                    </Head>
                    <div className="px-4 py-8 mx-auto bg-[#86efac]">
                        <div className="max-w-screen-md mx-auto flex flex-col items-center justify-center">
                            <img
                                className="my-6"
                                src="/logo.svg"
                                width="128"
                                height="128"
                                alt="the Fresh logo: a sliced lemon dripping with juice"
                            />
                            <h1 className="text-4xl font-bold">404 - Page not found</h1>
                            <p className="my-4">
                                The page you were looking for doesn't exist.
                            </p>
                            <a href="/" className="underline">Go back home</a>
                        </div>
                    </div>
                </>
                );
        }
        else
        {
            return (
                <>
                    <Head>
                        <title>Error</title>
                    </Head>
                    <div className="px-4 py-8 mx-auto bg-[#86efac]">
                        <div className="max-w-screen-md mx-auto flex flex-col items-center justify-center">
                            <img
                                className="my-6"
                                src="/logo.svg"
                                width="128"
                                height="128"
                                alt="the Fresh logo: a sliced lemon dripping with juice"
                            />
                            <h1 className="text-4xl font-bold">Something went wrong</h1>
                            <p className="my-4">
                                An unexpected error occurred.
                            </p>
                            <a href="/" className="underline">Go back home</a>
                        </div>
                    </div>
                </>
                );
        }
    }
    );
