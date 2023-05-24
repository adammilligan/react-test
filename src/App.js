import React, {useMemo, useState} from 'react';
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'aJavaScript 1', body: 'dDescription 1'},
    {id: 2, title: 'bJavaScript 2', body: 'cDescription 2'},
    {id: 3, title: 'cJavaScript 3', body: 'bDescription 3'},
    {id: 4, title: 'dJavaScript 4', body: 'aDescription 4'},
  ])

  const [selectedSort, setSelectedSort] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const sortedPosts = useMemo(() => {
      if (selectedSort) {
        return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
      }
      return posts;
  }, [selectedSort, posts])

  const sortedAndSearchPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery))
  }, [searchQuery, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort)
  }

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <MyInput
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value.toLowerCase())}
        placeholder="Поиск..."
      />
      <MySelect
        value={selectedSort}
        onChange={sortPosts}
        defaultValue='сортировать'
        options = {[
          { value: 'title', name: 'по названию'},
          { value: 'body', name: 'по описанию'}
        ]}
      />
      {sortedAndSearchPosts.length
        ?
        <PostList remove={removePost} posts={sortedAndSearchPosts} title="Посты про JS"/>
        :
        <h1
          style={{textAlign:"center"}}>
          Посты не найдены!
        </h1>
      }
    </div>
  );
}

export default App;
