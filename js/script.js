document.querySelectorAll('.dropdown-are').forEach(dropdown => {
    dropdown.addEventListener('mouseenter', () => {
        dropdown.querySelector('.dropdown-menu-are').style.visibility = 'visible';
        dropdown.querySelector('.dropdown-menu-are').style.opacity = '1';
    });
    dropdown.addEventListener('mouseleave', () => {
        dropdown.querySelector('.dropdown-menu-are').style.visibility = 'hidden';
        dropdown.querySelector('.dropdown-menu-are').style.opacity = '0';
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const barIcon = document.querySelector(".bar-icon");
    const xIcon = document.querySelector(".x-icon");
    const fullscreenNav = document.querySelector(".fullscreen-nav");

    barIcon.addEventListener("click", function () {
        if (fullscreenNav.classList.contains("active")) {

            fullscreenNav.classList.add("out");

            setTimeout(() => {
                fullscreenNav.classList.remove("active", "out");
            }, 300); 
        } else {
            fullscreenNav.classList.add("active");
        }
    });
    xIcon.addEventListener("click", function () {

        fullscreenNav.classList.add("out");

        setTimeout(() => {
            fullscreenNav.classList.remove("active");
            fullscreenNav.classList.remove("out");
        }, 300);
    });
});

$(document).ready(function () {
    const fileList = $("#file-list");
    const addMoreBtn = $("#add-more-btn");

    function handleFiles(files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileItem = $("<div>").addClass("file-item");
            const removeBtn = $("<div>")
                .addClass("remove-btn")
                .html('<i class="fas fa-times"></i>')
                .on("click", function () {
                    fileItem.remove();
                    if (!fileList.children().length) {
                        addMoreBtn.hide();
                    }
                });
            const rotateBtn = $("<div>")
                .addClass("rotate-btn")
                .html('<i class="fas fa-sync-alt"></i>');
            let rotation = 0;
            rotateBtn.on("click", function () {
                rotation = (rotation + 90) % 360;
                if (file.type.startsWith("image")) {
                    img.css("transform", `rotate(${rotation}deg)`);
                } else if (file.type === "application/pdf") {
                    canvas.css("transform", `rotate(${rotation}deg)`);
                }
            });
            
            if (file.type.startsWith("image")) {
                const img = $("<img>");
                const reader = new FileReader();
                reader.onload = function (e) {
                    img.attr("src", e.target.result);
                };
                reader.readAsDataURL(file);
                fileItem.append(img);
            } else if (file.type === "application/pdf") {
                const canvas = $("<canvas>");
                const context = canvas[0].getContext("2d");
                const pdfjsLib = window["pdfjs-dist/build/pdf"];
                const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(file));
                loadingTask.promise.then(function (pdf) {
                    pdf.getPage(1).then(function (page) {
                        const viewport = page.getViewport({ scale: 0.5 });
                        canvas.attr("width", viewport.width);
                        canvas.attr("height", viewport.height);
                        const renderContext = {
                            canvasContext: context,
                            viewport: viewport,
                        };
                        page.render(renderContext).promise.then(function () {
                            fileItem.append(canvas);
                        });
                    });
                });
            } else {
                alert("Unsupported file type: " + file.type);
                continue;
            }
            fileItem.append(removeBtn).append(rotateBtn);
            fileList.append(fileItem);
        }
        if (fileList.children().length) {
            addMoreBtn.show();
        }
    }

    window.triggerUploadInput = function () {
        $("#upload-input").click();
    };

    window.triggerAddMoreInput = function () {
        $("#add-more-input").click();
    };

    $("#upload-input").on("change", function (e) {
        handleFiles(e.target.files);
    });

    $("#add-more-input").on("change", function (e) {
        handleFiles(e.target.files);
    });
});
