
$.get("/api/history",function(data){
   
   gethistory(data);  

});

function gethistory(data) {

	console.log(data);

	for (i = 0; i < data.length; i++) {

        var firstRowTds = $("#histable")
            .children()
            .eq(1)
            .children("tr")
            .eq(i)
            .children("td");
            
        firstRowTds.eq(0).text(data[i].itemBarcode);
        firstRowTds.eq(1).text(data[i].itemCode);
        firstRowTds.eq(2).text(data[i].description);
        firstRowTds.eq(3).text(data[i].qty);
        firstRowTds.eq(4).text(moment(data[i].createdAt).format('l'));
       

        $("#histable").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");

     }
}