/* eslint-disable react/prop-types */
import { useState } from "react"
import ProfileContentNav from "./ProfileContentNav/ProfileContentNav"
import DOMPurify from 'dompurify';
import ArticleCard from "../../../components/ArticleCard/ArticleCard";

const UserContent = ({ currentUser, currentUserProfile }) => {
  const [focus, setFocus] = useState('articles');
  const handleFocus = (content) => {
    setFocus(content);
  };
  return (
    <section className="flex flex-col">
      <div className="hidden lg:flex lg:py-4">
        <h1 className="text-5xl font-semibold">{currentUserProfile?.fullname}</h1>
      </div>
      <ProfileContentNav focus={focus} handleFocus={handleFocus}/>
      {focus === 'articles' ?
        <div className="flex flex-col py-6 gap-8 md:gap-10">
          {currentUserProfile?.articles?.map((article) => (
            <ArticleCard key={article?._id} articleDetails={article} currentUser={currentUser}/>
          ))}
        </div>
        :
        focus === 'archives' ?
          <div className="flex flex-col py-6 gap-8 md:gap-10">
            {currentUserProfile?.archives?.map((article) => (
              <ArticleCard key={article?._id} articleDetails={article} currentUser={currentUser}/>
            ))}
          </div>
          :
          <div className='flex flex-col pt-4 gap-2 md:text-lg' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(currentUserProfile?.about)}}></div>
      }
    </section>
  )
}

export default UserContent