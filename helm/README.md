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

- **Ingress**: Managed through Gateway API in the target environment.
- **Workload Identity**: `values-dev.yaml` and `values-prod.yaml` annotate the Kubernetes service account with the shared runtime GSA for each environment. The matching IAM `roles/iam.workloadIdentityUser` binding must exist in GCP.
