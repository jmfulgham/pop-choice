import { openai, supabase } from '../config.ts';


interface Movie {
    title: string,
    releaseYear: string,
    content: string
}
export const createEmbeddings = (movieList: Movie[]) => {
    // const embeddingResp = openai.embeddings.create({
    //     model: "text-embedding-3-small",
    //     input: movieList
    // })
    // console.log(embeddingResp)
    console.log("embeddings called")
}


