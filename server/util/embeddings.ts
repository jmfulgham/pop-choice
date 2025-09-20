import {openai, supabase} from '../config.ts';
import {RecursiveCharacterTextSplitter} from '@langchain/textsplitters'
import type {Document} from "@langchain/core/documents";
import movies from "../content";

interface Movie {
    title: string,
    releaseYear: string,
    content: string
}

interface EmbeddingResponse {
    content: string,
    embedding: number[]
}

interface UserResponse {
    question: string;
    answer: string;
}

export const main = async ()=>{
  const chunkData = await chunkMovieContent(movies)
    const output= await createEmbeddingsForContent(chunkData);
    await addEmbeddingsToDatabase(output)
}

const chunkMovieContent = async (movieList: Movie[])=> {
    if (!movieList.length) {
        throw new Error("No content submitted for creating embeddings")
    }

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 125,
        chunkOverlap: 25,
    });

   const output = movieList.map((movie) => movie.content.concat(" ", movie.releaseYear))
    return await splitter.createDocuments(output)

}

export const createEmbeddingsForContent = (documentsList: Document[]) => {
    try {
        return Promise.all(documentsList.map(async (document) => {
            const resp = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: document.pageContent
            })
            return {
                content: document.pageContent,
                embedding: resp.data[0].embedding
            }
        }));
    } catch (e) {
        throw new Error("Unable to create embeddings.")
    }
}

const addEmbeddingsToDatabase = async (embeddings: EmbeddingResponse[]) => {
    if (!embeddings){
        throw new Error("No embeddings submitted for upload")
    }
    try {
        const {error, data} = await supabase.from('movie_recommendations').insert(embeddings);
        if (error) {
            console.log(error)
            throw new Error("Err ", error)
        }
        console.log("Embeddings added to DB!")
    } catch (e) {
        console.error(e)
    }
}

const chunkUserData = async(data: UserResponse[])=>{
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 115,
        chunkOverlap: 8,
    });
    return await splitter.createDocuments(data.map(d => d.question.concat(" answer: ", d.answer)));
}

export const handleUserAnswers = async (userAnswers: UserResponse[])=>{
    const userChunkData = await chunkUserData(userAnswers);
    const userEmbeddings = await createEmbeddingsForContent(userChunkData);
    const matches = await fetchMatches(userEmbeddings);
    return matches
}
const fetchMatches = async (embedding: EmbeddingResponse[]) => {

    const results: any = await Promise.all(embedding.map(async (embed) => {
             try {
                const {data} = await supabase.rpc('match_movie_recommendations', {
                    query_embedding: embed.embedding,
                    match_threshold: 0.20,
                    match_count: 4
                });
                // const matches = data.map((d: EmbeddingResponse) => d.content).join("\n")
                return data;
            } catch(e) {
                throw new Error("There was an error finding movie recommendations")
            }
    }))
    return results.flat()
}

const createUserResponse = async() => {

}
