import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 9,
    category: 'general',
  }

  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey : PropTypes.string,
  }

  capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    //console.log(this.articles.length)
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `NewsKing - ${this.props.category === 'general' ? 'Home' : this.capitalizeFirstLetter(this.props.category)}`
  }

  async updateNews(pageNo) {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&category=${this.props.category}&page=${pageNo}&pageSize=${this.props.pageSize}`;
    //let url = `https://newsapi.org/v2/everything?q=india&pageSize=${this.props.pageSize}&apiKey=89bf461ea3da47bc82667e8c99661faf`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
      page: pageNo
    });
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //let url = `https://newsapi.org/v2/everything?q=india&pageSize=${this.props.pageSize}&apiKey=89bf461ea3da47bc82667e8c99661faf`;
    let data = await fetch(url);
    let parseData = await data.json();
    //console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    });
  }



  handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=89bf461ea3da47bc82667e8c99661faf&category=${this.props.category}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // //let url = `https://newsapi.org/v2/everything?q=india&pageSize=${this.props.pageSize}&apiKey=89bf461ea3da47bc82667e8c99661faf&page=${this.state.page - 1}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parseData = await data.json();
    // //console.log(parseData);

    // this.setState({
    //   page : this.state.page-1,
    //   articles : parseData.articles,
    //   loading: true
    // })
    this.updateNews(this.state.page - 1);
  }
  handleNextClick = async () => {
    // if(this.state.page + 1<=Math.ceil(this.state.totalResults/this.props.pageSize)){
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=89bf461ea3da47bc82667e8c99661faf&category=${this.props.category}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   //let url = `https://newsapi.org/v2/everything?q=in&pageSize=${this.props.pageSize}&apiKey=89bf461ea3da47bc82667e8c99661faf&page=${this.state.page + 1}`;
    //   this.setState({loading: true})
    //   let data = await fetch(url);
    //   let parseData = await data.json();
    //   //console.log(parseData);

    //   this.setState({
    //     page : this.state.page+1,
    //     articles : parseData.articles,
    //     loading: false
    //   })
    // }
    this.updateNews(this.state.page + 1);
  }

  fetchMoreData = async () => {
    this.setState({  });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&category=${this.props.category}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //let url = `https://newsapi.org/v2/everything?q=india&pageSize=${this.props.pageSize}&apiKey=89bf461ea3da47bc82667e8c99661faf`;
    let data = await fetch(url);
    let parseData = await data.json();
    //console.log(parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false,
      page: this.state.page + 1
    });
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='h1 text-center' style={{marginTop:'80px'}}>NewsKing - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
        <hr />
        {this.state.loading && <Spinner/>}
        <InfiniteScroll style={{height: '0', overflow: '0'}}
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader= {<Spinner />}
        >
            <div className='row'>
              {this.state.articles.map((element) => {
                return <div className='col-md-4 mt-2'  key={`${element.url}-${element.publishedAt}`}>
                  <NewsItem heading={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} time={element.publishedAt} author={element.author} source={element.source} />
                </div>
              })}
            </div>
          
        </InfiniteScroll>
        {/* <hr />
        <div className='container d-flex justify-content-around mt-3'>
          <button type="button" disabled={this.state.page <= 1} className='btn btn-primary btn-lg mx-2' onClick={this.handlePrevClick}>&larr; Prev</button>
          <button type="button" disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn btn-primary btn-lg mx-2' onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }
}

export default News