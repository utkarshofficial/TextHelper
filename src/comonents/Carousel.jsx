import Carousel from "react-bootstrap/Carousel";
import BackImg from "../img/bg-img.jpg";
import { Button } from "@mui/material";

function IndividualIntervalsExample() {
  const firstImage =
    "https://i.pinimg.com/736x/bd/da/fc/bddafc029d86df72bef91bba70973c71.jpg";

  const secondImage = BackImg;
  const thirdImage = BackImg;

  const SliderItems = [
    {
      imgSrc:
        "https://i.pinimg.com/736x/bd/da/fc/bddafc029d86df72bef91bba70973c71.jpg",
      title: "Sign up",
      pata: "Create you account today and increase your productivity.",
    },
    {
      imgSrc:
        "https://i.pinimg.com/736x/bd/da/fc/bddafc029d86df72bef91bba70973c71.jpg",
      title: "Sign up",
      pata: "Create you account today and increase your productivity.",
    },
    {
      imgSrc:
        "https://i.pinimg.com/736x/bd/da/fc/bddafc029d86df72bef91bba70973c71.jpg",
      title: "Sign up",
      pata: "Create you account today and increase your productivity.",
    },
  ];

  return (
    <Carousel className="front-slider">
      <Carousel.Item>
        <img className="d-block w-100" src={firstImage} />
        <Carousel.Caption>
          <h3>
            <Button variant="outlined">Sign up</Button>
          </h3>
          <p>Create you account today and increase your productivity.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={secondImage} alt="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={thirdImage} alt="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default IndividualIntervalsExample;
