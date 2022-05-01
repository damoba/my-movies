export interface Movie {
  index: number;
  collected: boolean;
  certification?: string | null;
  videoId?: string | null;
  year?: number | null;
  title?: string | null;
  original_title?: string | null;
  name?: string | null;
  original_name?: string | null;
  genres?:
    | {
        id?: number | null;
        name?: string | null;
      }[]
    | null;
  overview?: string | null;
  vote_average?: number | null;
  vote_count?: number | null;
  backdrop_path?: string | null;
  poster_path?: string | null;
}

export interface MovieFull {
  adult?: boolean;
  backdrop_path?: string | null;
  belongs_to_collection?: null | object;
  budget?: number;
  genres?: {
    id?: number;
    name?: string;
  }[];
  homepage?: string | null;
  id?: number;
  imbd_id?: string | null;
  original_language?: string;
  overview?: string | null;
  popularity?: number;
  poster_path?: string | null;
  production_companies?: {
    name?: string;
    id?: number;
    logo_path?: string | null;
    origin_country?: string;
  }[];
  production_countries?: {
    iso_3166_1?: string;
    name?: string;
  }[];
  release_date?: string;
  revenue?: number;
  runtime?: number | null;
  spoken_languages?: {
    iso_639_1?: string;
    name?: string;
  }[];
  status?: string;
  tagline?: string | null;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  genre_ids?: Array<number>;
  videos?: {
    id?: number;
    results?: {
      iso_639_1?: string;
      iso_3166_1?: string;
      name?: string;
      key?: string;
      site?: string;
      size?: number;
      type?: string;
      official?: boolean;
      published_at?: string;
      id?: string;
    }[];
  };
  release_dates?: {
    id?: number;
    results?: {
      iso_3166_1?: string;
      release_dates?: {
        certification?: string;
        iso_639_1?: string;
        release_date?: string;
        type?: number;
        note?: string;
      }[];
    }[];
  };
  title?: string;
  name?: string;
  original_name?: string;
  original_title?: string;
}

export interface MovieFullIndexed extends MovieFull {
  index: number;
}
