/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import ArticleSec from './ArticleSec/ArticleSec';
import ResponseSec from './ResponseSec/ResponseSec';

const ArticlePage = () => {
  const [showResponseSec, setShowResponseSec] = useState(false);
  const handleShowResponseSec = () => setShowResponseSec((prev) => !prev);

  return (
    <div>
      <ArticleSec handleShowResponseSec={handleShowResponseSec}/>
      {showResponseSec && <ResponseSec handleShowResponseSec={handleShowResponseSec}/>}
    </div>
  )
}

export default ArticlePage