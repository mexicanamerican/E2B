<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@e2b/sdk](./sdk.md) &gt; [components](./sdk.components.md)

## components interface

**Signature:**

```typescript
interface components 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [parameters](./sdk.components.parameters.md) |  | { envID: string; buildID: string; instanceID: string; } |  |
|  [responses](./sdk.components.responses.md) |  | { 400: { content: { "application/json": [components](./sdk.components.md)<!-- -->\["schemas"\]\["Error"\]; }; }; 401: { content: { "application/json": [components](./sdk.components.md)<!-- -->\["schemas"\]\["Error"\]; }; }; 404: { content: { "application/json": [components](./sdk.components.md)<!-- -->\["schemas"\]\["Error"\]; }; }; 500: { content: { "application/json": [components](./sdk.components.md)<!-- -->\["schemas"\]\["Error"\]; }; }; } |  |
|  [schemas](./sdk.components.schemas.md) |  | { NewInstance: { envID: string; }; Environment: { envID: string; buildID: string; public: boolean; aliases?: string\[\]; }; EnvironmentBuild: { logs: string\[\]; envID: string; buildID: string; status?: "building" \| "ready" \| "error"; } &amp; { finished: unknown; }; Instance: { envID: string; instanceID: string; clientID: string; }; Error: { code: number; message: string; }; } |  |
