export class Auth {
    constructor(public id: number, public name: string, public email: string, public is_confirmed: boolean,
                public country_code: string, public is_visible: boolean)
    {}
}
