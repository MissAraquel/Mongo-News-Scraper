$.getJSON("/articles", function(data) {
    for(var i=0; i < data.length; i++) {
        $("#articles").append(
            "<h2 data-id='" + data[i]._id + "'>" + data[i].title + "</h2>"
            + "<p>" +  data[i].summary + "</p>" 
            + "<p><a href='" +  data[i].link + "'>" + data[i].link + "</a></p>");
    }
});
