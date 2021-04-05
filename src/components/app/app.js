import React, { Component } from "react";
import AppHeader from "../app-header";
import SeachPanel from "../search-panel";
import PostFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";
import "./app.css";
import styled from "styled-components";

const AppBlock = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          label: "Начинаю учить React.js",
          id: "1",
          important: false,
          like: true,
        },
        {
          label: "Получаться...",
          id: "2",
          important: false,
          like: false,
        },
        {
          label: "Мне нужно больше практики =)",
          id: "3",
          important: true,
          like: false,
        },
      ],
      term: "",
      filter: "all",
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onToggleLiked = this.onToggleLiked.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);

    this.maxId = 4;
  }
  onAdd(body) {
    const newItem = {
      label: body,
      important: false,
      like: false,
      id: this.maxId++,
    };
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  }
  deleteItem(id) {
    this.setState(({ data }) => {
      const index = data.findIndex(elem => elem.id === id);
      const newArr = [...data.slice(0, index), ...data.slice(index + 1)];
      return {
        data: newArr,
      };
    });
  }
  onToggleLiked(id) {
    this.setState(({ data }) => {
      const index = data.findIndex(elem => elem.id === id);

      const old = data[index];
      const newItem = {
        ...old,
        like: !old.like,
      };
      const newArr = [
        ...data.slice(0, index),
        newItem,
        ...data.slice(index + 1),
      ];
      return {
        data: newArr,
      };
    });
  }
  onToggleImportant(id) {
    this.setState(({ data }) => {
      const index = data.findIndex(elem => elem.id === id);

      const old = data[index];
      const newItem = {
        ...old,
        important: !old.important /* перезапишем important */,
      };
      const newArr = [
        ...data.slice(0, index),
        newItem,
        ...data.slice(index + 1),
      ];
      return {
        data: newArr,
      };
    });
  }
  searchPost(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter(item => {
      return item.label.indexOf(term) > -1;
    });
  }
  onUpdateSearch(term) {
    this.setState({ term });
  }
  filterPost(items, filter) {
    if (filter === "like") {
      return items.filter(item => item.like);
    } else {
      return items;
    }
  }
  onFilterSelect(filter) {
    this.setState({ filter });
  }
  render() {
    const { data, term, filter } = this.state;
    const liked = data.filter(item => item.like).length;
    const allPosts = data.length;
    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);
    return (
      <AppBlock>
        <AppHeader liked={liked} allPosts={allPosts}></AppHeader>
        <div className="seach-panel d-flex">
          <SeachPanel onUpdateSearch={this.onUpdateSearch}></SeachPanel>
          <PostFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect}></PostFilter>
        </div>
        <PostList
          posts={visiblePosts}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked}
        />
        <PostAddForm onAdd={this.onAdd}></PostAddForm>
      </AppBlock>
    );
  }
}
