$("span.movie").on("mouseover", function() {

  var top = this.getBoundingClientRect().top;
  var right = this.getBoundingClientRect().right;
  console.log(right);
  console.log($(window).width());
  var windowHeight = $(window).height();
  if (top < windowHeight/2) { // the title is in the top half
    $(this).find("span.minfo").addClass("tooltipdown");
  }
  else { // the title is in the bottom half
    $(this).find("span.minfo").addClass("tooltipup");
  }

  var film = $(this).text();
  film = film.split(" ");
  var year = film[film.length-1].slice(1,5); //getting the year for the url
  var title = film.slice(0, film.length-1).join("+"); //getting the title for the url
  console.log(title);
  console.log(year);
  var url = "http://www.omdbapi.com/?t="+title+"&y="+year+"&apikey=f5edb3bf";
  var client = new XMLHttpRequest();
  client.open("GET", url, true);
  client.onreadystatechange = function() {
    if(client.readyState == 4) {
    var response = JSON.parse(client.responseText);
    console.log(response['Director']);
    var x = "<strong>" + response['Title'] + " (" + response['Year'] + ")</strong><br>";
    //INLINE STYLING USED HERE
    x += "<span style='font-size:0.75rem; line-height: normal'>" + response['Rated'] + " | " + response['Runtime'] + " | " + response['Genre'] + "<br>";
    x += "Director: " + response['Director'] + "<br>";
    x += "Actors: " + response['Actors'] + "<br>";
    x += "IMDb Rating: " + response['imdbRating'] + " / 10<br></span>";
    // The following line adds the plot to the tooltip
    // x += "<span style='font-size:0.5rem; line-height: normal'>" + response['Plot'] + "</span>";
    $(".details").html(x);
    $(".poster").attr("src", response["Poster"]);
    };
  };
  client.send();
});

$("span.movie").on("mouseout", function() {
    $(".details").html("");
    $(".poster").attr("src", "");
    $(this).find("span.minfo").removeClass("tooltipup");
    $(this).find("span.minfo").removeClass("tooltipdown");
});

//sample link to see JSON response
//http://www.omdbapi.com/?t=psycho&y=1960&apikey=f5edb3bf
