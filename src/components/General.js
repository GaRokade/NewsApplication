import React, { Component } from "react";
import NewsItem from "./NewsItem";
import { Spinner } from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class General extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    console.log("Hello I am constructor from News component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstletter(this.props.category)}`;
  }
  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=1912e0cf251a45cc8c7036c67bec1d40&page=1&pageSize=8`;

    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(60);
    console.log(parsedData);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  /*
 console.log("previo${this.props.country}");
 let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0f623d1cd6d04522bf4988f345719f0b&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
 this.setState({loading:true});
    let data=await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    
    this.setState({
      page:this.state.page-1,
      articles:parsedData.articles,
      loading:false
    })
  }*/

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  /*
  console.log("next");
  if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){
  }
  else{
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0f623d1cd6d04522bf4988f345719f0b&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
    let data=await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
   

    this.setState({
      page:this.state.page+1,
      articles:parsedData.articles,
      loading:false
    })
  }
  */

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=0f623d1cd6d04522bf4988f345719f0b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsMonkey-Top {this.capitalizeFirstletter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4">
                  <NewsItem
                    title={element.title ? element.title : ""}
                    discription={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
        {/*<div className="container d-flex justify-content-between">
          <button type="button" className="btn btn-dark" disabled={this.state.page<=1} onClick={this.handlePrevClick}>&larr;Prev</button>
          <button type="button" disabled={(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
    </div>*/}
      </div>
    );
  }
}

export default General;
