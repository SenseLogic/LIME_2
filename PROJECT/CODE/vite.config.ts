// -- IMPORTS

import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";

// -- STATEMENTS

export default defineConfig(
    {
        plugins: [ fresh() ]
    }
    );
