# Backend Shared Methods Structure

This directory contains shared utilities, services, and helpers for the backend API.

## 📁 Directory Structure

```
src/lib/
├── api/              # API-specific utilities
│   ├── response.ts   # Standard response helpers
│   └── error-handler.ts  # Centralized error handling
├── services/         # Business logic services
│   ├── form-service.ts
│   └── submission-service.ts
├── validators/       # Data validation
│   └── form-validator.ts
├── prisma.ts         # Prisma client instance
└── utils/            # General utilities (add as needed)
```

## 🎯 Usage Examples

### 1. API Response Helpers (`lib/api/response.ts`)

Use these for consistent API responses:

```typescript
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api/response'

// Success response
return successResponse(data, 'Message here', 201)

// Error response
return errorResponse('Error message', 400)

// Not found
return notFoundResponse('Resource not found')
```

### 2. Error Handler (`lib/api/error-handler.ts`)

Centralized error handling:

```typescript
import { handleApiError } from '@/lib/api/error-handler'

export async function GET() {
  try {
    // your code
  } catch (error) {
    return handleApiError(error, 'fetch forms')
  }
}
```

### 3. Services (`lib/services/`)

Business logic and database operations:

```typescript
import { formService } from '@/lib/services/form-service'

// Instead of direct Prisma calls in routes:
const forms = await formService.getAll()
const form = await formService.getById(id)
const newForm = await formService.create({ name, form_data })
```

### 4. Validators (`lib/validators/`)

Data validation:

```typescript
import { formValidator } from '@/lib/validators/form-validator'

const validation = formValidator.validateCreate({ name, form_data })
if (!validation.valid) {
  return badRequestResponse(validation.errors.join(', '))
}
```

## 📝 Example: Refactored API Route

**Before:**
```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body.name) {
      return NextResponse.json({ success: false, message: 'Name required' }, { status: 400 })
    }
    const form = await prisma.form.create({ data: body })
    return NextResponse.json({ success: true, data: form }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error' }, { status: 500 })
  }
}
```

**After:**
```typescript
import { successResponse, badRequestResponse } from '@/lib/api/response'
import { handleApiError } from '@/lib/api/error-handler'
import { formService } from '@/lib/services/form-service'
import { formValidator } from '@/lib/validators/form-validator'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const validation = formValidator.validateCreate(body)
    if (!validation.valid) {
      return badRequestResponse(validation.errors.join(', '))
    }
    
    const form = await formService.create(body)
    return successResponse(form, 'Form created', 201)
  } catch (error) {
    return handleApiError(error, 'create form')
  }
}
```

## ✅ Benefits

1. **Consistency**: All API responses follow the same format
2. **Reusability**: Business logic is shared across routes
3. **Maintainability**: Changes in one place affect all routes
4. **Testability**: Services and validators can be tested independently
5. **Clean Routes**: API routes become thin and focused on HTTP handling

## 🚀 Adding New Shared Methods

1. **New Service**: Add to `lib/services/`
2. **New Validator**: Add to `lib/validators/`
3. **New Utility**: Add to `lib/utils/` or create new directory
4. **API Helper**: Add to `lib/api/`

