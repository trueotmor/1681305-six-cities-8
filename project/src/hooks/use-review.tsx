import {useState} from 'react';
import { CommentPost } from '../types/comment-post';

type ResultReview = [CommentPost, (value: string) => void, (value: string) => void, () => void];

export const useReview = (): ResultReview => {
  const [review, setReview] = useState({ rating: 0, comment: '' });

  const handleStarsChange = (value: string) => {
    setReview({...review, rating: parseInt(value, 10)});
  };

  const handleCommentChange = (value: string) => {
    setReview({...review, comment: value});
  };

  const handleResetForm = () => {
    setReview({ rating: 0, comment: '' });
  };

  return [review, handleStarsChange, handleCommentChange, handleResetForm];
};
