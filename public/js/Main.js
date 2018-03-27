var ShowMovies = ShowMovies || {};

try
{
    var showMovies = new ShowMovies(true);
}
catch(err)
{
    console.error("There is error in your code!! Error: "+err.message);
}