##############################################################################
# Run:
#    make install
#    make start
#
# Go to:
#
#     http://localhost:8888
#
##############################################################################
# SETUP MAKE
#
## Defensive settings for make: https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
# for Makefile debugging purposes add -x to the .SHELLFLAGS
.SHELLFLAGS:=-eu -o pipefail -O inherit_errexit -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

# Colors
# OK=Green, warn=yellow, error=red
ifeq ($(TERM),)
# no colors if not in terminal
        MARK_COLOR=
        OK_COLOR=
        WARN_COLOR=
        ERROR_COLOR=
        NO_COLOR=
else
        MARK_COLOR=`tput setaf 6`
        OK_COLOR=`tput setaf 2`
        WARN_COLOR=`tput setaf 3`
        ERROR_COLOR=`tput setaf 1`
        NO_COLOR=`tput sgr0`
endif

##############################################################################
# SETTINGS AND VARIABLES
DIR=$(shell basename $$(pwd))
NODE_MODULES?=$(shell if [ -d ../../../node_modules/.bin ]; then echo ../../../node_modules; elif [ -d node_modules/.bin ]; then echo node_modules; else echo node_modules; fi)
JEST=$(NODE_MODULES)/.bin/jest
JEST_CONFIG=jest-addon.config.js
SERVE_PORT?=8888

# Top-level targets
.PHONY: all
all: install

.PHONY: clean
clean:                  ## Cleanup generated files
	rm -rf build/messages coverage example/js junit.xml lib

.PHONY: install
install:                ## Install dependencies
	yarn install

.PHONY: start
start:                  ## Start the local example app on http://localhost:8888
	PORT=$(SERVE_PORT) node scripts/serve.js

.PHONY: build
build:                  ## Build the library bundles in ./lib
	node scripts/build.js

.PHONY: test
test:                   ## Run Jest tests once
	CI=1 $(JEST) --config $(JEST_CONFIG) --watchAll=false

.PHONY: test-watch
test-watch:             ## Run Jest in watch mode
	$(JEST) --config $(JEST_CONFIG) --watch

.PHONY: test-update
test-update:            ## Update Jest snapshots
	CI=1 $(JEST) --config $(JEST_CONFIG) --watchAll=false -u

.PHONY: stylelint
stylelint:              ## Stylelint
	$(NODE_MODULES)/.bin/stylelint --allow-empty-input 'src/**/*.{css,less}'

.PHONY: stylelint-overrides
stylelint-overrides:
	$(NODE_MODULES)/.bin/stylelint --custom-syntax less --allow-empty-input 'theme/**/*.overrides' 'src/**/*.overrides'

.PHONY: stylelint-fix
stylelint-fix:          ## Fix stylelint
	$(NODE_MODULES)/.bin/stylelint --allow-empty-input 'src/**/*.{css,less}' --fix
	$(NODE_MODULES)/.bin/stylelint --custom-syntax less --allow-empty-input 'theme/**/*.overrides' 'src/**/*.overrides' --fix

.PHONY: prettier
prettier:               ## Prettier
	$(NODE_MODULES)/.bin/prettier --single-quote --check 'src/**/*.{js,jsx,json,css,less,md}'

.PHONY: prettier-fix
prettier-fix:           ## Fix prettier
	$(NODE_MODULES)/.bin/prettier --single-quote --write 'src/**/*.{js,jsx,json,css,less,md}'

.PHONY: lint
lint:                   ## ES Lint
	$(NODE_MODULES)/.bin/eslint --max-warnings=0 'src/**/*.{js,jsx}'

.PHONY: lint-fix
lint-fix:               ## Fix ES Lint
	$(NODE_MODULES)/.bin/eslint --fix 'src/**/*.{js,jsx}'

.PHONY: i18n
i18n:                   ## i18n
	rm -rf build/messages
	NODE_ENV=development $(NODE_MODULES)/.bin/i18n --addon

.PHONY: help
help:                   ## Show this help.
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/' | column -c2 -t -s :)"
	head -n 8 Makefile

.PHONY: ci-fix
ci-fix:
	echo "Running lint-fix"
	make lint-fix
	echo "Running prettier-fix"
	make prettier-fix
	echo "Running stylelint-fix"
	make stylelint-fix

.PHONY: test-ci
test-ci:
	CI=true JEST_JUNIT_OUTPUT_DIR=. JEST_JUNIT_OUTPUT_NAME=junit.xml $(JEST) --config $(JEST_CONFIG) --watchAll=false --runInBand --reporters=default --reporters=jest-junit --collectCoverage --coverageReporters lcov cobertura text
