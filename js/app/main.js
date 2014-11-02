(function(app, $) {
    app.config = {
        imgTMDBServer: 'https://image.tmdb.org/t/p/w500/',

        templateList: {
            top: $('#top').html(),
            popular: $('#popular').html(),
            upcoming: $('#upcoming').html(),
            search: $('#search').html(),
            details: $('#details').html(),

        }
    }

    app.events = {
        searchKeywordEvent: function(d, e) {
            d.preventDefault();
            return false;
        }
    };

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
        url: "search/keyword"
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


    var Router = Backbone.Router.extend({
        routes: {
            "": "discover",
            "top": "top",
            "popular": "popular",
            "upcoming": "upcoming",
            "now-playing": "now_playing",
            "discover": "discover",
            "search": "search",
            "details/:id": "details"

        },

        home: function () {
            var homePage = new app.views.DiscoverMovies();
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
            var nowPlayingMovies = new app.views.NowPlayingMovies();
            nowPlayingMovies.render();
        },

        search: function() {
            var searchMovies = new SearchMovies();
            searchMovies.render();
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

    var router = new Router();

    Backbone.history.start();

} (window.Application = window.Application || {}, window.jQuery));
