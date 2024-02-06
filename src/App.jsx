import { Routes, Route, Navigate } from 'react-router-dom'
import { selectOwnProfile } from './redux/ownProfileSlice'
import { useSelector } from 'react-redux'
import Layout from './Layout'
import MainPage from './pages/MainPage/MainPage'
import HomePage from './pages/HomePage/HomePage'
import WritePage from './pages/WritePage/WritePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import ArticlePage from './pages/ArticlePage/ArticlePage'
import EditPage from './pages/EditPage/EditPage'
import EditProfilePage from './pages/EditProfilePage/EditProfilePage'

function App() {
  const currentUser = useSelector(selectOwnProfile);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={currentUser ? <Navigate to={"/home"}/> : <MainPage/>} />
        <Route path='/:username' element={<ProfilePage/>} />
        <Route path='/:username/edit' element={<EditProfilePage/>} />
        <Route path='/articles/:id' element={<ArticlePage/>} />
        <Route path='/home' element={currentUser ? <HomePage/> : <Navigate to={"/"}/>}>
          <Route path='write' element={<WritePage/>}/>
          <Route path='edit/:id' element={<EditPage/>}/>
        </Route>
      </Routes>
    </Layout>
  )
}

export default App
