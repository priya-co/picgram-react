import React, { useEffect, useState } from 'react';
import './style.css';

export default function Navbar(props) {
  const [searchdata, setSearchdata] = useState('');

  const handleOnChnageSearch = (e) => {
    setSearchdata(e.target.value);
  };

  const handleSearchResultOnCatagory = (e) => {
    if (e.key === 'Enter') {
      const picsresult = { ...props.origionalData };

      let searchedPicsResult = picsresult?.pics?.filter((pic) =>
        pic.category.toLowerCase().includes(searchdata.toLowerCase())
      );

      props.setdata({ ...props.data, pics: searchedPicsResult });
    }
    if (searchdata === '') {
      props.setdata({ ...props.origionalData });
    }
  };

  const shortCardwithLikes = () => {
    const picsdata = { ...props.origionalData };
    const sorted = picsdata.pics.sort((a, b) => {
      return b.likes - a.likes;
    });
    props.setdata({ ...props.data, pics: sorted });
  };

  const shortCardwithComments = () => {
    const picsdata = { ...props.origionalData };
    const commentSorted = picsdata.pics.sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
    props.setdata({ ...props.data, pics: commentSorted });
  };
  return (
    <div>
      <div className='top-title'>Imaginary</div>

      <div className='nav-bar'>
        <div className='left-nav'>
          <a onClick={shortCardwithLikes} className='most-Liked'>
            Most Liked
          </a>
          <span className='horzontal-line'></span>
          <a onClick={shortCardwithComments} className='most-commented'>
            Most Commented
          </a>
        </div>
        <div className='center-space'></div>
        <div className='right-nav'>
          <input
            onChange={handleOnChnageSearch}
            className='search-box'
            placeholder='search images..'
            type='text'
            value={searchdata}
            onKeyUp={handleSearchResultOnCatagory}
          />
        </div>
      </div>
    </div>
  );
}
