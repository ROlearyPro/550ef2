// Path Parameters
export interface RequestPathParams {
  action_blueprint_id: string; // e.g. "bp_456"
  blueprint_version_id: string; // e.g. "bpv_123"
  tenant_id: string; // e.g. "123"
}

// Root Response
export interface ActionBlueprintResponse {
  $schema: string; // URI
  blueprint_id: string;
  blueprint_name: string;
  branches: Branch[] | null;
  edges: Edge[] | null;
  forms: Form[] | null;
  nodes: Node[] | null;
  promoted_data_order: string[] | null;
  status: 'draft' | 'published' | 'historical' | 'archived';
  tenant_id: string;
  triggers: TriggerEndpoint[] | null;
  version_id: string;
  version_notes: string;
  version_number: string;
}

// Branch
export interface Branch {
  $schema: string;
  condition: Record<string, any>;
  created_at: string; // ISO date
  created_by: string;
  description: string;
  id: string;
  name: string;
  tenant_id: string;
  updated_at: string; // ISO date
}

// Edge
export interface Edge {
  source: string;
  target: string;
}

// Form
export interface Form {
  $schema: string;
  created_at: string; // ISO date
  created_by: string;
  custom_javascript?: string;
  custom_javascript_triggering_fields: string[] | null;
  description: string;
  dynamic_field_config: Record<string, object>;
  field_schema: object;
  id: string;
  is_reusable: boolean;
  name: string;
  ui_schema?: object;
  updated_at: string; // ISO date
}

// Node
export interface Node {
  data: object;
  id: string;
  position: object;
  type: 'form' | 'branch' | 'trigger' | 'configuration';
}

// Trigger Endpoint
export interface TriggerEndpoint {
  $schema: string;
  created_at: string; // ISO date
  id: string;
  max_retries?: number;
  name: string;
  output_mapping: Record<string, string>;
  path_template: string;
  path_template_variables: string[] | null;
  payload_template: Record<string, any>;
  payload_template_variables: string[] | null;
  query_parameter_template: Record<string, string>;
  query_parameter_template_variables: string[] | null;
  request_method: 'POST' | 'PUT' | 'GET' | 'DELETE';
  timeout_seconds?: number;
  trigger_service_id: string;
  updated_at: string; // ISO date
}
