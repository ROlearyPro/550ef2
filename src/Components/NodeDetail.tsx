import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
function NodeDetail({ BlueprintData }: any) {
    const { nodeName } = useParams();
    const node = BlueprintData?.nodes?.find((n: any) => n.data.name === nodeName);

    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        if (node?.data) {
            setFormData(node.data);
        }
    }, [node]);

    if (!node) return <div>Node not found</div>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted form data:", formData);
        // TODO: send to backend if needed
    };

    return (
        <div className="node-detail">
            <h2>Edit Node: {node.data.name}</h2>
            <form onSubmit={handleSubmit}>
                {Object.entries(formData).map(([key, value]) => (
                    <div key={key} style={{ marginBottom: '1rem' }}>
                        <label>
                            {key}:
                            <input
                                type="text"
                                name={key}
                                value={String(value ?? '')}
                                onChange={handleChange}
                                style={{ marginLeft: '1rem' }}
                            />
                        </label>
                    </div>
                ))}
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default NodeDetail;
