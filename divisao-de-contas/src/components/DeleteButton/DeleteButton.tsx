import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

export default function DeleteButton({ handle }: { handle: any }) {
  return (
    <Button variant="white" onClick={handle}>
      <FontAwesomeIcon icon="trash-can" />
    </Button>
  );
}
