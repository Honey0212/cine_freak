function ShowMovies()
{
	that =this;
	window.onload=function(){
		document.getElementById("searchMovies").addEventListener('click',that.getData,false);
		document.getElementById("searchAgain").addEventListener('click',that.showSearchform,false);
	}
	
	
}
ShowMovies.prototype={
	getData:function(){
		
	var data="movieTitle="+document.getElementById("movieTitle").value;
	
		
		var xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("data :"+this.responseText)  ;
			that.showData(this.responseText);
		}
		};
		xhttp.open("POST", "getMovies", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(data);
	},
	
	showSearchform : function()
	{
		document.getElementById("searchForm").setAttribute("style","display: block");
		document.getElementById("container").setAttribute("style","display: none");
		document.getElementById("movieTitle").value="";
		document.getElementById("errorText").innerHTML = "";
	},
	
	showData : function(jsonData)
	{
		document.getElementById("row").innerHTML="";
		jsonData=JSON.parse(jsonData);
		if(jsonData == null || jsonData.length==0)
		{
			document.getElementById("errorText").innerHTML = "";
			document.getElementById("errorText").append(document.createTextNode("No movies present with such name.Please try again!"));
			document.getElementById("movieTitle").value="";
		}
		else
		{
			var i;
			var formNode = document.getElementById("searchForm");
			formNode.setAttribute("style","display: none");
			document.getElementById("container").setAttribute("style","display: block");
			for(i=0;i<jsonData.length;i++)
			{
				var div = document.createElement('div');
				div.setAttribute("class","col-sm-6 col-xs-6");
				var div1 = document.createElement('div');
				div1.setAttribute("class","list mb-2");
				var divA = document.createElement('div');
				divA.setAttribute("class","list-header");
				var link = document.createElement('a');
				link.setAttribute("href","#");
				link.setAttribute("class","list-header-image");
				var image = document.createElement('img');
				image.setAttribute("src",jsonData[i].images.poster);
				link.append(image);
				divA.append(link);
				div1.append(divA);
				
				var divB = document.createElement('div');
				divB.setAttribute("class","list-content");
				var heading = document.createElement('h2');
				var titleLink = document.createElement('a');
				titleLink.setAttribute("href","#");
				titleLink.setAttribute("class","text-black");
				titleLink.append(document.createTextNode(jsonData[i].title));
				heading.append(titleLink);
				divB.append(heading);
				
				var span1 = document.createElement('span');
				span1.setAttribute("class","list-meta");
				
				var spanA = document.createElement('span');
				spanA.setAttribute("class","list-meta-item");
				var iTag = document.createElement('i');
				iTag.setAttribute("class","fa fa-clock-o");
				spanA.append(iTag);
				spanA.append(document.createTextNode(jsonData[i].year));
				
				var rating= document.createElement('a');
				rating.setAttribute("class","list-meta-item");
				rating.setAttribute("href","#");
				var ratingiTag = document.createElement('i');
				ratingiTag.setAttribute("class","fa fa-star");
				rating.append(ratingiTag);
				rating.append(document.createTextNode(jsonData[i].rating.percentage+"%"));
				span1.append(spanA);
				span1.append(rating);
				divB.append(span1);
				var temp = document.createElement('p');
				temp.append(document.createTextNode(jsonData[i].synopsis.substr(0,200)+"..."));
				divB.append(temp);
				
				div1.append(divB);
				div.append(div1);
				document.getElementById("row").append(div);
				
				
			}
		}
	}
	
}