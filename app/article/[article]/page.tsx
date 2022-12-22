import { notFound } from 'next/navigation';
import Article from '../../Article';
import LiveTimestamp from '../../LiveTimestamp';

type Props = {
    searchParams?: Article; 
}


function ArticlePage({ searchParams } : Props) {
    if( (searchParams && Object.entries(searchParams).length === 0)
        || 
        (!searchParams)) {
        return notFound();
    }

    const article : Article = searchParams;


    return (
        <article>
            <section className='flex flex-col lg:flex-row pb-24 px-0 lg:px-10'>
                {article.image && (
                    <img src={article.image} alt={article.title}
                        className='h-50 mx-auto max-w-md md:max-w-lg lg:max-w-xl object-contain rounded-lg shadow-md' />
                )}

                <div className='px-10 pt-2'>
                    <h1 className='headerTitle px-0 no-underline pb-2'>
                        {article.title}
                    </h1>

                    <div className='flex space-x-4 divide-x-2 dark:divide-white divide-slate-700'>
                        <h2 className='font-bold'>By: {(article.author == 'null') ? <i>Unknown</i> : article.author}</h2>
                        <h2 className='font-bold pl-4'>Source: {article.source}</h2>
                        <p className='pl-4'><LiveTimestamp time={article.published_at} /></p>
                    </div>

                    <p className='pt-4'> {article.description} </p>
                </div>
            </section>

        </article>
    )
}

export default ArticlePage;