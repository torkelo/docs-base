This document describes how to set up a development environment for docs-base. The docker/docs-base repository defines the visual theme for Docker’s product documentation. To change the look and feel of the documentation, a developer must change the rendering mechanism defined in docs-base.

###Dependencies
To run the setup for docs developer, below requirements are needed.  

#####NPM
	http://blog.npmjs.org/post/85484771375/how-to-install-npm  

#####Bower  
	npm install -g bower  

#####Grunt  
	npm install -g grunt-cli  

###First time setup
Clone the flickerbox branch of the docs-base repo to your local machine. **Please note that flickerbox is a private branch where the docs redesign is currently developed. This is a temporary situation and all the code will eventually merged to the master branch. Please update this documentation once it's completed.**

	git clone -b flickerbox https://github.com/docker/docs-base.git

Run the makefile target from the docs-base root  for the first time setup.

	make dev-all

###Changing and testing the code
There are two folders that you will most likely need to change the code. After any change in these places you can run `make dev-run` to pick up the changed code and rebuild/restart the local docs site with them.  
After running `make dev-run` you should be seeing the local docs site running on port 8000 of your docker machine (e.g. http://192.168.99.100:8000/). This site has the documentation from docker repository cloned under /devdeps folder with the style or layout changes made under two locations below. Please note that you may have a different IP for your docker machine VM. Double-check that before opening the site.

####themes/docker-docs/layouts
This is where the docs home page and navigation menu layouts are stored. You can look under each product folder to see the specific renderings. For any template starting with partial keyword, check under docs-base/layouts/partials folder.
####docs-base/themes/docker-docs/static
This is where all the static CSS/JS resources used to style the docs site can be found. This folder is by itself a standalone project where you can build using Grunt. All the source files are under /src folder and any changes made there is built/copied to /dist folder.

###Makefile targets for local development

#####make dev-deps-docker
Clones required repos under devdeps folder.

#####make dev-deps-static
Installs npm and bower dependencies for static assets under themes/docker-docs/static

#####make dev-build-static
Builds all sources under themes/docker-docs/static/src to themes/docker-docs/static/dist

#####make dev-build
Runs dev-build-static and builds image from docs-base/Dockerfile.

#####make dev-run
Runs dev-build and starts the docker engine docs site.

#####make dev-all
Runs dev-deps-docker dev-deps-static dev-run to build everything from scratch. This target is intended to be run for the first time setup.


Testing the code

Unit Testing with Hugo
