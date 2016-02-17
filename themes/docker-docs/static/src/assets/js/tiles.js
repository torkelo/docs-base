(function() {

  var tiles = [],
      markup = '';

  // create each tile
  var tile0 = {link: 'engine', icon:'engine', title:'Docker Engine', text:'Or “Docker” creates and runs Docker containers. Install Docker on Ubuntu, Mac OS X, or Windows. Or use the Install menu to choose from others.'},
      tile1 = {link: 'docker-hub', icon:'hub', title:'Docker Hub', text:'Is our hosted registry service for managing your images. There is nothing to install. You just sign up!'},
      tile2 = {link: 'machine', icon:'machine', title:'Docker Machine', text:'Automates container provisioning on your network or in the cloud. Install machine on Windows, Mac OS X, or Linux.'},
      tile3 = {link: 'compose', icon:'compose', title:'Docker Compose', text:'Defines multi-container applications. You can install Docker Compose on Ubuntu, Mac OS X, and other systems.'},
      tile4 = {link: 'kitematic', icon:'kitematic', title:'Kitematic', text:'Is the desktop GUI for Docker. Install Kitematic.'},
      tile5 = {link: 'docker-trusted-registry', icon:'registry', title:'Docker Trusted Registry', text:'(DTR) supplies a private dedicated image registry. To learn about DTR for your team, see the overview.'},
      tile6 = {link: 'swarm', icon:'swarm', title:'Docker Swarm', text:'Is used to host clustering and container scheduling. Deploy your own “swarm” today in just a few short steps.'},
      tile7 = {link: 'registry', icon:'registry', title:'Docker Registry', text:'Provides open source Docker image distribution. See the registry deployment documentation for more information.'};

  // push each tile to list of tiles
  tiles.push(tile0,tile1,tile2,tile3,tile4,tile5,tile6,tile7);

  tiles.forEach(function(tile) {
      markup = '<li class="product-tile" data-equalizer-watch><div><a href="/'+tile.link+'"><div class="tile-header"><svg><use xlink:href="#'+tile.icon+'"></use></svg><h3>'+tile.title+'</h3></div><p>'+tile.text+'</p></a></div></li>';
      $('ul.products-list').append(markup);
  });

})();
