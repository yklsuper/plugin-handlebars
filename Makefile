build:
	@rm -fr dist
	@mkdir dist
	@uglifyjs src/plugin-handlebars.js -o dist/plugin-handlebars.js
