import type { Context } from "./util/context.js";

export interface BaseComponent {
    build(ctx: Context): string
}


export interface AsyncBaseComponent {
    build(ctx: Context): Promise<string>
}