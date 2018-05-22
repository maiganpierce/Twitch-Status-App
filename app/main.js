// General / onload functions
$(document).ready(function(){

//NAV functions and animations
$('.fav-btn').click(function() {
	$(this).addClass("active");
	$('.pop-btn').removeClass("active");
	$('.fav-status, .fav-card').removeClass("hidden");
	$('.pop-card').addClass("hidden");
})
$('.pop-btn').click(function() {
	$(this).addClass("active");
	$('.fav-btn').removeClass("active");
	$('.fav-status, .fav-card').addClass("hidden");
	$('.pop-card').removeClass("hidden");
})
$('.all-btn').click(function() {
	$(this).addClass("active");
	$('.online-btn, .offline-btn').removeClass("active");
})
$('.online-btn').click(function() {
	$(this).addClass("active");
	$('.all-btn, .offline-btn').removeClass("active");
})
$('.offline-btn').click(function() {
	$(this).addClass("active");
	$('.online-btn, .all-btn').removeClass("active");
})
$('.all-btn, .online-btn, .offline-btn').click(function() {
	$(this).addClass("active");
	$('.fav-card').addClass("hidden");
	$('.fav-card').removeClass("hidden");
})
});

//--- ANGULAR ---

  // //module
  var app = angular.module('Twitch.Tv.App', []);

  //controllers
    //Favorite streamers
    app.controller('favController', function($scope, $http) {
    	var id = "cdm27hi8sitzx09891yy1gxhi147wq";
    	var favStreamers = ["FreeCodeCamp", "Giantwaffle", "Boogie2988", "JennaJulien", "Food", "Painting"];

    	$scope.favorites = [];    


        angular.forEach(favStreamers, function(streamer) {
            $http.get("https://api.twitch.tv/kraken/streams/" + streamer + "?client_id=i7mj8onuhth01n677wrhib5oj794xn")
            .success(function(re_channel) {
                $http.get("https://api.twitch.tv/kraken/channels/" + streamer + "?client_id=i7mj8onuhth01n677wrhib5oj794xn")
                .success(function(favoriteChannels) {                           
                    if (re_channel.stream !== null) {
                        favoriteChannels.online = true;
                        favoriteChannels.status = 'online';
                        favoriteChannels.description = re_channel.stream.channel.status;
                        favoriteChannels.viewers = re_channel.stream.viewers;
                        $scope.favorites.push(favoriteChannels); 
                    } else {
                      favoriteChannels.offline = true;
                      favoriteChannels.status = 'offline';
                      $scope.favorites.push(favoriteChannels);
                  }});})
            
            .error(function() {
                $scope.favorites.push({
                    inactive: true,
                    status: 'inactive',
                    display_name: streamer
                });
            });
        });
    });

    //Popular Streamers
    app.controller('popController', function($scope, $http) {
    	$http.get("https://api.twitch.tv/kraken/streams" + "?client_id=cdm27hi8sitzx09891yy1gxhi147wq")
    	.then(function successfulCallback(response){
    		$scope.data = response.data.streams.slice(1,7);
    	});
    });