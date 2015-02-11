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

    // Move too new file

    var $tagEditor = $(".post-tag-editor");

    $tagEditor.find(".tag-select").on("click", "> li > a", function(e) {
        e.preventDefault();

        var $this      = $(this)
          , $tagParent = $this.closest("li");
        $tagParent.toggleClass("selected");

        var selected = $tagParent.hasClass("selected");
        $tagParent.find(".selected-input").val(selected);
    });

    var $addTagButton = $tagEditor.find(".add-tag-button")
      , $newTagName = $tagEditor.find(".new-tag-name");

    $addTagButton.click(function(e) {
        e.preventDefault();
        addTag($newTagName.valueOf());
    });

    $newTagName
        .keyup(function(e) {
            if ($newTagName.val().length > 0)
                $addTagButton.prop("disabled", false);
            else
                $addTagButton.prop("disabled", true);
        })
        .keydown(function(e) {
            if (e.which != 13)
                return;

            e.preventDefault();
            if ($newTagName.val().length > 0)
                addTag($newTagName.val());
        });

    function addTag(name) {
        var newIndex = $tagEditor.find(".tag-select > li").size() - 1;

        $tagEditor
            .find(".tag-select > li.template")
            .clone()
            .removeClass("template")
            .addClass("selected")
            .find(".name").text(name).end()
            .find(".name-input").val(name).attr("name", "Tags[" + newIndex + "].Name").end()
            .find(".selected-input").attr("name", "Tags[" + newIndex + "].IsChecked").val(true).end()
            .appendTo($tagEditor.find(".tag-select"));

        $newTagName.val("");
        $addTagButton.prop("disabled", true);
    }

    // End move to new file

});

$(window).load(function() {
    $(".no-autocomplete").attr("autocomplete", "off");
});
