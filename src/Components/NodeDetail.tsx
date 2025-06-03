import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import {
    materialCells,
    materialRenderers,
} from "@jsonforms/material-renderers";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isControl } from "@jsonforms/core";
import TextField from "@mui/material/TextField";

function NodeDetail({ BlueprintData }: any) {
    const { nodeName } = useParams();
    const node = BlueprintData?.nodes?.find(
        (n: any) => n.data?.name === nodeName
    );

    const [formData, setFormData] = useState<any>({});
    const [formSchema, setFormSchema] = useState<any>(null);
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

    // Get all transitive prerequisite nodes for listing their data
    const parentForms = getAllParentNodes(node, BlueprintData?.nodes || []).map(
        (parentNode) => ({
            name: parentNode.data?.name,
            data: parentNode.data,
        })
    );

    // Extract global default options from BlueprintData.globalData (adjust if different path)
    const globalDefaultKeys = ["id", "name", "tenant_id", "category", "description"];
    const defaultOptions = globalDefaultKeys
        .filter((key) => BlueprintData[key] !== undefined)
        .map((key) => ({
            key,
            label: key, // Or a prettier label if you want
            value: BlueprintData[key],
        }));

    const CustomInput = ({ data, handleChange, path, schema }: any) => (
        <TextField
            value={data || ""}
            onClick={() => {
                if (!data) setClickedField(path);
            }}
            onChange={(ev) => handleChange(path, ev.target.value)}
            label={schema.title}
            fullWidth
            margin="normal"
        />
    );

    const CustomInputRenderer = withJsonFormsControlProps(CustomInput);

    const customRenderers = [
        ...materialRenderers,
        { tester: rankWith(3, isControl), renderer: CustomInputRenderer },
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
                <div
                    style={{
                        position: "absolute",
                        top: 100,
                        left: 100,
                        background: "#fff",
                        padding: "1em",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        zIndex: 999,
                        maxHeight: "300px",
                        overflowY: "auto",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        width: 300,
                    }}
                >
                    <h3>
                        Select data for: <code>{clickedField}</code>
                    </h3>
                    <button onClick={() => setClickedField(null)}>Cancel</button>

                    {/* Global Defaults Section */}
                    {defaultOptions.length > 0 && (
                        <div style={{ marginTop: "1em" }}>
                            <strong>Global Defaults</strong>
                            {defaultOptions.map(({ key, label, value }) => (
                                <button
                                    key={key}
                                    style={{
                                        display: "block",
                                        margin: "0.25em 0",
                                        padding: "0.25em 0.5em",
                                        background: "#eee",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        width: "100%",
                                        textAlign: "left",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                    onClick={() => {
                                        setFormData((prev: any) => ({
                                            ...prev,
                                            [clickedField]: value,
                                        }));
                                        // setClickedField(null);
                                    }}
                                >
                                    {`${label}: ${value}`}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Message if no parent forms and no global defaults */}
                    {parentForms.length === 0 && defaultOptions.length === 0 && (
                        <p style={{ marginTop: "1em" }}>
                            No data available from prerequisite forms or global defaults.
                        </p>
                    )}

                    {/* Parent forms data */}
                    {parentForms.map((parent, idx) => (
                        <div key={idx} style={{ marginTop: "1em" }}>
                            <strong>{parent.name}</strong>
                            {Object.entries(parent.data || {}).map(([key, value]) => (
                                <button
                                    key={key}
                                    style={{
                                        display: "block",
                                        margin: "0.25em 0",
                                        padding: "0.25em 0.5em",
                                        background: "#eee",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        width: "100%",
                                        textAlign: "left",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                    onClick={() => {
                                        setFormData((prev: any) => ({
                                            ...prev,
                                            [clickedField]:
                                                typeof value === "object"
                                                    ? JSON.stringify(value)
                                                    : value,
                                        }));
                                        // setClickedField(null);
                                    }}
                                >
                                    {key}:{" "}
                                    {typeof value === "object"
                                        ? JSON.stringify(value)
                                        : String(value)}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Collect data from all transitive parent nodes recursively
function getAllParentNodes(node: any, allNodes: any[]): any[] {
    const visited = new Set<string>();
    const queue = [...(node.data?.prerequisites || [])];
    const parents: any[] = [];

    while (queue.length) {
        const parentKey = queue.shift();
        if (visited.has(parentKey)) continue;
        visited.add(parentKey);

        const parentNode = allNodes.find((n: any) => n.data?.component_key === parentKey);
        if (parentNode) {
            parents.push(parentNode);
            if (parentNode.data?.prerequisites) {
                queue.push(...parentNode.data.prerequisites);
            }
        }
    }

    return parents;
}

// Collect merged data from all transitive parent nodes recursively for initial prefill
function getPrefillData(node: any, allNodes: any[]): any {
    const visited = new Set<string>();
    const queue = [...(node.data?.prerequisites || [])];
    const mergedData: any = {};

    while (queue.length) {
        const parentKey = queue.shift();
        if (visited.has(parentKey)) continue;
        visited.add(parentKey);

        const parent = allNodes.find((n: any) => n.data?.component_key === parentKey);
        if (parent?.data) {
            Object.assign(mergedData, parent.data);
            if (parent.data?.prerequisites) {
                queue.push(...parent.data.prerequisites);
            }
        }
    }

    return mergedData;
}

// Sanitize schema: add fallback enums if missing
function sanitizeFieldSchema(schema: any): any {
    if (!schema || !schema.properties) return schema;

    const updatedSchema = { ...schema, properties: { ...schema.properties } };

    for (const [key, value] of Object.entries(schema.properties)) {
        const prop = value as any;

        if (
            prop.avantos_type === "object-enum" &&
            (!Array.isArray(prop.enum) || prop.enum.length === 0)
        ) {
            updatedSchema.properties[key] = {
                ...prop,
                enum: [{ title: "Default Option" }],
            };
        }

        if (
            (prop.avantos_type === "multi-select" || prop.avantos_type === "checkbox-group") &&
            (!prop.items?.enum || prop.items.enum.length === 0)
        ) {
            updatedSchema.properties[key] = {
                ...prop,
                items: {
                    ...prop.items,
                    enum: ["Default A", "Default B"],
                },
            };
        }
    }

    return updatedSchema;
}

export default NodeDetail;
