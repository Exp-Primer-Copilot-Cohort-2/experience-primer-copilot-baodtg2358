function skillsMember() {
  // if user is logged in
  if (localStorage.getItem("user") !== null) {
    // get user skills
    const user = JSON.parse(localStorage.getItem("user"));

    // get element
    const skills = document.getElementById("skills");

    // loop through skills
    user.skills.forEach((skill) => {
      // create element
      const skillElement = document.createElement("li");

      // add text to element
      skillElement.innerHTML = skill;

      // append element
      skills.appendChild(skillElement);
    });
  }
}