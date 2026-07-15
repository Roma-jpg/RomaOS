# RomaOS sites

Static sites kept in one repository. Each directory under `apps/` is deployed as a separate Timeweb Cloud Frontend App.

| Domain | Timeweb project directory | Build directory |
| --- | --- | --- |
| `romeo558.ru` | `apps/main` | `.` |
| `lab.romeo558.ru` | `apps/lab` | `.` |
| `kcp.romeo558.ru` | `apps/kcp` | `.` |

Choose `Frontend` and `HTML/CSS/JS` for all three applications. Leave the build command empty.

Do not deploy the repository root. The main application must use `apps/main` as its project directory. This ensures that `apps/lab` and `apps/kcp` are not copied into the main site's output, so paths such as `romeo558.ru/apps/lab/` and `romeo558.ru/apps/kcp/` return 404.

Each application can use the same repository and branch. Attach the matching domain in the application settings after checking its technical domain.

To add another subdomain later, create another directory under `apps/` and deploy it as another Frontend App from the same repository.
