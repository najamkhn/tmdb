(function(app, $) {

    /**
    ** Global Application Configuration
    --
    **/
    app.config = {
        imgTMDBServer: 'https://image.tmdb.org/t/p/w500/',

        templateList: {
            top: $('#top').html(),
            discover: $('#discover').html(),
            popular: $('#popular').html(),
            upcoming: $('#upcoming').html(),
            now_playing: $('#now_playing').html(),
            search: $('#search').html(),
            details: $('#details').html()
        }
    };

    /**
    ** Collections
    --
    **/
    var TopRatedMoviesCollections = Backbone.Collection.extend({
        url: "movie/top_rated"
    });

    var PopularMoviesCollections = Backbone.Collection.extend({
        url: "movie/popular"
    });

    var DetailsMovieModel = Backbone.Model.extend({
        urlRoot: "movie/"
    });

    var SearchMoviesCollections = Backbone.Collection.extend({
        url: "search/movie"
    });


    var UpcomingMoviesCollections = Backbone.Collection.extend({
        url: "movie/upcoming"
    });


    var NowPlayingMoviesCollections = Backbone.Collection.extend({
        url: "movie/now_playing"
    });

    var DiscoverMoviesCollections = Backbone.Collection.extend({
        url: "discover/movie?sort_by=popularity.desc"
    });


    /**
    ** Global Events
    --
    **/

    app.events = {
        searchKeywordEvent: function(d, e) {
            d.preventDefault();
            return false;
        }
    };



    /**
    ** Views
    --
    **/
    app.views = {
        DiscoverMovies: Backbone.View.extend({
            el: ".content",
            render: function(){
                var self = this,
                    content = self.$el,
                    discoverMoviesCollections = new DiscoverMoviesCollections();

                discoverMoviesCollections.fetch({
                    success: function() {
                        var d = arguments[0],
                            response = arguments[1],
                            template = _.template($('#movie_info').html()),
                            topTemplate = _.template(app.config.templateList.discover);

                        self.$el.html(topTemplate({
                            movie_info: template({
                                data: response,
                                result: response.results && response.results.splice(0, 9),
                                media_path: app.config.imgTMDBServer
                            })
                        }));
                    }
                });
                return this;
            }
        }),

        TopRatedMovies: Backbone.View.extend({
            el: ".content",
            render: function(){
                var self = this,
                    content = self.$el,
                    topRatedCollections = new TopRatedMoviesCollections();

                topRatedCollections.fetch({
                    success: function() {
                        var d = arguments[0],
                            response = arguments[1],
                            template = _.template($('#movie_info').html()),
                            topTemplate = _.template(app.config.templateList.top);

                        self.$el.html(topTemplate({
                            movie_info: template({
                                data: response,
                                result: response.results && response.results.splice(0, 9),
                                media_path: app.config.imgTMDBServer
                            })
                        }));
                    }
                });
                return this;
            },
            events: {
            }
        }),

        DetailsMovies: Backbone.View.extend({
            el: ".content",
            render: function(params){
                var self = this,
                    content = self.$el,
                    detailsMovieModel = new DetailsMovieModel(params);

                detailsMovieModel.fetch({
                    success: function() {
                        var d = arguments[0],
                            response = arguments[1],
                            template = _.template($('#movie_details').html()),
                            detailsTemplate = _.template(app.config.templateList.details);
                        self.$el.html(template({
                            data: response,
                            media_path: app.config.imgTMDBServer
                        }
                        ));
                    }
                });
                return this;
            },
            events: {
            }
        }),

        PopularMovies: Backbone.View.extend({
            el: ".content",
            render: function(){
                var self = this,
                    content = self.$el,
                    popularMoviesCollection = new PopularMoviesCollections();

                popularMoviesCollection.fetch({
                    success: function() {
                        var d = arguments[0],
                            response = arguments[1],
                            template = _.template($('#movie_info').html()),
                            popularTemplate = _.template(app.config.templateList.popular);

                        self.$el.html(popularTemplate({
                            movie_info: template({
                                data: response,
                                result: response.results && response.results.splice(0, 9),
                                media_path: app.config.imgTMDBServer
                            })
                        }));
                    }
                });
                return this;
            }
        }),

        UpcomingMovies: Backbone.View.extend({
            el: ".content",
            render: function(){
                var self = this,
                    content = self.$el,
                    upcomingMoviesCollection = new UpcomingMoviesCollections();

                upcomingMoviesCollection.fetch({
                    success: function() {
                        var d = arguments[0],
                            response = arguments[1],
                            template = _.template($('#movie_info').html()),
                            upcomingTemplate = _.template(app.config.templateList.upcoming);

                        self.$el.html(upcomingTemplate({
                            movie_info: template({
                                data: response,
                                result: response.results && response.results.splice(0, 9),
                                media_path: app.config.imgTMDBServer
                            })
                        }));
                    }
                });
                return this;
            }
        }),

        NowPlaying: Backbone.View.extend({
            el: ".content",
            render: function(){
                var self = this,
                    content = self.$el,
                    nowPlayingMoviesCollection = new NowPlayingMoviesCollections();

                nowPlayingMoviesCollection.fetch({
                    success: function() {
                        var d = arguments[0],
                            response = arguments[1],
                            template = _.template($('#movie_info').html()),
                            nowplayingTemplate = _.template(app.config.templateList.now_playing);

                        self.$el.html(nowplayingTemplate({
                            movie_info: template({
                                data: response,
                                result: response.results && response.results.splice(0, 9),
                                media_path: app.config.imgTMDBServer
                            })
                        }));
                    }
                });
                return this;
            }
        }),

        SearchMovies: Backbone.View.extend({
            el: ".content",
            render: function(params){
                var self = this,
                    content = self.$el,
                    searchMoviesCollection = new SearchMoviesCollections(),
                    template = _.template($('#movie_info').html()),
                    searchTemplate = _.template(app.config.templateList.search);

                self.$el.empty();
                searchMoviesCollection.fetch({
                    data: params,
                    type: 'GET',
                    success: function() {
                        var d = arguments[0],
                            response = arguments[1],
                            template = _.template($('#movie_info').html()),
                            searchTemplate = _.template(app.config.templateList.search);

                        self.$el.html(searchTemplate({
                            movie_info: template({
                                data: response,
                                result: response.results && response.results.splice(0, 9),
                                media_path: app.config.imgTMDBServer
                            })
                        }));
                    }
                });
                return this;
            }
        })
    };

    var Router = Backbone.Router.extend({
        routes: {
            "": "home",
            "top": "top",
            "popular": "popular",
            "upcoming": "upcoming",
            "now-playing": "now_playing",
            "discover": "discover",
            "search": "search",
            "details/:id": "details"

        },

        home: function () {
            var homePage = new app.views.TopRatedMovies();
            homePage.render();
        },

        top: function() {
            var topRated = new app.views.TopRatedMovies();
            topRated.render();
        },

        popular: function() {
            var popularMovies = new app.views.PopularMovies();
            popularMovies.render();
        },

        upcoming: function() {
            var upcomingMovies = new app.views.UpcomingMovies();
            upcomingMovies.render();
        },

        now_playing: function() {
            var nowPlaying = new app.views.NowPlaying();
            nowPlaying.render();
        },

        search: function() {
            var searchMovies = new app.views.SearchMovies();
            searchMovies.render({'query': $.param($('[data-type="search"]').val()) });
        },

        discover: function() {
            var discoverMovies = new app.views.DiscoverMovies();
            discoverMovies.render();
        },

        details: function(params) {
            var detailsMovies = new app.views.DetailsMovies();
            detailsMovies.render({id: params});
        }


    });

    var vent = _.extend({}, Backbone.Events);
    vent.on("load:registerGlobalEvents", function(){
        $('[data-type="search"]').on('keyup', function(e){
           var len = $(this).val().length;
           if ( !(len % 5) || event.keyCode == 13 ) {
                var searchMovies = new app.views.SearchMovies();
                searchMovies.render({'query': $(this).val() });
           }
        });

        $('.hamburger').on('click', function(e){
            e.preventDefault();
            $('.nav-column').addClass('nav-column-normalize');
            return false;
        });

        $('.close').on('click', function() {
            $('.nav-column').removeClass('nav-column-normalize');
        });


    }).trigger("load:registerGlobalEvents");


    var router = new Router();
    Backbone.history.start();



} (window.Application = window.Application || {}, window.jQuery));
