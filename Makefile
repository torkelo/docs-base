.PHONY: all binary build cross default docs docs-build docs-shell shell test test-unit test-integration test-integration-cli test-docker-py validate

# env vars passed through directly to Docker's build scripts
# to allow things like `make DOCKER_CLIENTONLY=1 binary` easily
# `docs/sources/contributing/devenvironment.md ` and `project/PACKAGERS.md` have some limited documentation of some of these
DOCKER_ENVS := \
	-e BUILDFLAGS \
	-e DOCKER_CLIENTONLY \
	-e DOCKER_EXECDRIVER \
	-e DOCKER_GRAPHDRIVER \
	-e TESTDIRS \
	-e TESTFLAGS \
	-e TIMEOUT
# note: we _cannot_ add "-e DOCKER_BUILDTAGS" here because even if it's unset in the shell, that would shadow the "ENV DOCKER_BUILDTAGS" set in our Dockerfile, which is very important for our official builds

# to allow `make DOCSDIR=docs docs-shell` (to create a bind mount in docs)
DOCS_MOUNT := $(if $(DOCSDIR),-v $(CURDIR)/$(DOCSDIR):/$(DOCSDIR))

# to allow `make DOCSPORT=9000 docs`
DOCSPORT := 8000

# Get the IP ADDRESS
DOCKER_IP=$(shell python -c "import urlparse ; print urlparse.urlparse('$(DOCKER_HOST)').hostname or ''")
HUGO_BASE_URL=$(shell test -z "$(DOCKER_IP)" && echo localhost || echo "$(DOCKER_IP)")
HUGO_BIND_IP=0.0.0.0

GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD 2>/dev/null)
DOCKER_IMAGE := docker$(if $(GIT_BRANCH),:$(GIT_BRANCH))
DOCKER_DOCS_IMAGE := docs-base$(if $(GIT_BRANCH),:$(GIT_BRANCH))


DOCKER_RUN_DOCS := docker run --rm -it $(DOCS_MOUNT) -e AWS_S3_BUCKET -e NOCACHE --name docker-docs-tools

# for some docs workarounds (see below in "docs-build" target)
GITCOMMIT := $(shell git rev-parse --short HEAD 2>/dev/null)

default: docs

docs: docs-build
	$(DOCKER_RUN_DOCS) -p $(if $(DOCSPORT),$(DOCSPORT):)8000 -e DOCKERHOST "$(DOCKER_DOCS_IMAGE)" hugo server --port=$(DOCSPORT) --baseUrl=$(HUGO_BASE_URL) --bind=$(HUGO_BIND_IP) --config=./config.toml

docs-draft: docs-build
	$(DOCKER_RUN_DOCS) -p $(if $(DOCSPORT),$(DOCSPORT):)8000 -e DOCKERHOST "$(DOCKER_DOCS_IMAGE)" hugo server --buildDrafts="true" --port=$(DOCSPORT) --baseUrl=$(HUGO_BASE_URL) --bind=$(HUGO_BIND_IP) --config=config.toml


docs-shell: docs-build shell

shell:
	$(DOCKER_RUN_DOCS) -p $(if $(DOCSPORT),$(DOCSPORT):)8000 "$(DOCKER_DOCS_IMAGE)" bash

test: docs-build
	docker run --rm "$(DOCKER_DOCS_IMAGE)"

# clone required repos under devdeps folder
# WARNING: Please note that flickerbox-test is a branch on a private fork, where the docs redesign is compatible with.
#          This is a temporary situation and all the code will eventually merged to the master branch.
#          Once the flickerbox-test is merged to master, the line in dev-deps-docker should be:
#          @(if test -d devdeps/docker; then echo devdeps/docker found, skipping; else mkdir -p devdeps/docker; git clone https://github.com/docker/docker.git devdeps/docker; fi)
dev-deps-docker:
	@(if test -d devdeps/docker; then echo devdeps/docker found, skipping; else mkdir -p devdeps/docker; git clone -b flickerbox-test https://github.com/moxiegirl/docker.git devdeps/docker; fi)

# install dependencies for static
dev-deps-static:
	@(cd themes/docker-docs/static/ && npm install -g grunt-cli && npm install && bower install)

# build static assets
dev-build-static:
	grunt build --gruntfile themes/docker-docs/static/Gruntfile.js

# build static assets and docs image
dev-build: dev-build-static docs-build

# dev-build and run docs for docker engine
dev-run: dev-build
	make -f devdeps/docker/docs/Makefile

# all dev tasks. Intended to be run only once at the beginning
dev-all: dev-deps-docker dev-deps-static dev-run

docs-build:
#	( git remote | grep -v upstream ) || git diff --name-status upstream/release..upstream/docs ./ > ./changed-files
#	echo "$(GIT_BRANCH)" > GIT_BRANCH
#	echo "$(AWS_S3_BUCKET)" > AWS_S3_BUCKET
#	echo "$(GITCOMMIT)" > GITCOMMIT
	docker build -t "$(DOCKER_DOCS_IMAGE)" .

leeroy: docs-build
	# the jenkins task also bind mounts in the current dir into `/src`, so we don't need different Dockerfiles for each repo
	docker run --rm -t --name docs-pr$BUILD_NUMBER \
		"$(DOCKER_DOCS_IMAGE)"

markdownlint:
		docker exec -it docker-docs-tools /usr/local/bin/markdownlint /docs/content/

htmllint:
		docker exec -it docker-docs-tools /usr/local/bin/linkcheck http://127.0.0.1:8000
