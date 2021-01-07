import React, { useState, useEffect } from 'react';
import ExtendedImage from './ExtendedImage';
import './style.css';

export default function Card(props) {
  const [userInput, setUserInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  const handleClickPostButton = (index) => {
    const newComment = userInput;
    const dataCopy = { ...props.data };
    dataCopy.pics[index].comments.push(newComment);

    props.setdata(dataCopy);
  };

  const handleClickDeleteCommentBtn = (parentIndex, cmtIndex) => {
    const dataCopy = { ...props.data };
    // dataCopy.pics[parentIndex].comments[cmtIndex].pop();
    dataCopy.pics[parentIndex].comments.splice(cmtIndex, 1);

    props.setdata(dataCopy);
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleLikebtn = (index) => {
    const currentPics = [...props.data.pics];

    if (currentPics[index].isLiked) {
      currentPics[index].likes--;
    } else {
      currentPics[index].likes++;
    }
    currentPics[index].isLiked = !currentPics[index].isLiked;
    props.setdata({ ...props.data, pics: currentPics });
  };

  const openImage = (url) => {
    setCurrentUrl(url);
    setShowModal(true);
  };

  return (
    <div className='card-main-container'>
      {props.data?.pics?.map((pic, index) => {
        return (
          <div className='card-container'>
            <img className='card-img' onClick={() => openImage(pic.url)} src={pic.url} alt='' />
            <div className='like-unlike-bar'>
              <span>{pic.likes}</span>

              {pic.isLiked ? (
                <span className='like-link' onClick={() => handleLikebtn(index)}>
                  Unlike
                </span>
              ) : (
                <span className='like-link' onClick={() => handleLikebtn(index)}>
                  Like
                </span>
              )}

              <span style={{ float: 'right' }}>{pic.category}</span>
            </div>
            <div className='post-comments'>
              <input
                className='input-comment'
                type='text'
                placeholder='Type your comment here..'
                onChange={handleChange}
              />
              <button onClick={() => handleClickPostButton(index)} className='btn-post'>
                POST
              </button>
            </div>
            <div>
              {pic.comments?.map((comment, cmtIndex) => {
                return (
                  <div className='individual-comment'>
                    <span>{comment}</span>
                    <span
                      onClick={() => handleClickDeleteCommentBtn(index, cmtIndex)}
                      className='del-btn'
                    >
                      x
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {showModal ? <ExtendedImage url={currentUrl} setShowModal={setShowModal} /> : null}
    </div>
  );
}
