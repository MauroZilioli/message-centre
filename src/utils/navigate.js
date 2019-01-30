import history from './../singletons/history';

export const replace = (path) => {
    history.replace(path);
};

export default (path) => {
    history.push(path);
};
