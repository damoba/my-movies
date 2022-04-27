export interface Movie {
  intro?: string;
  certification?: string;
  videoId?: string;
  year?: number;
  title?: string;
  original_title?: string;
  name?: string;
  original_name?: string;
  genres?: {
    id?: number;
    name?: string;
  }[];
  overview?: string;
  vote_average?: number;
  vote_count?: number;
  backdrop_path?: string;
  poster_path?: string;
}
