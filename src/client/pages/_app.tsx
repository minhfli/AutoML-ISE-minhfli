// _app.tsx
import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {DevSupport} from "@react-buddy/ide-toolbox-next";
import {ComponentPreviews, useInitial} from "@/dev";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <main className="scroll-smooth antialiased [font-feature-settings:'ss01']">
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <Component {...pageProps} />
            </DevSupport>
        </main>
    );
}

export default MyApp;
