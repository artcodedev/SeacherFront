
/*
*** Models 
*/
import { Move, OffsetData, Search, Selected, Sorted, TokenData } from '@/app/Models/Models';

/*
*** Utils
*/
import { Fetch } from '@/app/Utils/Fetch';

/*
*** Main 
*/
import { Elysia, t } from 'elysia'

const app = new Elysia({ prefix: '/api/v1' })
    /*
     *** Get new token and data 
    */
    .post("/get_token_data", async (): Promise<Fetch> => {

        return await Fetch.request(`${process.env.API_SERVER}/api/v1/get_token_data`, {});

    })

    /*
     *** Get data withouy new token 
    */
    .post("/get_data", async ({ body }: { body: TokenData }): Promise<Fetch> => {

        return await Fetch.request(`${process.env.API_SERVER}/api/v1/get_data`, { token: body.token });

    })

    /*
     *** Set sorted
    */
    .post("/set_sorted", async ({ body }: { body: Sorted }): Promise<Fetch> => {

        return await Fetch.request(`${process.env.API_SERVER}/api/v1/set_sorted`, { token: body.token, sorted: body.sorted });

    })

    /*
     *** Set move position 
    */
    .post("/set_move", async ({ body }: { body: Move }): Promise<Fetch> => {

        return await Fetch.request(`${process.env.API_SERVER}/api/v1/set_move`, {token: body.token, draggingRow: body.draggingRow, hoveredRow: body.hoveredRow});

    })

    /*
     *** Search in data use query 
    */
    .post("/get_search", async ({ body }: { body: Search  }): Promise<Fetch> => {

        return await Fetch.request(`${process.env.API_SERVER}/api/v1/get_search`, {token: body.token,  query: body.query});

    })

    /*
     *** Set selected elems
    */
    .post("/get_selected", async ({ body }: { body: Selected }): Promise<Fetch> => {

        return await Fetch.request(`${process.env.API_SERVER}/api/v1/get_selected`, {token: body.token,  selected: body.selected});

    })

    /*
     *** Get more elems when scroll
    */
    .post("/get_offset_data", async ({ body }: { body: OffsetData }): Promise<Fetch> => {

        return await Fetch.request(`${process.env.API_SERVER}/api/v1/get_offset_data`, {token: body.token,  offset: body.offset});

    })

export const GET = app.handle
export const POST = app.handle 
