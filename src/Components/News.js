import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Now fetching data form API using compountDidMount
    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=55e9950b05cd47b49f5ee55a575b4d84`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(50);
        let parseData = await data.json();
        // console.log(parseData);
        setArticles(parseData.articles);
        // setTotalResult(parseData.totalResult);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title=`${props.category}-Newsapp`;
        updateNews();
    }, [])

    return (
        <div>
            <div className="container my-3">
                <h3 className="text-center" style={{ margin: "35px 0px"}}>{document.title = `Top Headlines : [${props.category}]`}</h3>
                {/* When loading will true it shows sppinner */}
                {loading && <Spinner />}
                    <div className="container">
                    <div className="row my-4">
                        {/* when iterating the results from API it needs to give unique key */}
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem imageUrl={element.urlToImage} title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0, 88) : ""} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
            </div>

        </div>
    )

}
//Proptypes and default proptypes placed in last in functional components
News.defaultProps = {
    country: "in",
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
