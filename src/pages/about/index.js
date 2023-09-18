import axios from "axios";

function About() {
  axios
    .get("api/about")
    .then((res) => {
      const { data } = res;
      console.log("z-data", data);
    })
    .catch((err) => {
      console.log("Error:", err);
    });

  return <>Hello about</>;
}

export default About;
