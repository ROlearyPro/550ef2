
// Finds any and all parental/predecessor nodes, also searching recursively.
export function getAllParentNodes(node: any, allNodes: any[]): any[] {
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

// Recursively explores any and all parental/predecessor nodes
// and adds all prefillable data to the return value
export function getPrefillData(node: any, allNodes: any[]): any {
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


// Makes it so that avantos_type doesn't break rendering entirely
export function sanitizeFieldSchema(schema: any): any {
    if (!schema || !schema.properties) return schema;
    const updatedSchema = { ...schema, properties: { ...schema.properties } };

    for (const [key, value] of Object.entries(schema.properties)) {
        const prop = value as any;

        if (prop.avantos_type === "object-enum" && (!Array.isArray(prop.enum) || prop.enum.length === 0)) {
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
