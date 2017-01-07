import { browserHistory } from 'react-router';

const history = [];

export const go = (path) => {
  history.push(path);
};

export const madeReview = (slug) => {
  if (history.length) {
    browserHistory.goBack();
  } else {
    browserHistory.replace(`/profesor/${slug}`);
  }
};

export const goBack = () => {
  if (history.length) {
    browserHistory.goBack();
    history.pop();
  } else {
    browserHistory.push('/');
  }
};
