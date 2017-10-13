$(".alert").hide();
$("#submit").on("click", function(event) {
	event.preventDefault();

// $("#addForm input[type=text]").each(function() {
// 	if(this.val() == "") {
// 		alert("Enter data correctly!");
// 		break;
// 	}
// });

var productData = {

	itemBarcode: $("#barCode").val().trim(),
	itemCode: $("#number").val().trim(),
	description: $("#description").val().trim(),
	quantity: $("#cant").val().trim(),
	reorderPoint: $("#reorder").val().trim(),
	unitCost: $("#cost").val().trim(),
	location: $("#location").val().trim()
}

$.post('/api/product', productData);

console.log(productData);


}).done(function(){
	$(".alert").show();
    setTimeout(function() { $('.alert').hide() }, 2000);
});


