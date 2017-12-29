import { Injectable } from '@angular/core';

@Injectable()
export class RootService {

    // Route for local api
    // apiRoute: string = 'http://localhost:8000/api/';

    // Route for remote api
    apiRoute: string = 'http://www.consilium-europa.com/VideoCollectionAPI/public/api/';

    constructor() { }

}
