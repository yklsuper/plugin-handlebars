build:
	@rm -fr dist
	@mkdir dist
	@uglifyjs src/plugin-handlebars.js -o dist/plugin-handlebars.js

test:
	@mocha-browser tests/runner.html -S

coverage:
	@rm -fr src-cov
	@jscoverage src src-cov
	@mocha-browser tests/runner.html?cov -S -R html-cov > coverage.html
