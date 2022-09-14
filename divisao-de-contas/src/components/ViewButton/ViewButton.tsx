import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

export default function ViewButton({ handle }: { handle: any }) {
  return (
    <Button variant="white" onClick={handle}>
      <FontAwesomeIcon icon="eye" />
    </Button>
  );
}
