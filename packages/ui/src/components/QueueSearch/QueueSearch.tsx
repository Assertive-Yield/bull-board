import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import s from './QueueSearch.module.css';

interface ISearchProps extends RouteComponentProps {
  //   searchValue: string;
}

class SearchInner extends React.PureComponent<ISearchProps, { searchValue: string }> {
  constructor(props: ISearchProps) {
    super(props);
    const {
      location: { search },
    } = this.props;

    const query = new URLSearchParams(search);
    const searchValue = query.get('search') || '';
    this.state = { searchValue };

    this.hrefBuilder = this.hrefBuilder.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  render() {
    return (
      <input
        className={s.search}
        type="text"
        placeholder="Search"
        value={this.state.searchValue}
        onChange={(e) => {
          this.setState({ searchValue: e.target.value });
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            this.handleSearchChange({ searchValue: this.state.searchValue });
          }
        }}
      />
    );
  }

  private handleSearchChange({ searchValue }: { searchValue: string }) {
    const {
      location: { search, pathname },
      history,
    } = this.props;

    const query = new URLSearchParams(search);
    if (searchValue) {
      query.set('search', searchValue);
    } else {
      query.delete('search');
    }
    query.sort();

    history.push({ pathname, search: query.toString() });
  }

  private hrefBuilder(pageIndex: number) {
    const {
      location: { search },
    } = this.props;

    const query = new URLSearchParams(search);
    if (pageIndex > 0) {
      query.set('page', `${pageIndex}`);
      query.sort();
    }
    return query.toString();
  }
}

export const QueueSearch = withRouter(SearchInner);
