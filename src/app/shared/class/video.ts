export class Video {
    constructor(public user_id: number, public media_type_id: number, public condition_id: number, public title: string,
                public year: string, public genres: string, public country_code: Array<{code: string}>,
                public directors: string, public actors: string, public format: string, public languages: string,
                public subtitles: string, public region: string, public aspect_ratio: string, public fsk: string,
                public studio: string, public release_date: string, public theatrical_release_date: string,
                public run_time: string, public ean: string, public upc: string, public isbn: string,
                public asin: string, public note: string, public private_note: string, public for_change: boolean
    ) {}
}

