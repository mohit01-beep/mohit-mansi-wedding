const openButton = document.getElementById("openInvitation");
const invitationContent = document.getElementById("invitationContent");

openButton.addEventListener("click", () => {

    invitationContent.classList.add("visible");

    setTimeout(() => {
        invitationContent.scrollIntoView({
            behavior: "smooth"
        });
    }, 300);

});
