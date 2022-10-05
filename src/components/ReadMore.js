import React, { useState } from 'react';

function ReadMore({children}) {

  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  }

  return (
    <div>
    <p className="text">
    {isReadMore ? text.slice(0, 200) : text}
    <span onClick={toggleReadMore} >
      {isReadMore ? " ...read more" : " ...show less"}
    </span>
  </p>
    </div>
  )
}

export default ReadMore;