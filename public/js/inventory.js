$(".alert").hide();
$("#qtyop").hide();
// getting inventory table on page
$.get("api/table", function(data) {

    getinventory(data);

});

function getinventory(data) {

    console.log(data);


    for (i = 0; i < data.length; i++) {

        var firstRowTds = $("#alltable")
            .children()
            .eq(1)
            .children("tr")
            .eq(i)
            .children("td");

        firstRowTds.eq(0).text(data[i].itemBarcode);
        firstRowTds.eq(1).text(data[i].itemCode);
        firstRowTds.eq(2).text(data[i].description);
        firstRowTds.eq(3).text(data[i].quantity);
        firstRowTds.eq(4).text(data[i].reorderPoint);
        firstRowTds.eq(5).text(data[i].unitCost);
        firstRowTds.eq(6).text(data[i].location);


        $("#alltable").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");


    }
}

function getinventory2(data) {

    console.log(data);


    for (i = 0; i < data.length; i++) {

        var firstRowTds = $("#alltable")
            .children()
            .eq(1)
            .children("tr")
            .eq(i)
            .children("td");

        firstRowTds.eq(0).text(data[i].itemBarcode);
        firstRowTds.eq(1).text(data[i].itemCode);
        firstRowTds.eq(2).text(data[i].description);
        firstRowTds.eq(3).text(data[i].quantity);
        firstRowTds.eq(4).text(data[i].reorderPoint);
        firstRowTds.eq(5).text(data[i].unitCost);
        firstRowTds.eq(6).text(data[i].location);


        // $("#alltable").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");


    }
}


function getsearch(data) {

    console.log(data);

        // $("#searchtable").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
    $("#searchbody").empty();

         var tdata;

        for(i=0;i<data.length;i++) {

          var row = $("<tr>");
            
          for(j=0;j<7;j++) {
             
             tdata = $("<td>");
             row.append(tdata);

             $("#searchbody").append(row);
           }
        }

        for (i = 0; i < data.length; i++) {

        var firstRowTds = $("#searchtable")
            .children()
            .eq(1)
            .children("tr")
            .eq(i)
            .children("td");

        firstRowTds.eq(0).text(data[i].itemBarcode);
        firstRowTds.eq(1).text(data[i].itemCode);
        firstRowTds.eq(2).text(data[i].description);
        firstRowTds.eq(3).text(data[i].quantity);
        firstRowTds.eq(4).text(data[i].reorderPoint);
        firstRowTds.eq(5).text(data[i].unitCost);
        firstRowTds.eq(6).text(data[i].location);

        }

      // $("#searchbody").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");


}

// mark button color
$(".btns").on("click", function() {

    $(".btns").css("background-color", "#0080ff");

    $(this).css("background-color", "green");


});

// buttons

$("#search").on("click", function() {
    $("#qtyop").hide();
    $("#barCode").focus();
    $("#todo").text("Search product:");
    searchfunction();
});


$("#add").on("click", function() {
    $("#qtyop").show();
    $("#barCode").focus();
    $("#todo").text("Add product:");
    addfunction();
});

$("#subtract").on("click", function() {
    $("#qtyop").show();
    $("#barCode").focus();
    $("#todo").text("Subtract product:");
    subfunction();
});

$("#pnumsub").on("click", function(){
    
    var ProdNum = {
        itemCode: $("#pnumber").val().trim()
    }

    $.post("/api/manualsubmit", ProdNum , function(data){

        getsearch(data);

    }).done(function() {
                // window.location.href = "/inventory";
                $("#barCode").val("");
    });

});



function addfunction() {

    $(document).ready(function() {

        $("#barCode").change(function() {

            var barCode = {

                itemBarcode: $("#barCode").val().trim(),
                action: "add"
            }


            $.ajax({
                    method: "PUT",
                    url: "/api/addUpdate",
                    data: barCode

                })
                .done(function() {
                    // window.location.href = "/inventory";
                    $("#barCode").val("");
                    $(".alert").show();
                    setTimeout(function() { $('.alert').hide() }, 2000);
                    $.get("api/table", function(data) {

                        getinventory2(data);

                    });
                });

            $.post("/api/record", barCode, function(data) {

                // console.log(data);

            });

        });

    });

};

function subfunction() {

    $(document).ready(function() {

        $("#barCode").change(function() {

            var barCode = {

                itemBarcode: $("#barCode").val().trim(),
                action: "subtract"
            }
            console.log(barCode);

            $.ajax({
                    method: "PUT",
                    url: "/api/subUpdate",
                    data: barCode
                })
                .done(function() {
                    // window.location.href = "/inventory";
                    $("#barCode").val("");
                    $(".alert").show();
                    setTimeout(function() { $('.alert').hide() }, 2000);
                    $.get("api/table", function(data) {

                        getinventory2(data);

                    });

                });

            $.post("/api/record", barCode, function(data) {

                // console.log(data);

            });



        });

    });

};

function searchfunction() {

    $(document).ready(function() {

        $("#barCode").change(function() {

            var barCode = {

                itemBarcode: $("#barCode").val().trim()
                
            }

            console.log(barCode);

            $.post("/api/searchInv", barCode, function(data) {

                getsearch(data);

            }).done(function() {
                // window.location.href = "/inventory";
                $("#barCode").val("");
            });

        });

    });


};