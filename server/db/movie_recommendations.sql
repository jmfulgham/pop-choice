create table movie_recommendations (
  id bigserial primary key,
  content text, -- corresponds to the "text chunk"
  embedding vector(1536) -- 1536 works for OpenAI embeddings
);


-- Create a function to search for movies
create or replace function match_movie_recommendations (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float
)
language sql stable
as $$
  select
    movie_recommendations.id,
    movie_recommendations.content,
    1 - (movie_recommendations.embedding <=> query_embedding) as similarity
  from movie_recommendations
  where 1 - (movie_recommendations.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;
