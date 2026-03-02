import { formatDateTime } from "../../utils/dateUtils.jsx";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import Icon from "../../UI/Icons.jsx";
import { Card } from "../../UI/Card.jsx";

export function AnnotationItem({
  annotation,
  onAnnotationModify,
  onAnnotationDelete
}) {
  return (
    <Card key={annotation.AnnotationID}>
      <p>{annotation.AnnotationDescription}</p>
      <p>Date Created: {formatDateTime(annotation.AnnotationCreated)}</p>
      { onAnnotationDelete && (
        <ButtonTray>
          <Button onClick={onAnnotationModify} variant="secondary">
            <Icon.Pen />
          </Button>
          <Button onClick={onAnnotationDelete} variant="danger">
            <Icon.Trash />
          </Button>
        </ButtonTray>
      )}
    </Card>
  );
}
export default AnnotationItem;
