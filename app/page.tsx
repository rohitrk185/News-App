import React from 'react'
import { categories } from '../constants'
import { fetchNews } from '../lib/fetchNews';


async function page() {
	// fetch the news data
	const news: NewsResponse = await fetchNews(categories.join(','));

	return (
		<div>
			{/* NewsList news */}
		</div>
	)
}

export default page