$(".validation-summary-errors").addClass("alert alert-danger");

$(function () {

    $(".submit-post").click(function () {
        $("#Slug").prop("disabled", false);
    });

    function ajaxPostBtn() {
        $("a[data-post]").on("click", function (e) {
            e.preventDefault();

            var $this = $(this),
                href = $this.attr("href"),
                action = $this.attr("href").split("/").reverse()[1],
                postId = $this.attr("href").split("/").reverse()[0],
                path,
                message = $this.data("post"),
                newUrl = function () { if (action == "trash") { path = "restore"; } else if (action == "trash") { path = "trash"; } else { path = "delete"; } return "/Admin/Posts/" + path + "/" + postId; };

            var antiForgeryToken = $("#anti-forgery-form input"), antiForgeryInput = $("<input type='hidden'>").attr("name", antiForgeryToken.attr("name")).val(antiForgeryToken.val());

            function returnView(postInt) {
                switch (action) {
                    case "trash":
                        $("#btnGroup" + postInt).hide();
                        $("#btn" + postInt).show();
                        $("#soft-delete" + postInt).toggleClass("danger");
                        break;
                    case "restore":
                        $("#btnGroup" + postInt).show();
                        $("#btn" + postInt).hide();
                        $("#soft-delete" + postInt).removeClass("danger");
                        break;
                    case "delete":
                        $("#soft-delete" + postInt).remove();
                        break;
                }
            }

            function submit() {
                $.ajax({
                    url: href,
                    type: "POST",
                    data: antiForgeryInput,
                    success: returnView(postId)
                });
            }

            if (action == "delete" && message && confirm(message)) {
                submit();
            }

            if (action != "delete") {
                submit();
            }

        });
    }

    ajaxPostBtn();

    $("[data-slug]").each(function () {
        var $this = $(this),
            $sendSlugFrom = $($this.data("slug")),
            $slug = $("#Slug");

        $this.attr("disabled", "");
        $this.after("<a href='javascript:;' class='btn btn-warning enableSlug'>Double-Click to enable input.</a>");

        $(".enableSlug").on("dblclick", function () {
            $slug.prop("disabled", false);
            $(".enableSlug").remove();
        });

        $sendSlugFrom.keyup(function () {
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

$(window).load(function () {
    $(".no-autocomplete").attr("autocomplete", "off");
});
