SHELL=/bin/bash

DIR=$(shell basename $$(pwd))
ADDON ?= "@eeacms/volto-eea-website-theme"

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

ifeq ($(wildcard ./project),)
  NODE_MODULES = "./node_modules"
else
  NODE_MODULES = "./project/node_modules"
endif



.PHONY: stylelint
stylelint:		## Stylelint
	$(NODE_MODULES)/stylelint/bin/stylelint.js --allow-empty-input 'src/**/*.{css,less}'

.PHONY: stylelint-overrides
stylelint-overrides:
	$(NODE_MODULES)/.bin/stylelint --syntax less --allow-empty-input 'theme/**/*.overrides' 'src/**/*.overrides'

.PHONY: stylelint-fix
stylelint-fix:	## Fix stylelint
	$(NODE_MODULES)/stylelint/bin/stylelint.js --allow-empty-input 'src/**/*.{css,less}' --fix
	$(NODE_MODULES)/.bin/stylelint --syntax less --allow-empty-input 'theme/**/*.overrides' 'src/**/*.overrides' --fix

.PHONY: prettier
prettier:		## Prettier
	$(NODE_MODULES)/.bin/prettier --single-quote --check 'src/**/*.{js,jsx,json,css,less,md}'

.PHONY: prettier-fix
prettier-fix:	## Fix prettier
	$(NODE_MODULES)/.bin/prettier --single-quote  --write 'src/**/*.{js,jsx,json,css,less,md}'

.PHONY: lint
lint:			## ES Lint
	$(NODE_MODULES)/eslint/bin/eslint.js --max-warnings=0 'src/**/*.{js,jsx}'

.PHONY: lint-fix
lint-fix:		## Fix ES Lint
	$(NODE_MODULES)/eslint/bin/eslint.js --fix 'src/**/*.{js,jsx}'



.PHONY: help
help:           ## Show this help.
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/' | column -c2 -t -s :)"