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

export const main = async ()=>{
  const chunkData = await chunkContent(movies)
    const output= await createEmbeddingsForContent(chunkData);
    await addEmbeddingsToDatabase(output)

}

const chunkContent = async (movieList: Movie[])=> {
    if (!movieList.length) {
        throw new Error("No content submitted for creating embeddings")
    }

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 115,
        chunkOverlap: 8,
    });

   const output = movieList.map((movie) => movie.content.concat(" ", movie.releaseYear))
    return await splitter.createDocuments(output)

}

export const createEmbeddingsForContent = async (documentsList: Document[]) => {
    try {
        return Promise.all(documentsList.map(async (document) => {
            console.log(document)
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


