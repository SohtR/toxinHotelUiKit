function importAll(resolve) {
    resolve.keys().forEach(resolve);
}

importAll(
    require.context('../', true, /\.(scss|js)$/)
);

