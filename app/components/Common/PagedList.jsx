import React, { Component } from 'react';

class PagedList extends Component {

  static propTypes = {
    data: React.PropTypes.array,
    currentPage: React.PropTypes.number,
    count: React.PropTypes.number,
    listMax: React.PropTypes.number,
    renderData: React.PropTypes.func,
    pageCallback: React.PropTypes.func
  };

  renderContent(data) {
    let contentHtml = data.map(this.props.renderData);
    return (
      <ul className="podcast-list">
        {contentHtml}
      </ul>
    )
  }

  renderPages(data) {
    if (data.length == 0)
      return;
    let pagesHtml = [],
      currentPage = this.props.currentPage,
      count = this.props.count,
      pages = Math.ceil(count / this.props.listMax);
    if (currentPage > 3) {
      pagesHtml.push(<span className="page-num" onClick={this.props.pageCallback.bind(null,1)}>{1}</span>)
      if (currentPage > 4)
        pagesHtml.push(<span className="page-num page-hidden">...</span>);
    }
    if (currentPage >= 3) {
      pagesHtml.push(<span className="page-num"
                           onClick={this.props.pageCallback.bind(null,currentPage-2)}>{currentPage-2}</span>);
      pagesHtml.push(<span className="page-num"
                           onClick={this.props.pageCallback.bind(null,currentPage-1)}>{currentPage - 1}</span>);
      pagesHtml.push(<span className="page-num current"
                           onClick={this.props.pageCallback.bind(null,currentPage)}>{currentPage}</span>);
      if (currentPage + 1 < pages)
        pagesHtml.push(<span className="page-num"
                             onClick={this.props.pageCallback.bind(null,currentPage + 1)}>{currentPage + 1}</span>);
      if (currentPage + 2 < pages)
        pagesHtml.push(<span className="page-num"
                             onClick={this.props.pageCallback.bind(null,currentPage+2)}>{currentPage + 2}</span>);

    }
    else if (currentPage == 2) {
      pagesHtml.push(<span className="page-num"
                           onClick={this.props.pageCallback.bind(null,currentPage - 1)}>{currentPage - 1}</span>);
      pagesHtml.push(<span className="page-num current" onClick={this.props.pageCallback.bind(null,currentPage)}>{currentPage}</span>);
      if (currentPage + 1 < pages)
        pagesHtml.push(<span className="page-num"
                             onClick={this.props.pageCallback.bind(null,currentPage + 1)}>{currentPage + 1}</span>);
      if (currentPage + 2 < pages)
        pagesHtml.push(<span className="page-num"
                             onClick={this.props.pageCallback.bind(null,currentPage + 2)}>{currentPage + 2}</span>);
    }
    else if (currentPage == 1) {
      pagesHtml.push(<span className="page-num current" onClick={this.props.pageCallback.bind(null,currentPage)}>{currentPage}</span>);
      if (currentPage + 1 < pages)
        pagesHtml.push(<span className="page-num"
                             onClick={this.props.pageCallback.bind(null,currentPage + 1)}>{currentPage + 1}</span>);
      if (currentPage + 2 < pages)
        pagesHtml.push(<span className="page-num"
                             onClick={this.props.pageCallback.bind(null,currentPage + 2)}>{currentPage + 2}</span>);
    }
    if (currentPage < pages) {
      if (currentPage < pages - 2)
        pagesHtml.push(<span className="page-num page-hidden">...</span>);
      pagesHtml.push(<span className="page-num" onClick={this.props.pageCallback.bind(null,pages)}>{pages}</span>);
    }
    return (
      <div className="pagination">
        {pagesHtml}
      </div>
    )
  }

  render() {
    return this.props.data ? (<div>
      {this.renderContent(this.props.data)}
      <div className="clear-float do-the-split"></div>
      {this.renderPages(this.props.data)}
      </div>) : null;
  }

}

export default PagedList;
