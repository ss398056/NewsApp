import React, { Component } from 'react'

export class NewsItem extends Component {

  getTimeDifference(date1, date2) {
    // Convert input dates to Date objects if not already
    const start = new Date(date1);
    const end = new Date(date2);
  
    // Calculate the difference in milliseconds
    const diffInMs = Math.abs(end - start);
  
    // Convert milliseconds to time units
    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if(minutes<60){
      return minutes+' min'
   }else if(hours<24){
      return hours+' hours'
   }else{
      return days+' days'
   }
    //return { minutes, hours, days };
  }
  

  render() {
    let {heading, description,imageUrl, newsUrl, time, author, source} = this.props;
    
    return (
      <>
      <div className="card" key={source.name}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'}} ></span>
        <img src={!imageUrl?"https://image.cnbcfm.com/api/v1/image/108063268-17…8-US_RETAIL_SALES.jpeg?v=1731606023&w=1920&h=1080":imageUrl} className="card-img-top" alt="..." />

        <div className="card-body">
          <h5 className="card-title">{heading}</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text m-0"><small className="text-muted">By {author}</small></p>
          <p className="card-text"><small className="text-muted">Last updated {this.getTimeDifference(new Date(), time)} ago</small></p>
          <a href={newsUrl} className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
      </>
    )
  }
}

export default NewsItem
