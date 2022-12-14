import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

export const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean
) => {
    // GraphQL query
    const query = gql`
    query MyQuery(
        $access_key: String!
        $categories: String!
        $keywords: String
    ) {
        myQuery(
            access_key: $access_key
            categories: $categories
            sort: "published_desc"
            keywords: $keywords
        ) {
            data {
                author
                category
                image
                description
                country
                language
                published_at
                source
                title
                url
            }
            pagination {
                count
                limit
                offset
                total
            }
        }
    }`

    // Fetch function with Next.js-13 caching...
    const res = await fetch('https://krychaw.stepzen.net/api/romping-tiger/__graphql', {
        method: 'POST',
        cache: isDynamic ? 'no-cache' : 'default',
        next: isDynamic ? { revalidate: 0 } : { revalidate: 100 },
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`
        },
        body: JSON.stringify({
            query,
            variables: {
                access_key: process.env.MEDIASTACK_API_KEY,
                categories: category,
                keywords: keywords,
            }
        })
    });
    // console.log(res.data.myQuery);
    
    const newsResponse = await res.json();
    
    console.log(`New Data from API for ${category} => ${keywords}`)
    
    // Sort function by images present vs not present
    const news = sortNewsByImage(newsResponse.data.myQuery);

    // return res
    return news; 
};