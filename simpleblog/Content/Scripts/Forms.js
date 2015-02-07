//$(".validation-summary-valid").hide();
$(".validation-summary-errors").addClass("alert alert-danger")
//$(".validation-summary-errors").show();
//$(".validation-summary-errors").fadeIn("slow");
$(function () {
  
    $("a[data-post]").click(function(e) {
        e.preventDefault();

        var $this   = $(this)
          , message = $this.data("post");

        if (message && !confirm(message))
            return;
        
        // var antiForgeryToken = $("#anti-forgery-form input");
        // var antiForgeryInput = $("<input type='hidden'>").attr("name", antiForgeryToken.attr("name")).val(antiForgeryToken.val());

        //$("<form>")
        //   .attr("method", "post")
        //   .attr("action", $this.attr("href"))
        //    .append(antiForgeryInput)
        //    .appendTo(document.body)
        //    .submit();

        $.ajax({
            type: "POST",
            url: $this.attr("href"),
            headers: {
                accept: "text/html; charset=utf-8"
            },
            
            data: "{}",
            dtaType: "text/html",
            contentType: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            accept: "text/html"
        });

    });

    


});

