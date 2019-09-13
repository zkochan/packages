declare function pShare<T> (p: Promise<T>): () => Promise<T>

export = pShare
