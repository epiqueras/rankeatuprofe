import { browserHistory } from 'react-router';

const history = [];

export const go = (path) => {
  history.push(path);
};

export const goBack = () => {
  if (history.length) {
    history.pop();
    browserHistory.goBack();
  } else {
    browserHistory.push('/');
  }
};

export const goBackReview = () => {
  const slug = browserHistory.getCurrentLocation().pathname.split('/')[2];
  if (history.length) {
    history.pop();
    browserHistory.goBack();
  } else {
    browserHistory.replace(`/profesor/${slug}`);
    browserHistory.push(`/profesor/${slug}/review`);
    browserHistory.goBack();
  }
};
