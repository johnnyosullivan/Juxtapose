import React from "react";
import axios from "axios";

const config = {
  headers: {
    // "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
};

class Juxtapose extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      quoteText: "",
      quoteAuthor: ""
    };
  }

  componentDidMount() {
    this.fetchImage();
    this.fetchQuote();
  }
  getImage = async () => {
    const url = "https://source.unsplash.com/random";

    const response = await fetch(url);
    return response;
  };

  getQuote = async () => {
    // const url =
    //   "http://api.forismatic.com/api/1.0/?method=getQuote&format=xml&lang=en";
    const url = "https://api.quotable.io/random";

    const response = await axios.get(url);
    return response;
  };
  fetchImage = async () => {
    const response = await this.getImage();

    if (response.url) {
      try {
        this.setState({
          url: response.url
        });
      } catch (error) {
        console.log("no image data yet");
      }
    }
  };

  fetchQuote = async () => {
    const response = await this.getQuote();
    if (response.data) {
      try {
        this.setState({
          quoteText: response.data.content,
          quoteAuthor: response.data.author
        });
      } catch (error) {
        console.log("no quote data yet");
      }
    }
  };

  getNextImage = () => {
    this.fetchImage();
  };

  getNextQuote = () => {
    this.fetchQuote();
  };

  tweet = () => {};

  render() {
    const { url, quoteText, quoteAuthor } = this.state;
    return (
      <div className="juxtapose-page-container">
        <h1 className="title">Juxtapose</h1>
        <button onClick={this.getNextImage}> Get next Image</button>
        <button onClick={this.fetchQuote}> Get next Quote</button>
        <a
          className="twitter-share-button"
          href={`https://twitter.com/intent/tweet?text=${quoteText}+${url}`}
        >
          Tweet
        </a>

        <h2>{quoteText}</h2>
        <h3>{quoteAuthor}</h3>
        <img src={url} alt="no image" />
      </div>
    );
  }
}

export default Juxtapose;
