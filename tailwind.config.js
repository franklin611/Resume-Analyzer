/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
		'./app.vue'
	],
	theme: {
		extend: {
			backgroundColor: {
				'custom-color': 'linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))' // Your custom color
			  }
		}
	},
	plugins: []
};
