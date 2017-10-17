$.get("/api/chart", function(data) {



}).done(function(results) {

var master = [];
console.log(results);
$("#report").on("click" , function() {

if(document.getElementById('inflow').checked) {

var fromday = $("#fromday").val();
var finalfrom = moment(fromday).format('l');
var today = $("#today").val();
var finalto = moment(today).format('l');

for(i=0;i<results.length;i++) {

  var dbdate1 = moment(results[i].createdAt).format('l');

  if(moment(dbdate1).isBetween(finalfrom, finalto, null, '[]')) {

      if(master.includes(results[i].itemCode)) {

           x=0;

      }

      else {

          master.push(results[i].itemCode);
      }
   }
}


var numbers = [];
var total = 0;
for(i=0;i<master.length;i++) {

    total = 0;

	for(j=0;j<results.length;j++) {

		if(master[i] == results[j].itemCode) {

          var dbdate2 = moment(results[j].createdAt).format('l');
             
             if(moment(dbdate2).isBetween(finalfrom, finalto, null, '[]')) {
               
                if(results[j].qty > 0) {

                 total = results[j].qty + total;
                 numbers[i] = total;
                }
      
             }
             

		}
	}
}

var ctx = document.getElementById("myChart").getContext('2d');
var datas = numbers;
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: master,
        datasets: [{
            label: 'qty on inventory',
            data: datas,
            backgroundColor: "rgb(70,130,180)",
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },

        responsive: false
    }
});

}

if(document.getElementById('outflow').checked) {

var fromday = $("#fromday").val();
var finalfrom = moment(fromday).format('l');
var today = $("#today").val();
var finalto = moment(today).format('l');

for(i=0;i<results.length;i++) {

  var dbdate1 = moment(results[i].createdAt).format('l');

  if(moment(dbdate1).isBetween(finalfrom, finalto, null, '[]')) {

      if(master.includes(results[i].itemCode)) {

           x=0;

      }

      else {

          master.push(results[i].itemCode);
      }
   }
}


var numbers = [];
var total = 0;
for(i=0;i<master.length;i++) {

    total = 0;

  for(j=0;j<results.length;j++) {

    if(master[i] == results[j].itemCode) {

          var dbdate2 = moment(results[j].createdAt).format('l');
             
             if(moment(dbdate2).isBetween(finalfrom, finalto, null, '[]')) {

                if(results[j].qty < 0) {
                 total = results[j].qty + total;
                 numbers[i] = total;
                }
      
             }
             

    }
  }
}

var ctx = document.getElementById("myChart").getContext('2d');
var datas = numbers;
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: master,
        datasets: [{
            label: 'qty on inventory',
            data: datas,
            backgroundColor: "rgb(70,130,180)",
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },

        responsive:false
    }
});

}

});

});