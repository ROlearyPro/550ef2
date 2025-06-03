import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialCells, materialRenderers } from "@jsonforms/material-renderers";

function NodeDetail({ BlueprintData }: any) {
    const { nodeName } = useParams();
    const node = BlueprintData?.nodes?.find((n: any) => n.data?.name === nodeName);

    const [formData, setFormData] = useState<any>({});
    const [formSchema, setFormSchema] = useState<any>(null);
    const [uiSchema, setUiSchema] = useState<any>(null);

useEffect(() => {
  if (!node) {
    console.log("Node not found");
    return;
  }

  const formId = node?.form_id || node?.data?.component_id;
  const form = BlueprintData?.forms?.find((f: any) => f.id === formId);

  if (!form) {
    console.log("Form not found for ID:", formId);
    return;
  }

  // Call sanitizeFieldSchema here, before setting formSchema state
  const sanitizedSchema = sanitizeFieldSchema(form.field_schema);
  setFormSchema(sanitizedSchema);

  // Also set uiSchema and formData here
  setUiSchema(form.ui_schema || {});
  setFormData({ ...getPrefillData(node, BlueprintData?.nodes || []), ...node.data });

}, [node, BlueprintData]);


    if (!node) return <div>Node not found</div>;
    if (!formSchema) return <div>Loading form schema...</div>;

    return (
        <div className="node-detail">
            <h2>Form for Node: {node.data.name}</h2>
            <JsonForms
                schema={formSchema}
                uischema={uiSchema}
                data={formData}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data }) => setFormData(data)}
            />
        </div>
    );
}

// Recursively collect all parent data
function getPrefillData(node: any, allNodes: any[]): any {
    const visited = new Set();
    const queue = [...(node.parents || [])];
    const mergedData: any = {};

    while (queue.length) {
        const parentId = queue.shift();
        if (visited.has(parentId)) continue;

        visited.add(parentId);
        const parent = allNodes.find((n: any) => n.id === parentId);
        if (parent?.data) {
            Object.assign(mergedData, parent.data);
            if (parent.parents) {
                queue.push(...parent.parents);
            }
        }
    }

    return mergedData;
}

// Patch schemas with missing enum values
function sanitizeFieldSchema(schema: any): any {
    if (!schema || !schema.properties) return schema;

    const updatedSchema = { ...schema, properties: { ...schema.properties } };

    for (const [key, value] of Object.entries(schema.properties)) {
        const prop = value as any;

        // If it's an object-enum type with null or empty enum, provide fallback
        if (
            prop.avantos_type === "object-enum" &&
            (!Array.isArray(prop.enum) || prop.enum.length === 0)
        ) {
            updatedSchema.properties[key] = {
                ...prop,
                enum: [{ title: "Default Option" }]
            };
        }

        // Similarly, patch checkbox-group or multi-select with empty enum
        if (
            (prop.avantos_type === "multi-select" || prop.avantos_type === "checkbox-group") &&
            (!prop.items?.enum || prop.items.enum.length === 0)
        ) {
            updatedSchema.properties[key] = {
                ...prop,
                items: {
                    ...prop.items,
                    enum: ["Default A", "Default B"]
                }
            };
        }
    }

    return updatedSchema;
}

export default NodeDetail;
