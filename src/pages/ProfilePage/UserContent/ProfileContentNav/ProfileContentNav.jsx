/* eslint-disable react/prop-types */
const ProfileContentNav = ({ focus, handleFocus }) => {
  return (
    <nav className="flex gap-6 border-b-[.5px]">
      <button
        className={`pb-4 text-sm ${focus === 'articles' && 'border-b border-green-500'}`}
        onClick={() => handleFocus('articles')}
      >Articles</button>
      <button
        className={`pb-4 text-sm ${focus === 'archives' && 'border-b border-green-500'}`}
        onClick={() => handleFocus('archives')}
      >Archives</button>
      <button
        className={`pb-4 text-sm ${focus === 'about' && 'border-b border-green-500'}`}
        onClick={() => handleFocus('about')}
      >About</button>
    </nav>
  )
}

export default ProfileContentNav