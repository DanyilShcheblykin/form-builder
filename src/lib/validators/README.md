# Validators Structure

This directory contains Zod-based validators organized by entity/domain.

## 📁 Directory Structure

```
validators/
├── types.ts                    # Common validation types
├── forms/                      # Form-related validators
│   └── form-validator.ts      # Form validation schemas and validators
├── submissions/                # Submission-related validators
│   └── submission-validator.ts # Submission validation schemas and validators
└── index.ts                    # Central export for all validators
```

## 🎯 Usage

### Import validators from the main index:

```typescript
import { formValidator, submissionValidator } from '@/lib/validators'
```

### Example in API route:

```typescript
import { formValidator } from '@/lib/validators'

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Validate with Zod
  const validation = formValidator.validateCreate(body)
  if (!validation.valid) {
    return badRequestResponse(validation.errors.join(', '))
  }
  
  // Use validated data (already typed!)
  const { name, form_data } = validation.data!
}
```

## ➕ Adding New Validators

When you need to add validation for a new entity:

1. **Create a new folder** for the entity:
   ```
   validators/
   └── users/
       └── user-validator.ts
   ```

2. **Create the validator** using Zod:
   ```typescript
   import { z } from 'zod'
   import { ValidationResult } from '../types'
   
   export const userSchema = z.object({
     email: z.string().email(),
     name: z.string().min(1),
   })
   
   export const userValidator = {
     validate(data: unknown): ValidationResult {
       // validation logic
     }
   }
   ```

3. **Export from index.ts**:
   ```typescript
   export { userValidator } from './users/user-validator'
   ```

## ✅ Benefits

- **Organized by entity**: Easy to find and maintain
- **Scalable**: Add new validators without cluttering
- **Type-safe**: Zod generates TypeScript types automatically
- **Centralized exports**: Import everything from one place
- **Reusable**: Schemas can be shared and combined

