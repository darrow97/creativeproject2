function onClick(e)
{
  e.preventDefault();

  let s = document.getElementById('selector');
  let type = s.options[s.selectedIndex].value;

  let url = "https://ghibliapi.herokuapp.com/" + type;// + "/" + desire;

  fetch(url)
  .then(function(response) { return response.json(); })
  .then(async function(json)
  {
    console.log(json);
    let results = "";
    for(let i = 0; i < json.length; i++)
    {
      results += "<div class= \"response\">";

      if(type === "films")
      {
        results += (i + 1) + ": " + json[i].title;// + "<br>";
        results += "<br><ul>"
        results += "<li>Director: " + json[i].director;
        results += "<li>Producer: " + json[i].producer;
        results += "<li>Release Year: " + json[i].release_date;
        results += "<li>Description:<ul><li>" + json[i].description + "</li></ul>";
      }
      else if(type !== "films")
      {
        results += (i + 1) + ": " + json[i].name;
        results += "<br><ul>"
        if(type === "people")
        {
          let speciesType = await fetch(json[i].species)
          .then(function(response) { return response.json(); })
          .then(function(json3)
          {
            return json3.name;
          });
          results += "<li>Species: " + speciesType;
          results += "<li>Gender: " + json[i].gender;
          results += "<li>Age: " + json[i].age;


        }
        else if(type === "locations")
        {
          results += "<li>Climate: " + json[i].climate;
        }
        results += "<li>Movies: "
          for(let j = 0; j < json[i].films.length; j++)
          {

            let findFilms = await fetch(json[i].films[j])
            .then(function(response) {return response.json(); })
            .then(function(json2)
            {
              let str = json2.title;
              if(j + 1 !== json[i].films.length) str += ", ";
              return str;
            });
            results += findFilms;
          }
        results += "</ul>";
      }
        results += "</div>";
    }
    document.getElementById('test').innerHTML = results;

  });

}


document.getElementById('search').addEventListener('click', onClick);


// https://ghibliapi.herokuapp.com/#section/Base-URL
