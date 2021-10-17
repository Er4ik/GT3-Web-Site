export const pages = {
    main: '/',
    signPage: '/sign-page',
    buyTicket: '/buy-ticket',
    auth: '/authorization'
}

export const valuesPages = {
    index: ["index", "main-page"],
    sign: "sign-Page",
    butTick: "buy-ticket",
}

export const port = {
    PORT: 3000,
}

export const pathToDirFile = {
    staticFiles: '../../resourses',
} 

export const dataRx = {
    Namerx: /\w \w/,
    Emailrx: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/,
    Passwordrx: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g,
}