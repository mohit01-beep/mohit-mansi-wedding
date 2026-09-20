```javascript
const openButton = document.getElementById("openInvitation");
const invitationContent = document.getElementById("invitationContent");

openButton.addEventListener("click", () => {

    document.body.classList.add("invitation-open");

    invitationContent.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});
