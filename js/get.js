var request;
var idb=window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB;
if(!idb in navigator){
  alert("Browser is not supported");

}
var open=idb.open("storeData",1);
console.log("indexedDb is created");

open.onupgradeneeded=function(event) {
  var request=event.target.result;
  var storeDB=request.createObjectStore("formdata",{keyPath:"id",autoIncrement:true});
 console.log(storeDB);
}
open.onerror=function(error){
  console.log("object store is not created",+error);
 }
  open.onsuccess=function(event){
   request=event.target.result;
    var transaction=request.transaction("formdata","readwrite");
    var storeDB=transaction.objectStore("formdata");
    var finalData=storeDB.getAll();
    finalData.onsuccess=function(data){
      console.log(data.target.result);
      display(data.target.result);
    }
}
function display(data){
   var parent=document.querySelector(".parent");
      for(var i=0;i<data.length; i++){
   var child=document.createElement("div");
child.classList.add("child");
    var image=document.createElement("img");
   image.src="images/add.svg";
   image.alt=data[i].name;
   var name=document.createElement("h2");
   name.textContent=data[i].name;

   var role=document.createElement("h2");
   var link=document.createElement("a");
   link.href="resume.html?id="+data[i].id;
   link.textContent="view profile";

   child.append(image);
   parent.append(child);
   child.append(role);
   child.append(link);
   child.append(name);

}
}
