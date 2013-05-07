build:
	@rm -fr dist
	@mkdir dist
	@uglifyjs src/plugin-handlebars.js -o dist/plugin-handlebars.js

test:
	@mocha-browser tests/runner.html -S
