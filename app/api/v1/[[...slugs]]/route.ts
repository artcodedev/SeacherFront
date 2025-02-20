

import { Selected, TokenData } from '@/app/Models/Models';
import { Fetch } from '@/app/Utils/Fetch';
import { Elysia, t } from 'elysia'

interface Sorted {
    token: string
    sorted: number
}

interface Move {
    token: string
    draggingRow: number
    hoveredRow: number
}

interface Search {
    token: string
    query: string
}

interface OffsetData {
    token: string
    offset: number 
}


const app = new Elysia({ prefix: '/api/v1' })

    .post("/get_token_data", async (): Promise<Fetch> => {

        return await Fetch.request(`${process.env.API_SERVER}/api/v1/get_token_data`, {});

    })


    .post("/get_data", async ({ body }: { body: TokenData }): Promise<Fetch> => {

        return await Fetch.request(`${process.env.API_SERVER}/api/v1/get_data`, { token: body.token });

    })

    .post("/set_sorted", async ({ body }: { body: Sorted }): Promise<Fetch> => {


        return await Fetch.request(`${process.env.API_SERVER}/api/v1/set_sorted`, { token: body.token, sorted: body.sorted });

    })

    .post("/set_move", async ({ body }: { body: Move }): Promise<Fetch> => {

        return await Fetch.request(`${process.env.API_SERVER}/api/v1/set_move`, {token: body.token, draggingRow: body.draggingRow, hoveredRow: body.hoveredRow});

    })

    .post("/get_search", async ({ body }: { body: Search  }): Promise<Fetch> => {

        return await Fetch.request(`${process.env.API_SERVER}/api/v1/get_search`, {token: body.token,  query: body.query});

    })

    .post("/get_selected", async ({ body }: { body: Selected }): Promise<Fetch> => {

        return await Fetch.request(`${process.env.API_SERVER}/api/v1/get_selected`, {token: body.token,  selected: body.selected});

    })

    .post("/get_offset_data", async ({ body }: { body: OffsetData }): Promise<Fetch> => {

        return await Fetch.request(`${process.env.API_SERVER}/api/v1/get_offset_data`, {token: body.token,  offset: body.offset});

    })

export const GET = app.handle
export const POST = app.handle 
