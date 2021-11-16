import { CommentGet } from '../types/comment-get';
import { getRandomInteger, getBoolean, getRandomElement, getRndArr } from '../utils/utils';
import { getRandomName, getAvatarUrl } from './offers';

const generateRandomDOB = (): Date => {
  const random = getRandomDate(new Date('2005-01-12T01:57:45.271Z'), new Date());
  return (random);
};

function getRandomDate(from: Date, to: Date) {
  const fromTime = from.getTime();
  const toTime = to.getTime();
  return new Date(fromTime + Math.random() * (toTime - fromTime));
}

const MIN_RATING = 33;
const MAX_RATING = 100;

const MIN_ID_RANGE = 1000;
const MAX_ID_RANGE = 9999;

const COMMENTS_LENGHT = 5;

const comments = new Set ([
  'The rooms were clean, very comfortable, and the staff was amazing. They went over and beyond to help make our stay enjoyable. I highly recommend this hotel for anyone visiting downtown.',
  'They were extremely accommodating and allowed us to check in early at like 10am. We got to hotel super early and I didn’t wanna wait. So this was a big plus. The sevice was exceptional as well. Would definitely send a friend there.',
  'I had a wonderful experience. Every staff member I encountered, from the valet to the check- in to the cleaning staff were delightful and eager to help! Thank you! Will recommend to my colleagues!',
  'I have stayed at dozen of hotels. This was on the top of the list of best stays/experiences ever. Staff was very hospitable and there for every need of mine. Thank you so much.',
  'Excellent property and very convenient to USC activities. Front desk staff is extremely efficient, pleasant and helpful. Property is clean and has a fantastic old time charm.',
  'Overall, I had a great experience; staff was incredibly helpful, and the amenities were great. The room was wonderful, clean, and perfect to celebrate a birthday weekend.',
]);
const getComment= () => getRandomElement(comments);

export const getComments = () : CommentGet[] => {
  const reviews : CommentGet[] = [];
  for (let actionIndex = 0; actionIndex < COMMENTS_LENGHT; actionIndex++){
    const comment : CommentGet = {
      comment : getComment(),
      date : generateRandomDOB().toISOString(),
      id : getRandomInteger(MIN_ID_RANGE, MAX_ID_RANGE),
      rating : getRandomInteger(MIN_RATING, MAX_RATING),
      user : {
        avatarUrl : getAvatarUrl(),
        id : getRandomInteger(MIN_ID_RANGE, MAX_ID_RANGE),
        isPro : getBoolean(),
        name : getRandomName(),
      },
    };
    reviews.push(comment);
  }
  const randomReviews = getRndArr(reviews, 5, 1);
  return randomReviews;
};
