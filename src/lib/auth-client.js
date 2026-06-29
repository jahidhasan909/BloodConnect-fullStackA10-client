import { createAuthClient } from "better-auth/react"
import { jwtClient } from "better-auth/client/plugins";
export const authClient = createAuthClient({
    baseURL: "https://blood-connect-full-stack-a10-client.vercel.app",
    plugins: [jwtClient()]
})