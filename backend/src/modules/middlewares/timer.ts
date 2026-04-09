import type { Context, Next } from "hono";

async function timerMiddleware(c:Context, next:Next){
    const start = Date.now();
    console.log("record Start time");
    await next();
    console.log("Controller finished");
    const time = Date.now() - start; 
    console.log(c.req.path + ' Takes ' + time + 'ms');
  }

export {timerMiddleware};