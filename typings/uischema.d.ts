
interface WithLabel {
      label?: string
  }

interface IUISchemaElement extends WithLabel {
      type: string;
  }

  //Layouts
interface ILayout extends IUISchemaElement{
      type: string;
      elements: IUISchemaElement[];
  }
interface IVerticalLayout extends ILayout {

  }
interface IHorizontalLayout extends ILayout {

  }

  //Control
interface IControlObject extends IUISchemaElement {
      scope: {
          $ref: string;
      }
      readOnly?: boolean
  }
