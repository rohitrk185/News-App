import React from 'react'
import { categories } from '../constants'
import { fetchNews } from '../lib/fetchNews';


async function page() {
	// fetch the news data
	// console.log(categories.join(','));
	const news: NewsResponse = await fetchNews(categories.join(','));
	console.log(news);

	return (
		<div>
			{/* NewsList news */}
		</div>
	)
}

export default page