import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResult, setTotalResult] = useState(0);    

    // Now fetching data form API using compountDidMount
    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=55e9950b05cd47b49f5ee55a575b4d84&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(50);
        let parseData = await data.json();
        // console.log(parseData);
        setArticles(parseData.articles);
        setTotalResult(parseData.totalResult);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title=`${props.category}-Newsapp`;
        updateNews();
    }, [])

    // const handelPrev = async () => {
    //     setPage(page - 1);
    //     updateNews();
    // }

    // const handelNext = async () => {
    //     setPage(page + 1);
    //     updateNews();
    // }

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=55e9950b05cd47b49f5ee55a575b4d84&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parseData = await data.json();
        setArticles(articles.concat(parseData.articles));
        setTotalResult(parseData.totalResult);
    }

    return (
        <div>
            <div className="container my-3">
                <h1 className="text-center" style={{ margin: "35px 0px", marginTop:"90px" }}>{document.title = `Newsapp Top Headlines-${props.category}`}</h1>
                {/* When loading will true it shows sppinner */}
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResult}
                    loader={<Spinner/>}
                >
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
                </InfiniteScroll>
                {/* Buttons if needed */}
                {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled={page <= 1} className="btn btn-secondary" onClick={handelPrev}>&larr; Prev</button>

                    <button type="button" disabled={page + 1 > Math.ceil(totalResult / props.pageSize)} className="btn btn-secondary" onClick={handelNext}>Next &rarr;</button>
                </div> */}
            </div>

        </div>
    )

}
//Proptypes and default proptypes placed in last in functional cmponents
News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
