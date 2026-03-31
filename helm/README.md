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

## Dev2/Dev3 Deploys

To deploy into the shared dev2/dev3 namespaces:

```bash
# Dev2
helm upgrade <release-name> . -f values-dev2.yaml -n testzeus-dev2 --install

# Dev3
helm upgrade <release-name> . -f values-dev3.yaml -n testzeus-dev3 --install
```

These values files are intended for branch overrides in dev2/dev3 while `dev` remains the fixed dev environment.
