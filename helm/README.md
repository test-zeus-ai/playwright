# Helm Documentation: testzeus-traceviewer

This directory contains the Helm chart for deploying `testzeus-traceviewer` to GKE.

## Deployment

### Development
```bash
helm upgrade --install traceviewer ./helm -f ./helm/values-dev.yaml --namespace testzeus-dev
```

### Production
```bash
helm upgrade --install traceviewer ./helm -f ./helm/values-prod.yaml --namespace testzeus-prod
```

## Infrastructure Notes
## Service Accounts

The following accounts must exist:

- **Kubernetes ServiceAccount**: `testzeus-traceviewer` (in each namespace: `testzeus-dev`, `testzeus-dev4`, `testzeus-dev5`, `testzeus-prod`)
GCP Service Accounts:
- Dev: `gke-runtime-dev@dev-testzeus.iam.gserviceaccount.com`
- Prod: `gke-runtime-prod@prod-testarmy.iam.gserviceaccount.com`

The Kubernetes ServiceAccount must be annotated with the matching GCP service account and granted `roles/iam.workloadIdentityUser`.

Helm workflow service accounts must exist and have these permissions:
- Artifact Registry Writer
- Kubernetes Engine Admin
- Service Account User
- Storage Admin
- Storage Object Admin

Runtime GCP service accounts (Workload Identity) must have these permissions:
- AI Platform Developer
- Artifact Registry Writer
- Kubernetes Engine Admin
- Service Account User
- Storage Admin
- Storage Object Admin
- Vertex AI User

External Secrets service account must exist:
- `external-secrets-sa@dev-testzeus.iam.gserviceaccount.com`
- Role: Secret Manager Secret Accessor

- **Ingress**: Managed through Gateway API in the target environment.
- **Workload Identity**: `values-dev.yaml` and `values-prod.yaml` annotate the Kubernetes service account with the shared runtime GSA for each environment. The matching IAM `roles/iam.workloadIdentityUser` binding must exist in GCP.

## GSM Secrets (What must exist in Google Secret Manager)

These secrets are referenced by ExternalSecrets in the values files. Make sure they exist in GSM for each environment.

### Prod (prod project)
```
```

### Dev (dev project)
```
```

### Dev4 (dev project)
```
```

### Dev5 (dev project)
```
```

## Dev4/Dev5 Deploys

To deploy into the shared dev4/dev5 namespaces:

```bash
# Dev4
helm upgrade <release-name> . -f values-dev4.yaml -n testzeus-dev4 --install

# Dev5
helm upgrade <release-name> . -f values-dev5.yaml -n testzeus-dev5 --install
```

These values files are intended for branch overrides in dev4/dev5 while `dev` remains the fixed dev environment.

## Deployment Guide: dev / dev4 / dev5

### dev (testzeus-dev)
- **Branch:** `dev` (fixed)
- **Trigger:** push to `dev`
- **Namespace:** `testzeus-dev`
- **Values:** `values-dev.yaml`

### dev4 / dev5 (branch overrides)
- **Trigger:** GitHub Actions `workflow_dispatch`
- **Namespaces:** `testzeus-dev4`, `testzeus-dev5`
- **Values:** `values-dev4.yaml`, `values-dev5.yaml`
- **Branch:** any branch provided in the workflow inputs

**Workflow inputs:**
- `target_env`: `dev4` or `dev5`
- `branch`: the branch you want to deploy (e.g. `feature/foo`)

**Example:**
- `target_env=dev4`, `branch=feature/foo`
- `target_env=dev5`, `branch=bugfix/streaming`

Notes:
- `dev` remains fixed to `testzeus-dev` and always deploys from `dev` branch.
- `dev4`/`dev5` are intended for branch testing only.

