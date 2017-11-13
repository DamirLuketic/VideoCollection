export class Video {
    constructor(public user_id: number = null, public media_type_id: number = null, public condition_id: number = null,
                public title: string = null, public year: string = null, public genres: string = null,
                public country_code: Array<{code: string}> = null, public directors: string = null,
                public actors: string = null, public format: string = null, public languages: string = null,
                public subtitles: string = null, public region: string = null, public aspect_ratio: string = null,
                public fsk: string = null, public studio: string = null, public release_date: string = null,
                public theatrical_release_date: string = null, public run_time: string = null,
                public ean: string = null, public upc: string = null, public isbn: string = null,
                public asin: string = null, public note: string = null, public private_note: string = null,
                public for_change: boolean = null, public media_languages: string = null, public id: number = null
    ) {}
}

