import { rest } from 'msw'

export const handlers = [
    rest.post('/registration', async (req, res, ctx) => {

        const requestBody = await req.clone().json();

        if(requestBody.email === 'varga.zsolt.gergo@gmail.com') {
            return res(
                ctx.status(422),
                ctx.json({
                    message: 'Email has been already taken ',
                }),
            )
        }
        return res(
            ctx.status(200),
            ctx.json({
                message: 'Registration was successful',
            }),
        )
    }),
]