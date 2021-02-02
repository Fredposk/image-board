module.exports = {
    purge: ['./public/**/*.html', './public/**/*.js'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [require('@jinsung.lim/tailwindcss-filters')],
};
