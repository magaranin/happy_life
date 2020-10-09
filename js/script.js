document.addEventListener("DOMContentLoaded", (event) => {
    var modal = document.getElementById("myModal");
    var span = document.body.querySelector(".close");
    var modalImg = document.getElementById("img01");
    var modalImgContainer = document.body.querySelector(".imgContainer");
    var downloadLink = document.getElementById("download_img");
    var revealTimeout = -1;
    var revealPreviewImage = function() {
        var loaderContainer = document.body.querySelector(".loaderContainer");
        loaderContainer.style.display = "none";
        modalImg.style.display = "block";
        modalImgContainer.style.display = "flex";

        if (revealTimeout !== -1) {
            window.clearTimeout(revealTimeout);
        }
    };

    modalImg.style.display = "none";
    modalImg.onload = revealPreviewImage;

    var onCloseClick = function() { 
        modal.style.display = "none";
        var loaderContainer = document.body.querySelector(".loaderContainer");
        loaderContainer.style.display = "block";
        modalImg.style.display = "none";

        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };

    modal.onclick = onCloseClick;
    span.onclick = onCloseClick;

    var stopPropagation = function(event) {
        event.cancelBubble = true;
        event.stopPropagation();
        return true;
    };

    var imgAnchor = document.body.querySelector(".imgContainer a");
    imgAnchor.onclick = stopPropagation;
    downloadLink.onclick = stopPropagation;

    document.body.querySelectorAll(".photo").forEach(element => {
        element.onclick = function(event) {
            modal.style.display = "flex";
            var source = this.src.replace("thumbnails", "images");
            modalImg.src = source;
            modalImg.parentNode.setAttribute("href", source);
            downloadLink.setAttribute("href", source);
            modalImgContainer.style.display = "none";
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.position = 'fixed';
            revealTimeout = window.setTimeout(revealPreviewImage, 3*1000/*3 secs*/);
            event.cancelBubble = true;
            event.stopPropagation();
            return false;
        };
    });
  });