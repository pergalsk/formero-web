# Auth toolkit

How to integrate toolkit into existing application.

## Integration into existing app

Just copy folder into your project and do these steps

### 1. Routes

Use AUTH_ROUTES and guards in application routes file:

```typescript
import { AUTH_ROUTES } from '@auth/routes';
import { authenticatedGuard } from '@auth/guards/authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    component: GuestComponent,
  },
  ...AUTH_ROUTES,
  {
    path: 'dashboard',
    component: DashboardComponent,
    canMatch: [authenticatedGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
```

### 2. Interceptors

Import interceptors into main.ts file:

```typescript
import { authInterceptorProviders } from '@auth/interceptors';

bootstrapApplication(RootComponent, {
  providers: [
    // other profiders
    interceptorProviders,
 ],
}).catch((err) => console.error(err));
```

## Navigation routes
You can navigate to these authentication routes to show corresponding screens.

```
/log-in                 - guest route
/forgot-pwd             - guest route
/register-new           - guest route
/password-reset/:token  - guest route
```

## Rest API routes
Auth pages will call these API routes to connect to Breeze/Sanctum Laravel backend. Look into Laravel documentation for more details. 

```
GET  /sanctum/csrf-cookie
POST /login
POST /logout
POST /register
POST /forgot-password
POST /reset-password
```

To get user's data call:
```
GET /api/user
```

## TODO

Move validations (email, the same password), toSignalWithErrors function, auth-panel component...
