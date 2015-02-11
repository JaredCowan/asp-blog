$(".validation-summary-errors").addClass("alert alert-danger");

$(function () {

    $(".submit-post").click(function() {
        $("#Slug").prop("disabled", false);
    });

    $("a[data-post]").click(function(e) {
        e.preventDefault();
        
        var $this = $(this)
           , message = $this.data("post");

        if (message && !confirm(message))
            return;

         var antiForgeryToken = $("#anti-forgery-form input")
           , antiForgeryInput = $("<input type='hidden'>").attr("name", antiForgeryToken.attr("name")).val(antiForgeryToken.val());

        $("<form>")
           .attr("method", "post")
           .attr("action", $this.attr("href"))
            .append(antiForgeryInput)
            .appendTo(document.body)
            .submit();
    });
    
    $("[data-slug]").each(function() {
        var $this         = $(this)
          , $sendSlugFrom = $($this.data("slug"))
          , $slug         = $("#Slug");

        $this.attr("disabled", "");
        $this.after("<a href='javascript:;' class='btn btn-warning enableSlug'>Double-Click to enable input.</a>");

        $(".enableSlug").on("dblclick", function() {
            $slug.prop("disabled", false);
            $(".enableSlug").remove();
        });

        $sendSlugFrom.keyup(function() {
            var slug = $sendSlugFrom.val();
            slug = slug.replace(/[^a-z0-9\s]/gi, "");
            slug = slug.toLowerCase();
            slug = slug.replace(/\s+/g, "-");

            if (slug.charAt(slug.length - 1) == "-")
                slug = slug.substr(0, slug.length - 1);

            $this.val(slug);
        });
    });

    

});

$(window).load(function() {
    $(".no-autocomplete").attr("autocomplete", "off");
});
