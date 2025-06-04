// NodeDetail.tsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialCells, materialRenderers } from "@jsonforms/material-renderers";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isControl } from "@jsonforms/core";

import { getAllParentNodes, getPrefillData, sanitizeFieldSchema } from "./utils";
import PrefillValueComponent from "./PrefillValueComponent";
import FocusInputComponent from "./FocusInputComponent";

function NodeDetail({ BlueprintData }: any) {
  const { nodeName } = useParams();
  const node = BlueprintData?.nodes?.find((n: any) => n.data?.name === nodeName);
  const [formData, setFormData] = useState({});
  const [formSchema, setFormSchema] = useState(null);
  const [uiSchema, setUiSchema] = useState<any>(null);
  const [clickedField, setClickedField] = useState<string | null>(null);

  useEffect(() => {
    if (!node) return;
    const inheritedData = getPrefillData(node, BlueprintData?.nodes || []);
    const nodeData = node?.data || {};
    const formId = node?.form_id || node?.data?.component_id;
    const form = BlueprintData?.forms?.find((f: any) => f.id === formId);
    if (!form) return;

    const sanitizedSchema = sanitizeFieldSchema(form.field_schema);
    setFormSchema(sanitizedSchema);
    setUiSchema(form.ui_schema || {});
    setFormData({ ...inheritedData, ...nodeData });
  }, [node, BlueprintData]);

  if (!node) return <div>Node not found</div>;
  if (!formSchema) return <div>Loading form schema...</div>;

  const parentForms = getAllParentNodes(node, BlueprintData?.nodes || []).map((n) => ({
    name: n.data?.name,
    data: n.data,
  }));

  const globalDefaultKeys = ["id", "name", "tenant_id", "category", "description"];
  const defaultOptions = globalDefaultKeys
    .filter((key) => BlueprintData[key] !== undefined)
    .map((key) => ({ key, label: key, value: BlueprintData[key] }));

  const FocusInputComponentRenderer = withJsonFormsControlProps((props) => (
    <FocusInputComponent {...props} clickedField={clickedField} setClickedField={setClickedField} />
  ));

  const customRenderers = [
    ...materialRenderers,
    { tester: rankWith(3, isControl), renderer: FocusInputComponentRenderer },
  ];

  return (
    <div className="node-detail" style={{ position: "relative" }}>
      <h2>Form for Node: {node.data.name}</h2>

      <JsonForms
        schema={formSchema}
        uischema={uiSchema}
        data={formData}
        renderers={customRenderers}
        cells={materialCells}
        onChange={({ data }) => setFormData(data)}
      />

      {clickedField && (
        <PrefillValueComponent
          clickedField={clickedField}
          setClickedField={setClickedField}
          setFormData={setFormData}
          parentForms={parentForms}
          defaultOptions={defaultOptions}
        />
      )}
    </div>
  );
}

export default NodeDetail;
