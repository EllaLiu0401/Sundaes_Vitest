import { setupServer } from "msw/node";
import { handlerTopping, handlers } from "./handlers";

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);