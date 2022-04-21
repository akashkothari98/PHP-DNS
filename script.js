 (function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()
      $(function() {
      	$('.searchbox-input').on("keyup", function (e) {
      		const input = $(".searchbox-input").val().toLowerCase();
      		$.each($(".toolss"),function(){
      			var v = $(this).text().toLowerCase();

      			if(v.includes(input)){
					$(this).attr("hidden",false);
      			}else{
      				$(this).attr("hidden",true);
      			}
      		})
    
    
});
        var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

      $("#loader").attr("hidden",true);
      $('#getdns').on('submit', function(event) {
      event.preventDefault();
    $("#dfor").html("Details For "+$("#domain").val());
    var formData = new FormData(this);
        $.ajax({
            url: "Get_dns.php", 
            method: "post",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function() {
              $("#dnstbl").attr("hidden",true);
              $("#printbtn").attr("hidden",true);
              $("#hiddbtn").attr("hidden",true);
              $("#dnsbd").html("");
              $("#msgg").html("");
              $("#loader").attr("hidden",false);
            },
            success: function(dat) {
              dat = JSON.parse(dat);
              if(dat.status == "fail"){
                $("#msgg").html("<div class='alert alert-danger col-12 p-4'>OPPS!! Error Occured!! We Think Domain is Invalid Or Not Registered!!</div>")
              }
              else{
                //var data = data.data;
              var o = dat.data;
              
              var val = groupBy(o,"type");
              var tp;
              $.each(val,function(key,value){

                $("#dnsbd").append("<tr class='hh' id='"+key+"'><td id='r"+key+"' class='text-center'></td><td id='c"+key+"' class='text-center'></td><td id='t"+key+"' class='text-center'></td><td id='d"+key+"'></td></tr>");

                $.each(value,function(k,value){
                	
                  if(value.hidden == 'yes'){
                    $("#"+key).addClass("d-none");
                    $("#hiddbtn").attr("hidden",false);
                  }
                  $('#c'+key).append(value.class+"<br/>");
                  $('#t'+key).append(value.ttl+"<br/>");

                  if(key == "A" && value.msgg == ""){
                    $('#r'+key).html('<h4 class="alert alert-primary fs-6">'+value.type+'</h4>');
                    $('#d'+key).append(value.ip+"<br/>");
                  }
                  else if(key =="MX" && value.msgg == ""){
                    $('#r'+key).html('<h4 class="alert alert-danger fs-6">'+value.type+'</h4>');
                    $('#d'+key).append("<b>Priority : </b> "+value.pri+" => <b>Target : </b>"+value.target +" ("+value.ip+")"+"<br/>");
                  }
                  else if((key == "NS" || key == "CNAME" || key == "PTR") && value.msgg==""){
                    $('#r'+key).html('<h4 class="alert alert-success fs-6">'+value.type+'</h4>');
                    $('#d'+key).append(value.target+" ("+value.ip+")"+"<br/>");
                  }
                  else if(key == "HINFO" && value.msgg == ""){
                    $('#r'+key).html('<span class="alert alert-secondary fs-6">'+value.type+'</span>');
                    $('#d'+key).append("<b>CPU :</b> "+value.cpu+"<br/>");
                    $('#d'+key).append("<b>OS :</b> "+value.os+"<br/>");
                    
                  }
                  else if(key == "CAA" && value.msgg == ""){
                    $('#r'+key).html('<span class="alert alert-secondary fs-6">'+value.type+'</span>');
                    $('#d'+key).append("<b>Flags :</b> "+value.flags+"<br/>");
                    $('#d'+key).append("<b>Tag :</b> "+value.tag+"<br/>");
                    $('#d'+key).append("<b>Value :</b> "+value.value+"<br/>");                    
                  }
                  else if(key == "A6" && value.msgg == ""){
                    $('#r'+key).html('<span class="alert alert-secondary fs-6">'+value.type+'</span>');
                    $('#d'+key).append("<b>Mask length :</b> "+value.masklen+"<br/>");
                    $('#d'+key).append("<b>Ipv6 :</b> "+value.ipv6+"<br/>");
                    $('#d'+key).append("<b>Chain :</b> "+value.chain+"<br/>");                    
                  }
                  else if(key == "SOA" && value.msgg == ""){
                    $('#r'+key).html('<span class="alert alert-warning mt-5 fs-6">'+value.type+'</span>');
                    $('#d'+key).append("<b>Email :</b> "+value.rname.replace(".", "@")+"<br/>");
                    $('#d'+key).append("<b>Serial :</b> "+value.serial+"<br/>");
                    $('#d'+key).append("<b>Refresh :</b> "+value.refresh+"<br/>");
                    $('#d'+key).append("<b>Retry :</b> "+value.retry+"<br/>");
                    $('#d'+key).append("<b>Expire :</b> "+value.expire+"<br/>");
                    $('#d'+key).append("<b>Minimum TTL :</b> "+value["minimum-ttl"]+"<br/>");
                  }
                  else if(key == "TXT" && value.msgg == ""){
                    $('#r'+key).html('<h4 class="alert alert-dark fs-6">'+value.type+'</h4>');
                    $('#d'+key).append(value.txt+"<br/>");
                  }
                  else if(key == "AAAA" && value.msgg == ""){
                    $('#r'+key).html('<h4 class="alert alert-info fs-6">'+value.type+'</h4>');
                    $('#d'+key).append(value.ipv6+"<br/>");
                  }
                  else if(value.msgg !==""){
                    $('#r'+key).html('<h4 class="alert alert-secondary fs-6">'+value.type+'</h4>');
                    $('#d'+key).append(value.msgg+"<br/>");
                  }

                })
                
                
               
                
              })
             
              $("#dnstbl").attr("hidden",false);
              $("#printbtn").attr("hidden",false);
              
               
             }
                $("#loader").attr("hidden",true);
                $('html,body').animate({
                scrollTop: $("#result").offset().top
            	}, 500);
                
            }
        })
  });
    });
     function togglehid(){

      $(".hh").toggleClass("d-none");
      if($("#hiddbtn").html() == '<i class="bi bi-eye-slash"></i> Hide Empty Records'){
          $("#hiddbtn").html(`<i class="bi bi-eye"></i> Show Empty Records`);
      } else{
      $("#hiddbtn").html(`<i class="bi bi-eye-slash"></i> Hide Empty Records`);
    }
     }
