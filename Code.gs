var url ="https://docs.google.com/spreadsheets/d/16yzee5EY8gDCVN9EN7bQGUE-RSL_6Tjr-vzmmNoLrxc/edit#gid=0";
var Route = {};
Route.path = function(route,callback){
   Route[route] = callback;
}

function doGet(e) {
  
  Route.path("form",loadForm);
  Route.path("table",loadTable);
  Route.path("about",loadAbout);
  Route.path("editList",loadEditList);
  
  if(Route[e.parameters.v]) {
  return Route[e.parameters.v]();
  }else {
   return render("home");
  }
}

function loadForm() {
  
  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Options");
  var list = workSheet.getRange(1,1,workSheet.getRange("A1").getDataRegion().getLastRow(),1).getValues();
  var htmlListArray = list.map(function(r){return '<option>' + r[0] + '</option>'; }).join('');  

  return render("page", {list: htmlListArray })

}

function loadTable() {  
  return render("table");
}

function loadAbout() {
  return render("about",{title:"Title Fight $18,000 purse", other: "more other"});
}

function loadEditList() {
  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Options");
  var list = workSheet.getRange(1,1,workSheet.getRange("A1").getDataRegion().getLastRow(),1).getValues();
  var htmlListArray = list.map(function(r){return '<option>' + r[0] + '</option>'; }).join('');  

  return render("editList", {list: htmlListArray});
}







