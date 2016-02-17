FROM docs-base:gravy-3
MAINTAINER YOUR NAME <forrest.slater@docker.com> (@fpslater)

# to get the git info for this repo
COPY . /src

COPY . /docs/content/phase-2/

RUN find /docs/content/phase-2 -type f -name "*.md" -exec sed -i.old  -e '/^<!.*metadata]>/g' -e '/^<!.*end-metadata.*>/g' {} \;
