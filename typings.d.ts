export interface Movie {
  certification?: string | null;
  videoId?: string | null;
  year?: number | null;
  title?: string | null;
  original_title?: string | null;
  name?: string | null;
  original_name?: string | null;
  genres?: {
    id?: number | null;
    name?: string | null;
  }[] | null;
  overview?: string | null;
  vote_average?: number | null;
  vote_count?: number | null;
  backdrop_path?: string | null;
  poster_path?: string | null;
}
